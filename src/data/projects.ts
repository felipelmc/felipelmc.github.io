import type { L, Project } from './types';

// Projects shown on /projects (and, where `home` is set, on the home page).
// Descriptions come from the site, the CV (cv/*.qmd) and the repositories'
// own descriptions. Screenshots are produced by `npm run shots`
// (scripts/capture-projects.mjs) and committed under public/img/projects/.

const danielle = { name: 'Danielle Sanches de Almeida', affiliation: 'FGV ECMI' };

export const projects: Project[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    slug: 'relicaria',
    title: 'RelicárIA',
    code: true,
    year: 2025,
    tier: 'featured',
    home: 1,
    categories: ['ai', 'software'],
    tagline: {
      en: 'A platform that combines AI and data analysis to extract and visualize information from historical documents.',
      'pt-br': 'Plataforma que combina IA e análise de dados para extrair e visualizar informações de documentos históricos.',
    },
    collaborators: [danielle],
    stack: ['python', 'streamlit', 'ocr', 'ner', 'llm'],
    links: [
      { kind: 'live', href: 'https://relicaria.streamlit.app/' },
      { kind: 'repo', href: 'https://github.com/felipelmc/RelicarIA' },
      { kind: 'doi', href: 'https://doi.org/10.5281/zenodo.15536372' },
    ],
    award: {
      label: {
        en: 'DH Awards 2025 – 2nd Runner Up, Best DH Tool or Suite of Tools',
        'pt-br': 'DH Awards 2025 – 2nd Runner Up (3º lugar), Best DH Tool or Suite of Tools',
      },
      href: 'http://dhawards.org/dhawards2025/results/',
    },
    coldStart: true,
    shot: {
      domain: 'relicaria.streamlit.app',
      alt: {
        en: 'RelicárIA web app interface',
        'pt-br': 'Interface do aplicativo RelicárIA',
      },
    },
    citation: {
      key: 'relicaria',
      bibtex: `@misc{relicaria,
  author    = {Almeida, D. and Lamarca, F.},
  title     = {RelicárIA},
  year      = {2025},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.15536372}
}`,
    },
  },
  {
    slug: 'mape-dashboard',
    title: 'mape_municipios_dashboard',
    code: true,
    year: 2025,
    tier: 'featured',
    home: 2,
    categories: ['apps', 'data'],
    tagline: {
      en: 'A dashboard to interact with one of the most complete databases with information on Brazilian municipalities, collected by MAPE.',
      'pt-br': 'Dashboard para interagir com uma das bases de dados mais completas sobre municípios brasileiros, coletada pelo MAPE.',
    },
    context: 'MAPE · IESP-UERJ',
    collaborators: [{ name: 'Fernando Meireles', affiliation: 'IESP-UERJ' }],
    stack: ['python', 'streamlit'],
    links: [
      { kind: 'live', href: 'https://mape-municipios-dashboard.streamlit.app/' },
      { kind: 'repo', href: 'https://github.com/mape-iesp/MAPEmunicipios-Dashboard' },
    ],
    coldStart: true,
    shot: {
      domain: 'mape-municipios-dashboard.streamlit.app',
      alt: {
        en: 'The mape_municipios dashboard',
        'pt-br': 'O dashboard do mape_municipios',
      },
    },
  },
  {
    slug: 'abcp-2026',
    title: 'Programação ABCP 2026',
    year: 2026,
    tier: 'featured',
    home: 3,
    categories: ['apps'],
    tagline: {
      en: 'The programme of the 15th ABCP Meeting (Belém, 2026) in real time: what’s on right now, a personal agenda, a calendar, and search across every paper and abstract. What you mark stays on your device.',
      'pt-br': 'Programação do 15º Encontro da ABCP (Belém, 2026) em tempo real: o que está rolando agora, agenda pessoal, calendário e busca em todos os trabalhos e resumos. O que você marca fica só no seu aparelho.',
    },
    stats: [
      { value: '170', label: { en: 'sessions', 'pt-br': 'atividades' } },
      { value: '579', label: { en: 'papers with abstracts', 'pt-br': 'trabalhos com resumo' } },
    ],
    stack: ['javascript'],
    links: [
      { kind: 'site', href: 'https://felipelamarca.com/Programacao-ABCP-2026/' },
      { kind: 'repo', href: 'https://github.com/felipelmc/Programacao-ABCP-2026' },
    ],
    shot: {
      domain: 'felipelamarca.com/Programacao-ABCP-2026',
      alt: {
        en: 'The live programme of the ABCP 2026 meeting',
        'pt-br': 'A programação ao vivo do Encontro da ABCP 2026',
      },
    },
  },
  {
    slug: 'acre-deforestation',
    title: { en: 'Deforestation monitor, Acre', 'pt-br': 'Monitor do desmatamento no Acre' },
    year: 2025,
    tier: 'featured',
    home: 4,
    categories: ['apps', 'data', 'viz'],
    tagline: {
      en: 'A preliminary version of the RESA project’s public monitoring platform, covering deforestation in Acre.',
      'pt-br': 'Versão preliminar da plataforma pública de monitoramento do projeto RESA, com dados de desmatamento no Acre.',
    },
    descriptionHtml: {
      en: 'Maps PRODES/INPE deforestation data for Acre and the Chico Mendes Extractive Reserve, year by year. Part of a study of family-based agroextractive production in the reserve, coordinated by Luci Maria Teston (UFAC).',
      'pt-br': 'Mapeia os dados de desmatamento do PRODES/INPE no Acre e na Reserva Extrativista Chico Mendes, ano a ano. Parte de um estudo sobre a produção agroextrativista familiar na reserva, coordenado por Luci Maria Teston (UFAC).',
    },
    context: { en: 'RESA project · UFAC and IESP-UERJ', 'pt-br': 'Projeto RESA · UFAC e IESP-UERJ' },
    stack: ['python', 'streamlit'],
    links: [{ kind: 'live', href: 'https://mapa-do-desmatamento-acre.streamlit.app/' }],
    coldStart: true,
    shot: {
      domain: 'mapa-do-desmatamento-acre.streamlit.app',
      alt: {
        en: 'Deforestation monitoring platform for Acre',
        'pt-br': 'Plataforma de monitoramento do desmatamento no Acre',
      },
    },
  },
  {
    slug: 'mapemunicipios',
    title: 'mape_municipios',
    code: true,
    year: 2025,
    tier: 'featured',
    categories: ['data'],
    tagline: {
      en: 'One of the most complete databases on Brazilian municipalities, organized in 17 thematic dimensions and documented as an R package. I build and maintain it and its public interface.',
      'pt-br': 'Um dos mais completos bancos de dados sobre os municípios brasileiros, organizado em 17 dimensões temáticas e documentado como pacote R. Construo e mantenho a base e sua interface pública.',
    },
    context: 'MAPE · IESP-UERJ',
    stats: [
      { value: { en: '5,570', 'pt-br': '5.570' }, label: { en: 'municipalities', 'pt-br': 'municípios' } },
      { value: '17', label: { en: 'thematic dimensions', 'pt-br': 'dimensões temáticas' } },
    ],
    stack: ['r'],
    links: [
      { kind: 'data', href: 'https://felipelamarca.com/MAPEmunicipios/', label: { en: 'Data site', 'pt-br': 'Site dos dados' } },
      { kind: 'repo', href: 'https://github.com/mape-iesp/MAPEmunicipios' },
    ],
    shot: {
      domain: 'felipelamarca.com/MAPEmunicipios',
      alt: {
        en: 'The mape_municipios data site',
        'pt-br': 'O site de dados do mape_municipios',
      },
    },
  },
  {
    slug: 'boticaria',
    title: 'BoticárIA',
    code: true,
    year: 2025,
    tier: 'featured',
    categories: ['ai'],
    tagline: {
      en: 'A RAG-based conversational AI that simulates an 18th-century apothecary, providing information on medicinal practices based on historical pharmacological sources from the late 18th century.',
      'pt-br': 'IA conversacional baseada em RAG que simula um boticário do século XVIII, fornecendo informações sobre práticas medicinais com base em fontes farmacológicas históricas do final do século XVIII.',
    },
    descriptionHtml: {
      en: 'Its knowledge comes from two historical pharmacopoeias, the <em>Farmacopeia Geral do Reino</em> (1794) and the <em>Farmacopeia Naval</em> (1779).',
      'pt-br': 'Seu conhecimento vem de duas farmacopeias históricas, a <em>Farmacopeia Geral do Reino</em> (1794) e a <em>Farmacopeia Naval</em> (1779).',
    },
    collaborators: [danielle],
    stack: ['python', 'streamlit', 'rag', 'llm'],
    links: [{ kind: 'live', href: 'https://boticaria.streamlit.app/' }],
    coldStart: true,
    shot: {
      domain: 'boticaria.streamlit.app',
      alt: {
        en: 'The BoticárIA chat interface',
        'pt-br': 'A interface de conversa do BoticárIA',
      },
    },
  },

  // ── Standard ──────────────────────────────────────────────────────────────
  {
    slug: 'dhbb-parentescos',
    title: 'DHBB-Parentescos',
    year: 2024,
    tier: 'standard',
    categories: ['viz', 'data'],
    tagline: {
      en: 'Extracts kinship ties between the people profiled in the Dicionário Histórico-Biográfico Brasileiro (DHBB) and visualizes them as interactive graphs: 6,785 people and 5,547 ties in the full graph.',
      'pt-br': 'Extração de parentescos entre os verbetados do Dicionário Histórico-Biográfico Brasileiro (DHBB) e visualização em grafos interativos: 6.785 pessoas e 5.547 laços no grafo completo.',
    },
    context: { en: 'FGV CPDOC · funded by CAPES', 'pt-br': 'FGV CPDOC · financiamento CAPES' },
    stack: ['python', 'graphs'],
    links: [{ kind: 'site', href: 'https://felipelamarca.com/DHBB-Parentescos/' }],
    shot: {
      domain: 'felipelamarca.com/DHBB-Parentescos',
      alt: {
        en: 'DHBB kinship graph',
        'pt-br': 'Grafo de parentescos do DHBB',
      },
    },
  },
  {
    slug: 'lgbtqia-indicators',
    title: { en: 'LGBTQIA+ indicators in Rio de Janeiro', 'pt-br': 'Indicadores LGBTQIA+ no Rio de Janeiro' },
    year: 2026,
    tier: 'standard',
    categories: ['apps', 'data'],
    tagline: {
      en: 'A dashboard built on the mape_municipios infrastructure for the office of state deputy Dani Balbi, bringing together MUNIC, PNS, and Censo SUAS data on the LGBTQIA+ population of the state of Rio de Janeiro, including the territorial distribution of social assistance facilities.',
      'pt-br': 'Dashboard construído sobre a infraestrutura do mape_municipios para o mandato da deputada estadual Dani Balbi, reunindo dados da MUNIC, da PNS e do Censo SUAS sobre a população LGBTQIA+ do estado do Rio de Janeiro, incluindo a distribuição territorial dos equipamentos de assistência social.',
    },
    collaborators: [{ name: 'Tomás Paixão Borges', affiliation: 'IESP-UERJ' }],
    stack: ['python'],
    links: [],
    privateDeployment: true,
  },
  {
    slug: 'quarto-model-iesp',
    title: 'Quarto-Model-IESP',
    code: true,
    year: 2026,
    tier: 'standard',
    categories: ['software'],
    tagline: {
      en: 'A Quarto template for IESP-UERJ theses and dissertations.',
      'pt-br': 'Template Quarto para teses e dissertações do IESP-UERJ.',
    },
    collaborators: [{ name: 'Matheus Cavalcanti Pestana', affiliation: 'IESP-UERJ' }],
    stack: ['quarto', 'latex'],
    links: [
      { kind: 'repo', href: 'https://github.com/felipelmc/Quarto-Model-IESP' },
      { kind: 'doi', href: 'https://doi.org/10.5281/zenodo.20819431' },
    ],
    citation: {
      key: 'quarto-model-iesp',
      bibtex: `@software{lamarcaPestana2026quarto,
  author    = {Lamarca, Felipe and Pestana, Matheus Cavalcanti},
  title     = {Quarto Template for {IESP-UERJ} Dissertations and Theses},
  year      = {2026},
  publisher = {Zenodo},
  version   = {v1},
  doi       = {10.5281/zenodo.20819431},
  url       = {https://doi.org/10.5281/zenodo.20819431}
}`,
    },
  },
  {
    slug: 'comida-di-buteco',
    title: 'Comida di Buteco',
    year: 2026,
    tier: 'standard',
    categories: ['viz', 'data'],
    tagline: {
      en: 'Comida di Buteco is a contest that picks the best bars in cities across Brazil. This project uses web scraping and geolocation to map those bars nationwide.',
      'pt-br': 'Comida di Buteco é um concurso que elege os melhores botecos de várias cidades brasileiras. Este projeto usa webscraping e geolocalização para mapear esses bares em todo o Brasil.',
    },
    stack: ['web scraping', 'geolocation', 'maplibre'],
    links: [
      { kind: 'site', href: 'https://felipelamarca.com/ComidaDiButeco/' },
      { kind: 'repo', href: 'https://github.com/felipelmc/ComidaDiButeco' },
    ],
    shot: {
      domain: 'felipelamarca.com/ComidaDiButeco',
      alt: {
        en: 'Map of Comida di Buteco bars',
        'pt-br': 'Mapa dos bares do Comida di Buteco',
      },
    },
  },
  {
    slug: 'formula1-viz',
    title: 'Visual F1',
    year: 2023,
    tier: 'standard',
    categories: ['viz'],
    coursework: true,
    tagline: {
      en: 'Visualizations of Formula 1 in D3.js: the sport’s history, constructors in bar races, and pit-stop times by team. Final project of the Data Visualization course at FGV.',
      'pt-br': 'Visualizações da Fórmula 1 em D3.js: a história do esporte, as construtoras em bar races e os tempos de pit stop por equipe. Projeto final da disciplina de Visualização de Dados da FGV.',
    },
    collaborators: [{ name: 'Ana Carolina Erthal' }, { name: 'Guilherme de Melo' }],
    stack: ['d3.js'],
    links: [
      { kind: 'site', href: 'https://felipelamarca.com/Formula1-Viz/' },
      { kind: 'repo', href: 'https://github.com/felipelmc/Formula1-Viz' },
    ],
    shot: {
      domain: 'felipelamarca.com/Formula1-Viz',
      alt: {
        en: 'Landing page of the Visual F1 project',
        'pt-br': 'Página inicial do projeto Visual F1',
      },
    },
  },
  {
    slug: 'nascidos-vivos-viz',
    title: 'Você em dados',
    year: 2023,
    tier: 'standard',
    categories: ['viz'],
    coursework: true,
    tagline: {
      en: 'Newborns’ Apgar scores across the municipalities of Rio de Janeiro, year by year, with histograms by sex, birth weight, type of delivery and mother’s age. SINASC data via Base dos Dados; built in D3.js for the Data Visualization course at FGV EMAp.',
      'pt-br': 'O índice de Apgar dos recém-nascidos nos municípios do Rio de Janeiro, ano a ano, com histogramas por sexo, peso ao nascer, tipo de parto e idade da mãe. Dados do SINASC via Base dos Dados; feito em D3.js para a disciplina de Visualização de Dados da FGV EMAp.',
    },
    stack: ['d3.js'],
    links: [
      { kind: 'site', href: 'https://felipelamarca.com/Nascidos-Vivos-Viz/' },
      { kind: 'repo', href: 'https://github.com/felipelmc/Nascidos-Vivos-Viz' },
    ],
    shot: {
      domain: 'felipelamarca.com/Nascidos-Vivos-Viz',
      alt: {
        en: 'Map of average Apgar scores by municipality in Rio de Janeiro',
        'pt-br': 'Mapa do índice de Apgar médio por município do Rio de Janeiro',
      },
    },
  },

  // ── Compact ───────────────────────────────────────────────────────────────
  {
    slug: 'scielo-summarizer',
    title: 'SciELO-Summarizer',
    code: true,
    year: 2024,
    tier: 'compact',
    categories: ['ai'],
    tagline: {
      en: 'Scrapes papers from SciELO and summarizes them using Llama3.',
      'pt-br': 'Extrai artigos do SciELO e os resume utilizando Llama3.',
    },
    stack: ['python', 'llama3', 'web scraping'],
    links: [{ kind: 'repo', href: 'https://github.com/felipelmc/SciELO-Summarizer' }],
  },
  {
    slug: 'electoral-concentration',
    title: 'Electoral-Concentration',
    code: true,
    year: 2025,
    tier: 'compact',
    categories: ['apps', 'software'],
    tagline: {
      en: 'A Streamlit app to calculate electoral concentration for Brazilian candidates, as proposed by Avelino, Biderman and Silva (2016).',
      'pt-br': 'App em Streamlit que calcula a concentração eleitoral de candidatos brasileiros, como proposto por Avelino, Biderman e Silva (2016).',
    },
    stack: ['python', 'streamlit'],
    links: [{ kind: 'repo', href: 'https://github.com/felipelmc/Electoral-Concentration' }],
  },
  {
    slug: 'statistical-modeling',
    title: 'Statistical-Modeling',
    code: true,
    year: 2023,
    tier: 'compact',
    categories: ['data'],
    coursework: true,
    tagline: {
      en: 'Statistical modeling of vote dynamics for federal deputies in the 2022 elections, for Luiz Max Carvalho’s course at FGV EMAp.',
      'pt-br': 'Modelagem estatística da dinâmica do voto em deputados federais nas eleições de 2022, na disciplina do Professor Luiz Max (FGV EMAp).',
    },
    stack: ['python'],
    links: [{ kind: 'repo', href: 'https://github.com/felipelmc/Statistical-Modeling' }],
  },
];

/** Work delivered for organizations, listed as text only (from the CV). */
export const clientWork: { what: L; who: string; when: string }[] = [
  {
    what: {
      en: 'Digitized and systematized historical election results with OCR and LLMs.',
      'pt-br': 'Digitalização e sistematização de resultados eleitorais históricos com OCR e LLMs.',
    },
    who: 'FGV EBAPE',
    when: '2025',
  },
  {
    what: {
      en: 'OCR and LLMs applied to the Brazilian Statistical Yearbooks to systematize social assistance data since the early 20th century.',
      'pt-br': 'OCR e LLMs aplicados aos Anuários Estatísticos Brasileiros para sistematizar dados de assistência social desde o início do século XX.',
    },
    who: 'CEBRAP',
    when: '2024–25',
  },
  {
    what: {
      en: 'LLM and RAG tools for structured extraction from unstructured documents.',
      'pt-br': 'Ferramentas de LLM e RAG para extração estruturada de documentos não estruturados.',
    },
    who: 'GENI/UFF',
    when: '2024–25',
  },
  {
    what: {
      en: 'Dashboards in Streamlit and Power BI, and an AWS data lake.',
      'pt-br': 'Dashboards em Streamlit e Power BI, e um data lake na AWS.',
    },
    who: 'Fundação Roberto Marinho',
    when: '2024–25',
  },
  {
    what: {
      en: 'A RAG pipeline for querying FGV researchers’ publications in natural language.',
      'pt-br': 'Pipeline RAG para consultar as publicações dos pesquisadores da FGV em linguagem natural.',
    },
    who: 'FGV',
    when: '2024',
  },
  {
    what: {
      en: 'An automated Python pipeline that cut report production from days to about an hour, and interactive maps for corporate audiences.',
      'pt-br': 'Pipeline automatizado em Python que reduziu a produção de relatórios de dias para cerca de uma hora, e mapas interativos para públicos corporativos.',
    },
    who: 'Instituto Rio21',
    when: '2022–25',
  },
];
