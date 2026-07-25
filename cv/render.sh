#!/usr/bin/env bash
# Renderiza os dois currículos e copia os PDFs para o site.
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

echo
echo "PDFs atualizados em cv/ e em public/files/."
echo "Rode 'npm run build' na raiz para publicar."
