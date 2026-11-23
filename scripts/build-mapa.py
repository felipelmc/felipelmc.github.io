"""Desenha as camadas do mapa das proposições que abre a home.

O mapa é a figura dos temas da dissertação (cada ponto é uma proposição apresentada
na Câmara dos Deputados desde 1988, posicionada pelo texto da sua justificação). Este
script lê as coordenadas no repositório da dissertação e grava só imagens: nenhum dado
vai para o site.

    ~/Projects/IESP/BR-Congress-Preferences/venv/bin/python scripts/build-mapa.py

Cada camada é uma máscara: um WebP preto cuja transparência diz onde há pontos. O site
pinta a máscara com a cor do tema (claro ou escuro), em src/components/MapaProposicoes.astro.

- public/img/mapa/todas.webp       todas as proposições (o fundo cinza)
- public/img/mapa/<tema>.webp      as proposições de cada um dos nove temas
- public/img/research/dissertation.webp e thumbs/: a figura da dissertação na página de Pesquisa

No fim, imprime as contagens que vão em src/data/mapa.ts.
"""

import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
TESE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Projects/IESP/BR-Congress-Preferences"
sys.path.insert(0, str(TESE / "code"))
import utils_maps as um  # noqa: E402  (os temas de cada proposição, como a dissertação os lê)

LARGURA = 1400
# Os nove temas da figura da dissertação, na ordem em que aparecem lá.
TEMAS = {
    "Saúde": "saude",
    "Educação": "educacao",
    "Direito Penal e Processual Penal": "penal",
    "Meio Ambiente e Desenvolvimento Sustentável": "ambiente",
    "Política, Partidos e Eleições": "politica",
    "Viação, Transporte e Mobilidade": "transporte",
    "Administração Pública": "administracao",
    "Indústria, Comércio e Serviços": "industria",
    "Direitos Humanos e Minorias": "direitos-humanos",
}


def desenhar(xy, limites, opacidade):
    """A transparência de uma camada: cada ponto soma `opacidade` no seu pixel e um pouco nos
    vizinhos, como um ponto pequeno e translúcido de um gráfico de dispersão."""
    (x0, y0), (x1, y1) = limites
    altura = round(LARGURA * (y1 - y0) / (x1 - x0))
    coluna = np.clip(((xy[:, 0] - x0) / (x1 - x0) * (LARGURA - 1)).round().astype(int), 0, LARGURA - 1)
    linha = np.clip(((y1 - xy[:, 1]) / (y1 - y0) * (altura - 1)).round().astype(int), 0, altura - 1)
    contagem = np.zeros((altura, LARGURA))
    np.add.at(contagem, (linha, coluna), 1.0)
    # o ponto ocupa o pixel e, mais fraco, os oito vizinhos
    borrado = np.zeros_like(contagem)
    for dl, dc, peso in [(0, 0, 1.0), (0, 1, 0.5), (0, -1, 0.5), (1, 0, 0.5), (-1, 0, 0.5),
                         (1, 1, 0.25), (1, -1, 0.25), (-1, 1, 0.25), (-1, -1, 0.25)]:
        borrado += peso * np.roll(np.roll(contagem, dl, axis=0), dc, axis=1)
    return 1.0 - (1.0 - opacidade) ** borrado


def gravar_mascara(alfa, caminho):
    """Um WebP preto com a transparência dada."""
    rgba = np.zeros((*alfa.shape, 4), dtype=np.uint8)
    rgba[..., 3] = (alfa * 255).round().astype(np.uint8)
    caminho.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(caminho, "WEBP", lossless=True, method=6)


def compor(fundo, destaque, largura):
    """A figura pronta sobre branco, com as cores dos gráficos da dissertação: fundo cinza,
    destaque em azul."""
    cinza, azul = np.array([170, 170, 170]), np.array([39, 80, 127])
    imagem = 255 - fundo[..., None] * 0.55 * (255 - cinza)
    imagem = imagem * (1 - destaque[..., None]) + azul * destaque[..., None]
    figura = Image.fromarray(imagem.round().astype(np.uint8), "RGB")
    return figura.resize((largura, round(largura * figura.height / figura.width)), Image.LANCZOS)


coordenadas = pd.read_parquet(TESE / "data/07embedding-map/coords.parquet")
xy = coordenadas[["umap30_x", "umap30_y"]].to_numpy()
minimo, maximo = xy.min(axis=0), xy.max(axis=0)
limites = np.array([minimo - 0.02 * (maximo - minimo), maximo + 0.02 * (maximo - minimo)])

temas_por_id = um.load_themes(TESE / "data/01bills-metadata/enriched")
temas = [temas_por_id.get(int(i), []) for i in coordenadas["id"]]

pasta = SITE / "public/img/mapa"
todas = desenhar(xy, limites, 0.5)
gravar_mascara(todas, pasta / "todas.webp")
contagens = {"todas": len(xy), "largura": LARGURA, "altura": todas.shape[0]}

camadas = {}
for nome, arquivo in TEMAS.items():
    marcadas = np.array([nome in t for t in temas])
    camadas[arquivo] = desenhar(xy[marcadas], limites, 0.6)
    gravar_mascara(camadas[arquivo], pasta / f"{arquivo}.webp")
    contagens[arquivo] = int(marcadas.sum())

# A figura da dissertação na página de Pesquisa: o tema de saúde em destaque.
pesquisa = SITE / "public/img/research"
compor(todas, camadas["saude"], 1600).save(pesquisa / "dissertation.webp", "WEBP", quality=82, method=6)
compor(todas, camadas["saude"], 480).save(pesquisa / "thumbs/dissertation.webp", "WEBP", quality=82, method=6)
contagens["figura"] = list(compor(todas, camadas["saude"], 1600).size)

print(json.dumps(contagens, ensure_ascii=False, indent=2))
