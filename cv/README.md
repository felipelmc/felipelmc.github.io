# Currículo

Currículo em Quarto, em inglês (`cv-en.qmd`) e em português (`cv-pt.qmd`).
Substitui o projeto LaTeX que ficava no Overleaf.

## Como atualizar

Edite o `.qmd` do idioma — **os dois, sempre**, para não deixarem de bater — e
rode:

```bash
./render.sh
```

O script gera `cv-en.pdf` e `cv-pt.pdf` aqui e copia os dois para
`public/files/`, que é de onde o site serve os downloads. Depois disso,
`npm run build` na raiz regenera `docs/` e o PDF novo entra no ar no próximo
push.

Para renderizar um só arquivo enquanto escreve: `quarto render cv-en.qmd`.

## Arquivos

| Arquivo         | O que é                                                          |
|-----------------|------------------------------------------------------------------|
| `cv-en.qmd`     | conteúdo do currículo em inglês                                   |
| `cv-pt.qmd`     | conteúdo do currículo em português                                |
| `_quarto.yml`   | formato do PDF (margens, corpo, engine) — vale para os dois       |
| `_preamble.tex` | toda a formatação: nome, seções, entradas, etiqueta de data       |
| `_cv.lua`       | filtro Pandoc: `[data]{.date}` e o bloco `::: contact`            |
| `render.sh`     | renderiza os dois e copia para `public/files/`                    |

Arquivos com `_` na frente são ignorados pelo Quarto na hora de renderizar o
projeto, então só os dois `.qmd` viram PDF.

## Convenções do conteúdo

Os `.qmd` são markdown puro, com três exceções pequenas.

**Níveis de título.** São três, e o nível é o que define a formatação:

```markdown
# \faUser\ Sobre mim          <- seção, com ícone e régua embaixo
## Docência                    <- subseção (opcional, agrupa entradas)
### AtlasIntel [06/2025 -- Presente]{.date}   <- entrada
```

Entradas são sempre `###`, mesmo quando não há um `##` acima — pular o nível
é proposital.

**Data da entrada.** O `[...]{.date}` no fim do título vira a data em itálico
cinza, alinhada à direita. Título longo demais empurra a data para a linha de
baixo; quando isso acontecer, encurte o título e mande o resto para o corpo.

**Ícones.** Vêm do pacote `fontawesome5` e entram como LaTeX cru
(`\faUser`, `\faTrophy`, `\faGithub`…), seguidos de `\ ` para o espaço.
A lista de nomes está em <https://ctan.org/pkg/fontawesome5>.

Fora isso: `--` vira travessão curto (–), uma barra invertida no fim da linha
quebra a linha sem abrir parágrafo, e listas de data (`ago 2026` + linha
começando com `:   `) viram entradas com o rótulo numa coluna à esquerda —
o rótulo precisa caber em ~5,8 em, senão transborda.

## Duas coisas que quebram fácil

**Paginação.** Os dois currículos fecham em 4 páginas cheias, sem seção órfã
no pé nem página final quase vazia. Isso é apertado: qualquer parágrafo novo
pode empurrar as Referências sozinhas para uma quinta página. Depois de
editar, olhe a última página. Se ela ficar rala, corte ou encurte alguma coisa
— o português corre ~15% mais longo que o inglês e é sempre o primeiro a
estourar.

**Ordem das seções.** É a ordem que bancas de doutorado esperam: interesses,
formação, publicações, software, apresentações, bolsas e prêmios, e só então
as experiências. O que você produziu vem antes de onde você trabalhou. Se
mexer nisso, mexa nos dois arquivos.

## Dependências

- [Quarto](https://quarto.org) 1.9 ou mais novo.
- TinyTeX: `quarto install tinytex` (uma vez só).

O PDF é compilado com `pdflatex` em TeX Gyre Pagella. Não troque para
`xelatex` sem motivo: o `fontfamily` do `_quarto.yml` é um mecanismo de
pdflatex e o nome do topo perde os versaletes.
