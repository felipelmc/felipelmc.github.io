#!/usr/bin/env bash
# Renderiza os quatro currículos (completo e resumido, em inglês e em
# português), mostra quantas páginas cada um deu e copia os PDFs para o site.
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

# Cada currículo e o número de páginas em que ele deve fechar: o completo em
# 4, o resumido em 2.
specs="cv-en:4 cv-pt:4 cv-en-short:2 cv-pt-short:2"

for spec in $specs; do
  quarto render "${spec%%:*}.qmd"
done

mkdir -p ../public/files
for spec in $specs; do
  cp "${spec%%:*}.pdf" ../public/files/
done

# Páginas de cada PDF. Se algum sair com outro número, olhe a última página
# (o README diz o que fazer); o script termina com erro.
pdfinfo_bin="$(command -v pdfinfo || true)"
[ -z "$pdfinfo_bin" ] && [ -x /opt/homebrew/bin/pdfinfo ] && pdfinfo_bin=/opt/homebrew/bin/pdfinfo

status=0
echo
if [ -n "$pdfinfo_bin" ]; then
  for spec in $specs; do
    pdf="${spec%%:*}.pdf"
    want="${spec##*:}"
    pages="$("$pdfinfo_bin" "$pdf" | awk '/^Pages:/ {print $2}')"
    note=""
    if [ "$pages" != "$want" ]; then
      note="   <- esperado: $want"
      status=1
    fi
    printf '%s: %s páginas%s\n' "$pdf" "$pages" "$note"
  done
else
  echo "(pdfinfo não encontrado: confira o número de páginas abrindo os PDFs;"
  echo " no Mac, 'brew install poppler' instala o pdfinfo.)"
fi

echo
echo "PDFs atualizados em cv/ e em public/files/."
echo "Rode 'npm run build' na raiz para publicar."
exit "$status"
