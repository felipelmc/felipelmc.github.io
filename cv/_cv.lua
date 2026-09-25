-- Filtro Pandoc do currículo. Tudo o que ele gera é definido em
-- _preamble.tex; o contrato entre os dois é:
--
--   ### Instituição [03/2025 -- Present]{.date}
--       -> \cvnextdate{Mar 2025 – Present} antes do título da entrada. O
--          preâmbulo guarda a data e a imprime junto do título (à direita ou
--          na coluna de datas, conforme o desenho). Datas MM/AAAA viram
--          "Mar 2025" (en) / "mar 2025" (pt), segundo o `lang` do .qmd.
--
--   [[DOI]](url), [[PDF]](url), [[Files]](url) …
--       -> link com \cvres{DOI}: rótulo pequeno, sem colchetes.
--
--   ::: position / ::: contact / ::: interests / ::: references
--       -> ambientes cvposition, cvcontact, cvinterests, cvreferences.
--
-- Fora do PDF (por exemplo, ao pré-visualizar em HTML) nada disso se aplica.

if FORMAT ~= "latex" and FORMAT ~= "beamer" then
  return {}
end

local lang = "en"

local months = {
  en = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" },
  pt = { "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez" },
}

-- Reads `lang` and hands the preamble two macros through header-includes:
-- \cvlang (en|pt) and \cvkicker (the YAML `kicker:` line, e.g.
-- "Curriculum vitae · September 2026").
local function read_meta(meta)
  if meta.lang then
    local l = pandoc.utils.stringify(meta.lang):lower()
    if l:match("^pt") then lang = "pt" end
  end
  local defs = "\\def\\cvlang{" .. lang .. "}"
  if meta.kicker then
    local k = pandoc.write(pandoc.Pandoc({ pandoc.Plain(meta.kicker) }), "latex"):gsub("%s+$", "")
    defs = defs .. "\n\\def\\cvkicker{" .. k .. "}"
  end
  local includes = meta["header-includes"]
  if includes == nil then
    includes = pandoc.List()
  elseif pandoc.utils.type(includes) ~= "List" then
    includes = pandoc.List({ includes })
  end
  includes:insert(pandoc.MetaBlocks({ pandoc.RawBlock("latex", defs) }))
  meta["header-includes"] = includes
  return meta
end

-- "03/2025" -> "Mar 2025" (en) / "mar 2025" (pt); anything else unchanged.
local function month_year(inlines)
  return inlines:walk({
    Str = function(s)
      local m, y = s.text:match("^(%d%d)/(%d%d%d%d)$")
      if m then
        local name = months[lang][tonumber(m)]
        if name then return pandoc.Str(name .. "\u{00A0}" .. y) end
      end
    end,
  })
end

local function latex(inlines)
  return pandoc.write(pandoc.Pandoc({ pandoc.Plain(inlines) }), "latex"):gsub("%s+$", "")
end

-- Entry headings: pull the [..]{.date} span out and announce it first.
local function entry_date(h)
  if h.level ~= 3 then return nil end
  local date
  h.content = h.content:filter(function(il)
    if il.t == "Span" and il.classes:includes("date") then
      date = latex(month_year(il.content))
      return false
    end
    return true
  end)
  while #h.content > 0 and (h.content[#h.content].t == "Space" or h.content[#h.content].t == "SoftBreak") do
    h.content:remove()
  end
  if date then
    return { pandoc.RawBlock("latex", "\\cvnextdate{" .. date .. "}"), h }
  end
end

-- Resource links written as [[DOI]](url): a small label instead of brackets.
local function resource(el)
  local text = pandoc.utils.stringify(el.content)
  local label = text:match("^%[(.+)%]$")
  if label then
    el.content = { pandoc.RawInline("latex", "\\cvres{" .. label .. "}") }
    return el
  end
end

local environments = {
  position = "cvposition",
  contact = "cvcontact",
  interests = "cvinterests",
  references = "cvreferences",
}

local function block_env(div)
  for class, env in pairs(environments) do
    if div.classes:includes(class) then
      local out = pandoc.List({ pandoc.RawBlock("latex", "\\begin{" .. env .. "}") })
      out:extend(div.content)
      out:insert(pandoc.RawBlock("latex", "\\end{" .. env .. "}"))
      return out
    end
  end
end

return {
  { Meta = read_meta },
  { Header = entry_date, Link = resource, Div = block_env },
}
