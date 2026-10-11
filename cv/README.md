# Currículo

Currículo em Quarto, em duas versões e duas línguas: o completo
(`cv-en.qmd`, `cv-pt.qmd`, 4 páginas) e o resumido (`cv-en-short.qmd`,
`cv-pt-short.qmd`, 2 páginas). O PDF é a versão impressa do site: mesmas
fontes, mesma coluna de datas à esquerda, mesmos números de seção.

O resumido é pensado para vagas fora da academia (institutos de pesquisa,
*think tanks*): perfil no topo, experiência antes de formação e publicações,
uma ou duas linhas por entrada e nada de referências. Não é gerado a partir
do completo; é um arquivo próprio, porque a ordem das seções muda.

## Como atualizar

Edite os `.qmd` — **os quatro, sempre** (completo e resumido, nas duas
línguas), mais o CV da web em `src/data/cv.ts` (`bodyHtml` para o completo,
`shortHtml` para o resumido), para não deixarem de bater — e rode, da raiz do
repositório:

```bash
./cv/render.sh
```

O script gera `cv-en.pdf`, `cv-pt.pdf`, `cv-en-short.pdf` e `cv-pt-short.pdf`
aqui, copia os quatro para `public/files/` (de onde o site serve os
downloads) e mostra quantas páginas cada um deu, terminando com erro se algum
não fechar no número esperado (4 e 2). Depois disso, `npm run build` na raiz regenera `docs/` e o PDF
novo entra no ar no próximo push.

Para renderizar um só arquivo enquanto escreve: `quarto render cv-en.qmd`
dentro de `cv/`.

## Arquivos

| Arquivo         | O que é                                                          |
|-----------------|------------------------------------------------------------------|
| `cv-en.qmd`     | conteúdo do currículo em inglês                                   |
| `cv-pt.qmd`     | conteúdo do currículo em português                                |
| `cv-*-short.qmd` | o currículo resumido (2 páginas), em inglês e em português       |
| `_quarto.yml`   | motor, página e margens — vale para os dois                       |
| `_preamble.tex` | todo o desenho: fontes, cores, cabeçalho, seções, entradas, rodapé |
| `_cv.lua`       | filtro Pandoc: datas, blocos `:::` e rótulos de recurso           |
| `fonts/`        | as fontes do PDF e as licenças delas                              |
| `render.sh`     | renderiza os quatro, confere as páginas e copia para `public/files/` |

Arquivos com `_` na frente são ignorados pelo Quarto na hora de renderizar o
projeto, então só os quatro `.qmd` viram PDF.

## Fontes e motor

O PDF usa as fontes do site: **Geist** no texto, **Geist Mono** em datas,
rótulos e números de seção, e **Newsreader** itálico em todo itálico do
markdown (títulos de trabalhos, periódicos, cargos). Os arquivos estáticos
estão em `fonts/` — só os seis que o PDF usa — com as licenças (`OFL-*.txt`,
SIL Open Font License, que permite redistribuir junto do projeto). Ficam no
repositório para o PDF sair igual em qualquer máquina, sem instalar nada no
sistema.

Por causa delas o motor é **LuaLaTeX** (`pdf-engine: lualatex`): o pdflatex
não lê fontes OpenType. O itálico é Newsreader de propósito — é assim que o
site compõe títulos —, então não troque o `ItalicFont` achando que é erro.

## Convenções do conteúdo

Os `.qmd` são markdown puro, sem ícones. O que tem significado especial:

**Blocos do cabeçalho.** Logo depois do YAML vêm quatro blocos, nesta ordem:

```markdown
::: position        <- linha do cargo atual, embaixo do nome
::: contact         <- e-mail, site, perfis (um parágrafo por linha)
::: interests       <- interesses de pesquisa
```

e, no fim do arquivo, `::: references` com um parágrafo por referência (nome
em negrito, instituição, e-mail em `código`, separados por `\` no fim da
linha). As referências saem numa grade de duas colunas.

O `kicker:` do YAML é a linha pequena acima do nome ("Curriculum vitae ·
September 2026"); atualize o mês quando mexer no currículo.

**Separador `\cvsep`.** É o ponto médio entre itens da mesma linha. Antes de
um link, escreva `\cvsep{}` com as chaves:

```markdown
[felipelamarca.com](https://felipelamarca.com) \cvsep{} [github.com/felipelmc](https://github.com/felipelmc)
```

Sem as chaves o Pandoc lê o `[texto]` do link como argumento do comando e
imprime `[texto](url)` literalmente.

**Níveis de título.** São três, e o nível é o que define a formatação:

```markdown
# Education                                    <- seção, numerada (01, 02…)
## Laboratories, IESP-UERJ                     <- grupo dentro da seção (opcional)
### AtlasIntel [06/2025 -- Present]{.date}     <- entrada
```

Entradas são sempre `###`, mesmo quando não há um `##` acima.

**Data da entrada.** O `[...]{.date}` no fim do título vai para a coluna da
esquerda, em mono cinza. Datas `MM/AAAA` viram "Jun 2025" (en) ou "jun 2025"
(pt) sozinhas; use `--` entre início e fim.

**Cargo.** Um parágrafo que é só um itálico, logo abaixo do título da
entrada, é o cargo e sai em itálico cinza na mesma linha do título
("NECON, IESP-UERJ · Researcher"), ou na linha de baixo quando não cabe:

```markdown
### [NECON](http://necon.iesp.uerj.br), IESP-UERJ [01/2026 -- Present]{.date}

*Researcher*
```

O cargo na linha do título (`\cv@roleinlinetrue`, no `_preamble.tex`) foi
ligado em outubro de 2026, quando as descrições ficaram mais longas: ele
economiza uma linha por entrada. Desligá-lo devolve o cargo à linha própria,
mas o completo deixa de caber em 4 páginas.

**Rótulos em itálico.** Um parágrafo que começa com um itálico terminado em
ponto — `*Selected delivery.*`, `*Expected deliveries.*`, `*Summer schools
and training.*` — sai um pouco menor e em cinza, como as entregas no site.

**Listas com rótulo.** Apresentações, bolsas, prêmios, docência e
competências são listas de definição; o rótulo (data, semestre, área) vai
para a coluna da esquerda:

```markdown
Aug 2026

:   **Título do curso.** Descrição…
```

O rótulo precisa caber em ~11 caracteres ("Programming", "2026–2027").

**Recursos.** Links para material escrevem-se com colchetes duplos e saem
como etiquetas pequenas em verde, sem colchetes:

```markdown
[[DOI]](https://doi.org/…) · [[PDF]](https://…)
```

Fora isso: `--` vira travessão curto (–), uma barra invertida no fim da linha
quebra a linha sem abrir parágrafo, e `código` sai em Geist Mono.

## Duas coisas que quebram fácil

**Paginação.** Os completos fecham em **4 páginas cheias** e os resumidos em
**2**: nenhum título solto no pé da página e a última página pelo menos três
quartos cheia. O português corre mais longo que o inglês e é sempre o primeiro a
estourar. O `render.sh` avisa quando um PDF sai com outro número de páginas;
aí olhe a última página. Se ela ficou rala ou virou uma quinta página, corte
ou encurte alguma coisa no conteúdo antes de mexer no desenho. Se precisar
mexer no desenho, a ordem é: espaços entre seções e entradas, depois
margens, depois o corpo (`\cv@scale` no `_preamble.tex`, hoje 9,5pt; não
desça de 9,2pt).

**Ordem das seções.** No completo: formação, as três experiências (pesquisa,
profissional, docente) e só então publicações, bolsas e prêmios, software,
apresentações, competências e referências. Até outubro de 2026 a ordem era a
inversa (o que você produziu antes de onde você trabalhou); mudou porque
quem lê o CV, de institutos de pesquisa a bancas, procura primeiro onde e
com o quê a pessoa trabalha. O resumido segue a mesma lógica, com a
experiência antes da formação. Se mexer nisso, mexa nos dois idiomas.

## Conferências depois de renderizar

Além de olhar as quatro páginas:

```bash
cd cv
pdfinfo cv-pt.pdf | grep Pages     # 4
pdffonts cv-pt.pdf                 # todas "emb yes"; nenhuma "Type 3"
pdftotext cv-pt.pdf - | head -60   # ordem de leitura
```

No `pdftotext`, cada seção deve sair como "01 Education", e cada data logo
antes do título da sua entrada. É assim que sistemas de triagem (ATS) e o
copiar-e-colar leem o PDF. Se as datas aparecerem todas juntas antes dos
títulos, algum tamanho de fonte mudou demais: os títulos de entrada precisam
ficar a menos de 5% do tamanho do corpo.

## Dependências

- [Quarto](https://quarto.org) 1.9 ou mais novo.
- TinyTeX: `quarto install tinytex` (uma vez só). O LuaLaTeX vem junto.
- `pdfinfo`, `pdffonts` e `pdftotext` (Poppler: `brew install poppler`),
  só para as conferências.
