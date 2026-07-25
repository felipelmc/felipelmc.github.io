-- Filtro Pandoc do currículo. Duas conversões, ambas definidas em
-- _preamble.tex:
--
--   [texto]{.date}   -> \cvdate{texto}, a etiqueta preta alinhada à direita
--                       que fecha cada título de entrada:
--
--                         ### AtlasIntel [06/2025 -- Present]{.date}
--
--   ::: contact      -> ambiente cvcontact, a linha centralizada de contato
--                       logo abaixo do nome.
--
-- Fora do PDF (por exemplo, ao pré-visualizar em HTML) nada disso se aplica:
-- o span vira só o texto da data e o div, um parágrafo comum.

if FORMAT ~= "latex" and FORMAT ~= "beamer" then
  return {}
end

local function open(cmd)
  return pandoc.RawInline("latex", "\\" .. cmd .. "{")
end

local close = pandoc.RawInline("latex", "}")

function Span(el)
  if el.classes:includes("date") then
    local out = pandoc.List({ open("cvdate") })
    out:extend(el.content)
    out:insert(close)
    return out
  end
end

function Div(el)
  if el.classes:includes("contact") then
    local out = pandoc.List({ pandoc.RawBlock("latex", "\\begin{cvcontact}") })
    out:extend(el.content)
    out:insert(pandoc.RawBlock("latex", "\\end{cvcontact}"))
    return out
  end
end
