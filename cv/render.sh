#!/usr/bin/env bash
# Renderiza os dois currículos, mostra quantas páginas cada um deu e copia os
# PDFs para o site.
#
#   ./cv/render.sh
#
# Depois disso, `npm run build` na raiz regenera docs/ com os PDFs novos.

set -euo pipefail

cd "$(dirname "$0")"

# O TinyTeX que o Quarto instala não entra no PATH sozinho.
for bindir in "$HOME/Library/TinyTeX/bin"/*; do
  [ -d "$bindir" ] && PATH="$bindir:$PATH"
done
export PATH

quarto render cv-en.qmd
quarto render cv-pt.qmd

mkdir -p ../public/files
cp cv-en.pdf cv-pt.pdf ../public/files/

# Páginas de cada PDF. O desenho fecha em 4 páginas cheias; se aparecer 5,
# olhe a última página (o README diz o que fazer).
pdfinfo_bin="$(command -v pdfinfo || true)"
[ -z "$pdfinfo_bin" ] && [ -x /opt/homebrew/bin/pdfinfo ] && pdfinfo_bin=/opt/homebrew/bin/pdfinfo

echo
if [ -n "$pdfinfo_bin" ]; then
  for pdf in cv-en.pdf cv-pt.pdf; do
    pages="$("$pdfinfo_bin" "$pdf" | awk '/^Pages:/ {print $2}')"
    note=""
    [ "$pages" != "4" ] && note="   <- esperado: 4"
    printf '%s: %s páginas%s\n' "$pdf" "$pages" "$note"
  done
else
  echo "(pdfinfo não encontrado: confira o número de páginas abrindo os PDFs;"
  echo " no Mac, 'brew install poppler' instala o pdfinfo.)"
fi

echo
echo "PDFs atualizados em cv/ e em public/files/."
echo "Rode 'npm run build' na raiz para publicar."
