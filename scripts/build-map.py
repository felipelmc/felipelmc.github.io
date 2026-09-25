#!/usr/bin/env python3
"""Build Fig. 1: a dot map of Brazil's 5,570 municipal seats, one dot per
municipality, coloured by turnout in the first round of the 2022 general
election (quintiles).

Outputs (both GENERATED; never edit them by hand):
  src/components/figures/BrazilDots.astro   the inline SVG
  src/data/figure.ts                        caption numbers (count, bins, summary)

Inputs, downloaded once into .qa/map-cache/ (gitignored) and reused after:
  TSE results CDN, 2022 election 544 (federal, 1st round, cargo Presidente):
    config/mun-e000544-cm.json        municipality list, TSE code -> IBGE code
    dados/<uf>/<uf>-e000544-ab.json   per-municipality eleitorado (e) and
                                      comparecimento (c), plus a UF total row
  IBGE Localidades 2022 (GeoPackage):   the point of each municipal seat
  IBGE malhas API v3, country mesh 2022 (qualidade intermediaria): Brazil's
    national outline, drawn as a thin line under the dots
  mape_municipios directory (MAPE/IESP-UERJ, pinned commit): independent
    TSE<->IBGE crosswalk and polygon centroids, used ONLY as validation.

Turnout = comparecimento / eleitorado apto, per municipality. Voters abroad
(UF "ZZ") are excluded. The variable is deliberately neutral: never colour this
map by party, candidate or vote share.

Re-run (standard library only; deterministic, same cache -> byte-identical
output):
    python3 scripts/build-map.py            # coloured by turnout quintile
    python3 scripts/build-map.py --mono     # fallback: seats only, no variable
    python3 scripts/build-map.py --refresh  # re-download the cache first
"""

from __future__ import annotations

import argparse
import csv
import gzip
import io
import json
import math
import sqlite3
import ssl
import sys
import time
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.qa' / 'map-cache'
OUT_SVG = ROOT / 'src' / 'components' / 'figures' / 'BrazilDots.astro'
OUT_TS = ROOT / 'src' / 'data' / 'figure.ts'

TSE_BASE = 'https://resultados.tse.jus.br/oficial/ele2022/544/'
TSE_CONFIG = TSE_BASE + 'config/mun-e000544-cm.json'
IBGE_GPKG = ('https://geoftp.ibge.gov.br/organizacao_do_territorio/estrutura_territorial/'
             'localidades/Localidades_do_Brasil/2022/Localidades_Brasil_gpkg.zip')
IBGE_OUTLINE = ('https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR'
                '?periodo=2022&formato=application/vnd.geo+json&qualidade=intermediaria')
MAPE_DIR = ('https://raw.githubusercontent.com/mape-iesp/MAPEmunicipios-ETL/'
            '75b8316eb8820b767503d50e767aba3156d3245e/dados/fonte/00_diretorios/municipios.csv.gz')

# ── Figure parameters ──────────────────────────────────────────────────────
WIDTH = 1000          # viewBox width, in SVG units
PAD = 8               # margin around the outermost seat or outline point (> half the dot)
DOT = 5               # dot diameter = stroke-width, in viewBox units
CENTRAL_LAT = -15.0   # equirectangular, x scaled by cos(CENTRAL_LAT)
GRATICULE_STEP = 5    # degrees
OUTLINE_TOL = 0.6     # Douglas-Peucker tolerance for the outline, in viewBox units
OUTLINE_MIN_AREA = 50 # outline rings smaller than this (units²) are dropped; a dot covers ~20
N_BINS = 5
EXPECTED = 5570       # municipalities in 2022 (IBGE count incl. DF and Noronha)

UA = 'Mozilla/5.0 (felipelamarca.com build-map.py; +https://felipelamarca.com)'

# python.org builds on macOS ship without system CA certificates; use certifi's
# bundle when it is installed, the platform default otherwise.
try:
    import certifi
    SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CTX = ssl.create_default_context()


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


# ── Download cache ─────────────────────────────────────────────────────────
def fetch(url: str, name: str, refresh: bool = False) -> bytes:
    """Return the bytes of `url`, cached as .qa/map-cache/<name>."""
    path = CACHE / name
    if path.exists() and not refresh:
        return path.read_bytes()
    CACHE.mkdir(parents=True, exist_ok=True)
    last: Exception | None = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=120, context=SSL_CTX) as r:
                data = r.read()
            tmp = path.with_suffix(path.suffix + '.part')
            tmp.write_bytes(data)
            tmp.replace(path)
            log(f'  downloaded {name} ({len(data):,} bytes)')
            return data
        except Exception as e:  # noqa: BLE001 — retried, then re-raised
            last = e
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f'could not download {url}: {last}')


# ── Inputs ─────────────────────────────────────────────────────────────────
def load_tse_municipalities(refresh: bool) -> dict[str, dict]:
    """IBGE code -> {tse, name, uf} for every municipality voting in Brazil."""
    cfg = json.loads(fetch(TSE_CONFIG, 'mun-e000544-cm.json', refresh))
    out: dict[str, dict] = {}
    for uf in cfg['abr']:
        if uf['cd'] == 'ZZ':  # voters abroad
            continue
        for m in uf['mu']:
            ibge = m['cdi']
            if ibge in out:
                raise SystemExit(f'duplicate IBGE code in TSE config: {ibge}')
            out[ibge] = {'tse': m['cd'], 'name': m['nm'], 'uf': uf['cd']}
    return out


def load_tse_turnout(ufs: list[str], refresh: bool) -> dict[tuple[str, str], tuple[int, int]]:
    """(UF, TSE code) -> (eleitorado apto, comparecimento), 1st round 2022.

    The denominator is `ea`, the electorate of the sections actually counted,
    so that comparecimento + abstenção = eleitorado, as in TSE's own "% de
    comparecimento". It differs from the full electorate `e` only where a
    section was not installed (in 2022: one section, 84 voters, in Manaus).
    """
    out: dict[tuple[str, str], tuple[int, int]] = {}
    for uf in ufs:
        u = uf.lower()
        doc = json.loads(fetch(f'{TSE_BASE}dados/{u}/{u}-e000544-ab.json', f'{u}-e000544-ab.json', refresh))
        if doc.get('ele') != '544' or doc.get('t') != '1':
            raise SystemExit(f'{uf}: unexpected election/round in abrangência file')
        total = None
        sum_e = sum_c = 0
        for a in doc['abr']:
            e, c, ab = int(a['ea']), int(a['c']), int(a['a'])
            if a['and'] != 'F' or a['s'] != a['st'] or c + ab != e:
                raise SystemExit(f'{uf}/{a["cdabr"]}: totalisation not final ({a["and"]}, {a["st"]}/{a["s"]})')
            if a['tpabr'] == 'MU' and a['e'] != a['ea']:
                log(f'  note: {uf}/{a["cdabr"]} {int(a["e"]) - e} voters in sections not counted')
            if a['tpabr'] == 'UF':
                total = (e, c)
            elif a['tpabr'] == 'MU':
                out[(uf, a['cdabr'])] = (e, c)
                sum_e += e
                sum_c += c
        if total != (sum_e, sum_c):
            raise SystemExit(f'{uf}: municipalities do not add up to the UF total ({sum_e},{sum_c}) vs {total}')
    return out


def load_ibge_seats(refresh: bool) -> dict[str, tuple[float, float, str]]:
    """IBGE code -> (lat, lon, name) of the municipal seat, IBGE Localidades 2022."""
    gpkg = CACHE / 'BR_localidades_2022.gpkg'
    if refresh or not gpkg.exists():
        raw = fetch(IBGE_GPKG, 'Localidades_Brasil_gpkg.zip', refresh)
        with zipfile.ZipFile(io.BytesIO(raw)) as z:
            gpkg.write_bytes(z.read('BR_localidades_2022.gpkg'))
    con = sqlite3.connect(f'file:{gpkg}?mode=ro', uri=True)
    rows = con.execute(
        'SELECT CD_MUN, LAT_LOCALIDADE, LONG_LOCALIDADE, NM_MUN FROM BR_localidades_2022 '
        "WHERE SCT_LOCALIDADE IN ('Sede Municipal', 'Capital Federal') "
        "   OR CT_LOCALIDADE = 'Distrito Estadual de Fernando de Noronha' "
        'ORDER BY CD_MUN'
    ).fetchall()
    con.close()
    out: dict[str, tuple[float, float, str]] = {}
    for cd, lat, lon, nm in rows:
        if cd in out:
            raise SystemExit(f'two seats for IBGE {cd}')
        out[cd] = (float(lat), float(lon), nm)
    return out


def load_ibge_outline(refresh: bool) -> list[list[tuple[float, float]]]:
    """Exterior rings of Brazil's national outline as (lat, lon), IBGE mesh 2022.

    Holes are dropped: at this quality they are a few sub-pixel slivers. The API
    answers gzip-encoded whether asked or not; the cache keeps the bytes as served.
    """
    raw = fetch(IBGE_OUTLINE, 'malha-BR-2022-intermediaria.geojson', refresh)
    if raw[:2] == b'\x1f\x8b':
        raw = gzip.decompress(raw)
    rings: list[list[tuple[float, float]]] = []
    for f in json.loads(raw)['features']:
        g = f['geometry']
        if g['type'] == 'Polygon':
            polys = [g['coordinates']]
        elif g['type'] == 'MultiPolygon':
            polys = g['coordinates']
        else:
            raise SystemExit(f'outline: unexpected geometry {g["type"]}')
        for poly in polys:
            rings.append([(float(c[1]), float(c[0])) for c in poly[0]])
    return rings


def load_mape_directory(refresh: bool) -> dict[str, tuple[str, float, float]] | None:
    """IBGE code -> (TSE code, centroid lat, centroid lon). Validation only."""
    try:
        raw = fetch(MAPE_DIR, 'mape_municipios.csv.gz', refresh)
    except RuntimeError as e:
        log(f'  WARNING: mape_municipios directory unavailable, skipping cross-checks ({e})')
        return None
    out = {}
    for r in csv.DictReader(io.StringIO(gzip.decompress(raw).decode('utf-8'))):
        wkt = r['centroide_wkt'].removeprefix('POINT(').removesuffix(')').split()
        out[r['id_municipio']] = (r['id_municipio_tse'], float(wkt[1]), float(wkt[0]))
    return out


# ── Helpers ────────────────────────────────────────────────────────────────
def rnd(v: float) -> int:
    """Round half away from zero (Python's round() is banker's)."""
    return int(math.floor(v + 0.5)) if v >= 0 else -int(math.floor(-v + 0.5))


def r3(v: float) -> float:
    return rnd(v * 1000) / 1000


def haversine_km(a: tuple[float, float], b: tuple[float, float]) -> float:
    (la1, lo1), (la2, lo2) = [(math.radians(x), math.radians(y)) for x, y in (a, b)]
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * 6371.0088 * math.asin(math.sqrt(h))


def fmt(v: float) -> str:
    return f'{v:.3f}'


def ring_area(pts: list[tuple[float, float]]) -> float:
    """Unsigned shoelace area of a closed ring."""
    return abs(sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(pts, pts[1:]))) / 2


def simplify(pts: list[tuple[float, float]], tol: float) -> list[tuple[float, float]]:
    """Douglas-Peucker, iterative; ties go to the first vertex, so it is deterministic."""
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (ax, ay), (bx, by) = pts[a], pts[b]
        dx, dy = bx - ax, by - ay
        length = math.hypot(dx, dy)
        best, idx = -1.0, -1
        for i in range(a + 1, b):
            x, y = pts[i]
            d = abs(dy * (x - ax) - dx * (y - ay)) / length if length else math.hypot(x - ax, y - ay)
            if d > best:
                best, idx = d, i
        if best > tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(pts, keep) if k]


def tenths(v: int) -> str:
    """An integer count of tenths as the shortest plain decimal: 30 -> '3', -5 -> '-0.5'."""
    whole, frac = divmod(abs(v), 10)
    return f'{"-" if v < 0 else ""}{whole}' + (f'.{frac}' if frac else '')


def ring_path(pts: list[tuple[float, float]]) -> str:
    """A closed ring as SVG path data: absolute start, then relative steps in tenths.

    Steps are differences of the rounded absolute positions, so rounding never
    accumulates along the ring.
    """
    q: list[tuple[int, int]] = []
    for x, y in pts:
        p = (rnd(x * 10), rnd(y * 10))
        if not q or p != q[-1]:
            q.append(p)
    if len(q) > 1 and q[-1] == q[0]:
        q.pop()
    if len(q) < 3:
        return ''
    out = [f'M{tenths(q[0][0])} {tenths(q[0][1])}l']
    for (x0, y0), (x1, y1) in zip(q, q[1:]):
        for v in (x1 - x0, y1 - y0):
            t = tenths(v)
            out.append(t if len(out) == 1 or t.startswith('-') else ' ' + t)
    return ''.join(out) + 'z'


# ── Build ──────────────────────────────────────────────────────────────────
def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--mono', action='store_true', help='draw seats only, without the turnout variable')
    ap.add_argument('--refresh', action='store_true', help='re-download every cached input')
    args = ap.parse_args()

    log('Loading inputs')
    tse = load_tse_municipalities(args.refresh)
    seats = load_ibge_seats(args.refresh)
    outline = load_ibge_outline(args.refresh)
    mape = load_mape_directory(args.refresh)

    # Join the 2022 municipality list (TSE) to IBGE seats on the IBGE code.
    missing = sorted(set(tse) - set(seats))
    extra = sorted(set(seats) - set(tse))
    codes = sorted(set(tse) & set(seats))
    log(f'  TSE 2022 municipalities: {len(tse)}; IBGE seats: {len(seats)}; matched: {len(codes)}')
    for cd in missing:
        log(f'  UNMATCHED (no IBGE seat): {cd} {tse[cd]["name"]}/{tse[cd]["uf"]}')
    for cd in extra:
        log(f'  not in the 2022 election (IBGE only): {cd} {seats[cd][2]}')
    if len(codes) != EXPECTED:
        log(f'  WARNING: expected {EXPECTED} matched municipalities, got {len(codes)}')

    # Cross-check against mape_municipios: same TSE code, seat near centroid.
    if mape is not None:
        disagree = [cd for cd in codes if cd not in mape or int(mape[cd][0]) != int(tse[cd]['tse'])]
        log(f'  mape_municipios crosswalk agrees on {len(codes) - len(disagree)}/{len(codes)} TSE codes')
        for cd in disagree:
            log(f'    disagreement: {cd} TSE={tse[cd]["tse"]} mape={mape.get(cd, ("absent",))[0]}')
        dist = sorted((haversine_km(seats[cd][:2], mape[cd][1:]), cd) for cd in codes if cd in mape)
        far = [(d, cd) for d, cd in dist if d > 150]
        log(f'  seat-to-centroid distance: median {dist[len(dist) // 2][0]:.1f} km, '
            f'max {dist[-1][0]:.0f} km ({seats[dist[-1][1]][2]}); {len(far)} over 150 km')

    # Turnout.
    values: dict[str, float] = {}
    national = None
    if not args.mono:
        ufs = sorted({tse[cd]['uf'] for cd in codes})
        turnout = load_tse_turnout(ufs, args.refresh)
        no_data = [cd for cd in codes if (tse[cd]['uf'], tse[cd]['tse']) not in turnout]
        if no_data:
            raise SystemExit(f'no turnout for {len(no_data)} municipalities, e.g. {no_data[:5]}')
        sum_e = sum_c = 0
        for cd in codes:
            e, c = turnout[(tse[cd]['uf'], tse[cd]['tse'])]
            values[cd] = c / e
            sum_e += e
            sum_c += c
        national = sum_c / sum_e
        log(f'  electorate {sum_e:,}, turnout {sum_c:,} ({national:.4f}), abroad excluded')

    # Projection: equirectangular, x shrunk by cos(central latitude), north up.
    # The frame fits the seats and the outline together: the outline reaches
    # past the outermost seats (Acre to the west, Roraima to the north), and
    # Fernando de Noronha's seat lies east of it.
    k = math.cos(math.radians(CENTRAL_LAT))
    lats = [seats[cd][0] for cd in codes] + [lat for ring in outline for lat, _ in ring]
    lons = [seats[cd][1] for cd in codes] + [lon for ring in outline for _, lon in ring]
    lat_max, lat_min, lon_min, lon_max = max(lats), min(lats), min(lons), max(lons)
    s = (WIDTH - 2 * PAD) / ((lon_max - lon_min) * k)
    height = rnd((lat_max - lat_min) * s + 2 * PAD)

    def proj(lat: float, lon: float) -> tuple[float, float]:
        return PAD + (lon - lon_min) * k * s, PAD + (lat_max - lat) * s

    def px(lat: float, lon: float) -> tuple[int, int]:
        x, y = proj(lat, lon)
        return rnd(x), rnd(y)

    # Classification: quintile breaks, rounded to 3 decimals BEFORE binning so
    # the legend's printed edges are exactly the thresholds used.
    if values:
        ordered = sorted(codes, key=lambda cd: (values[cd], cd))
        n = len(ordered)
        breaks = [r3(values[ordered[i * n // N_BINS]]) for i in range(1, N_BINS)]
        vmin, vmax = values[ordered[0]], values[ordered[-1]]
        med = (values[ordered[(n - 1) // 2]] + values[ordered[n // 2]]) / 2

        def bin_of(v: float) -> int:
            return 1 + sum(1 for b in breaks if v >= b)

        edges = [r3(vmin)] + breaks + [r3(vmax)]
        groups: dict[str, set[tuple[int, int]]] = {str(i): set() for i in range(1, N_BINS + 1)}
        counts = {str(i): 0 for i in range(1, N_BINS + 1)}
        for cd in codes:
            b = str(bin_of(values[cd]))
            groups[b].add(px(*seats[cd][:2]))
            counts[b] += 1
    else:
        groups = {'all': {px(*seats[cd][:2]) for cd in codes}}
        counts = {'all': len(codes)}

    points = sum(len(g) for g in groups.values())
    log(f'  viewBox 0 0 {WIDTH} {height}; {points} distinct dot positions for {len(codes)} municipalities')
    if values:
        log(f'  turnout min {vmin:.4f} median {med:.4f} max {vmax:.4f}')
        log(f'  bins {edges} counts {[counts[b] for b in sorted(counts)]}')

    # Graticule: every GRATICULE_STEP degrees, clipped to the viewBox.
    grat = []
    lon0 = math.ceil(lon_min / GRATICULE_STEP) * GRATICULE_STEP
    for lon in range(lon0, math.floor(lon_max) + 1, GRATICULE_STEP):
        x = px(0, lon)[0]
        if 0 <= x <= WIDTH:
            grat.append(f'M{x} 0V{height}')
    lat0 = math.floor(lat_max / GRATICULE_STEP) * GRATICULE_STEP
    for lat in range(lat0, math.floor(lat_min) - 1, -GRATICULE_STEP):
        y = px(lat, lon_min)[1]
        if 0 <= y <= height:
            grat.append(f'M0 {y}H{WIDTH}')

    # Outline: exterior rings through the same projection as the dots, islands
    # smaller than a few dots dropped (their seats still show), largest
    # ring first, then simplified and written in tenths of a unit.
    rings = []
    for ring in outline:
        pts = [proj(lat, lon) for lat, lon in ring]
        area = ring_area(pts)
        if area >= OUTLINE_MIN_AREA:
            rings.append((-area, pts))
    rings.sort()
    simplified = [simplify(pts, OUTLINE_TOL) for _, pts in rings]
    outline_d = ''.join(ring_path(pts) for pts in simplified)
    log(f'  outline: {len(rings)} of {len(outline)} rings kept, '
        f'{sum(len(pts) for _, pts in rings)} -> {sum(len(p) for p in simplified)} vertices, '
        f'{len(outline_d):,} bytes of path data')

    # ── Write the Astro component ──
    dot_attrs = f'fill="none" stroke-linecap="round" stroke-width="{DOT}"'
    lines = [
        '---',
        '// GENERATED by scripts/build-map.py. Do not edit by hand; re-run the script.',
        '// Fig. 1: one dot per municipal seat (IBGE Localidades 2022), coloured by',
        '// turnout quintile in the 1st round of the 2022 general election (TSE).',
        '// Numbers for the caption live in src/data/figure.ts.',
        'interface Props {',
        '  class?: string;',
        '}',
        '---',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {height}" '
        f'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" class={{Astro.props.class}}>',
        f'<path class="fig-graticule" style="stroke: rgb(var(--line)); stroke-width: 1; fill: none; '
        f'vector-effect: non-scaling-stroke" d="{"".join(grat)}"/>',
        f'<path class="fig-outline" style="stroke: rgb(var(--line-strong)); stroke-width: 1; fill: none; '
        f'vector-effect: non-scaling-stroke; stroke-linejoin: round" d="{outline_d}"/>',
    ]
    for b in sorted(groups):
        pts = sorted(groups[b], key=lambda p: (p[1], p[0]))
        d = ''.join(f'M{x} {y}h0' for x, y in pts)
        colour = 'd4' if b == 'all' else f'd{b}'
        lines.append(f'<path class="fig-dots" data-bin="{b}" style="stroke: rgb(var(--{colour}))" {dot_attrs} d="{d}"/>')
    lines.append('</svg>')
    OUT_SVG.parent.mkdir(parents=True, exist_ok=True)
    OUT_SVG.write_text('\n'.join(lines) + '\n', encoding='utf-8')

    # ── Write the caption data ──
    ts = [
        '// GENERATED by scripts/build-map.py. Do not edit by hand; re-run the script:',
        '//   python3 scripts/build-map.py',
        '// Numbers behind Fig. 1 (src/components/figures/BrazilDots.astro).',
        "import type { L } from './types';",
        '',
        'export const fig1 = {',
        f'  /** Municipalities drawn, one dot each (the 2022 municipal map: 5,568 + Brasília + Fernando de Noronha). */',
        f'  count: {len(codes)},',
        f'  /** Distinct dot positions after rounding to the {WIDTH}-unit grid; a few neighbouring seats share one. */',
        f'  points: {points},',
    ]
    if values:
        ts += [
            '  variable: {',
            "    en: 'turnout in the first round of the 2022 general election',",
            "    'pt-br': 'comparecimento no 1º turno das eleições gerais de 2022',",
            '  } as L,',
            '  /** Turnout = voters who showed up / registered voters, per municipality (abroad excluded). */',
            '  definition: {',
            "    en: 'votes cast as a share of registered voters',",
            "    'pt-br': 'comparecimento sobre eleitorado apto',",
            '  } as L,',
            "  source: 'TSE; IBGE',",
            '  sources: [',
            "    { name: 'TSE', what: 'turnout, 2022 1st round', url: 'https://resultados.tse.jus.br/oficial/ele2022/544/' },",
            "    { name: 'IBGE', what: 'municipal seats (Localidades 2022)', url: 'https://geoftp.ibge.gov.br/organizacao_do_territorio/estrutura_territorial/localidades/Localidades_do_Brasil/2022/' },",
            '  ],',
            '  /** Quintiles, low → high, as proportions; a municipality is in bin i if from ≤ v < to (last bin inclusive). */',
            '  bins: [',
        ]
        for i in range(N_BINS):
            ts.append(f'    {{ from: {fmt(edges[i])}, to: {fmt(edges[i + 1])}, n: {counts[str(i + 1)]} }},')
        ts += [
            '  ],',
            f'  min: {fmt(r3(vmin))},',
            f'  median: {fmt(r3(med))},',
            f'  max: {fmt(r3(vmax))},',
            '  /** Pooled over all municipalities (sum of turnout / sum of electorate). */',
            f'  national: {fmt(r3(national))},',
            '};',
        ]
    else:
        ts += [
            '  /** Monochrome fallback: no variable is encoded, the dots are only the seats. */',
            '  variable: null as L | null,',
            "  source: 'IBGE',",
            '  sources: [',
            "    { name: 'IBGE', what: 'municipal seats (Localidades 2022)', url: 'https://geoftp.ibge.gov.br/organizacao_do_territorio/estrutura_territorial/localidades/Localidades_do_Brasil/2022/' },",
            '  ],',
            '  bins: [] as { from: number; to: number; n: number }[],',
            '};',
        ]
    OUT_TS.write_text('\n'.join(ts) + '\n', encoding='utf-8')

    log(f'Wrote {OUT_SVG.relative_to(ROOT)} ({OUT_SVG.stat().st_size:,} bytes) and {OUT_TS.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
