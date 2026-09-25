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
    year: 2025,
    tier: 'featured',
    home: 1,
    categories: ['ai', 'software'],
    tagline: {
      en: 'A platform that combines AI and data analysis to extract and visualize information from historical documents.',
      'pt-br': 'Plataforma que combina IA e análise de dados para extrair e visualizar informações de documentos históricos.',
    },
    collaborators: [danielle],
    stack: ['React', 'OCR', 'NER', 'LLM'],
    links: [
      { kind: 'live', href: 'https://relicariastudio.com.br/' },
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
    shot: {
      domain: 'relicariastudio.com.br',
      alt: {
        en: 'RelicárIA Studio interface',
        'pt-br': 'Interface do RelicárIA Studio',
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
    slug: 'mapemunicipios',
    title: 'mape_municipios',
    code: true,
    year: 2025,
    tier: 'featured',
    home: 2,
    categories: ['data'],
    tagline: {
      en: 'One of the most complete databases on Brazilian municipalities, organized in 17 thematic dimensions and documented as an R package. Made in partnership with researchers at MAPE, with whom I build and maintain the database and its public interface.',
      'pt-br': 'Um dos mais completos bancos de dados sobre os municípios brasileiros, organizado em 17 dimensões temáticas e documentado como pacote R. Feito em parceria com pesquisadores do MAPE, com quem construo e mantenho a base e sua interface pública.',
    },
    context: 'MAPE · IESP-UERJ',
    stats: [
      { value: { en: '5,570', 'pt-br': '5.570' }, label: { en: 'municipalities', 'pt-br': 'municípios' } },
      { value: '17', label: { en: 'thematic dimensions', 'pt-br': 'dimensões temáticas' } },
    ],
    stack: ['R'],
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
    slug: 'acre-deforestation',
    title: { en: 'Deforestation monitor, Acre', 'pt-br': 'Monitor do desmatamento no Acre' },
    year: 2025,
    tier: 'featured',
    home: 3,
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
    stack: ['Python', 'Streamlit'],
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
    slug: 'dhbb-parentescos',
    title: 'DHBB-Parentescos',
    year: 2026,
    tier: 'featured',
    home: 4,
    categories: ['ai', 'viz', 'data'],
    tagline: {
      en: 'Who is related to whom in Brazilian politics. Language models read the entries of the Dicionário Histórico-Biográfico Brasileiro (DHBB) and record each family tie they state, and every link in the network cites the passage it came from.',
      'pt-br': 'Quem é parente de quem na política brasileira. Modelos de linguagem leem os verbetes do Dicionário Histórico-Biográfico Brasileiro (DHBB) e registram cada laço de família que eles afirmam, e cada ligação da rede traz o trecho do verbete de onde saiu.',
    },
    context: { en: 'FGV CPDOC · funded by CAPES', 'pt-br': 'FGV CPDOC · financiamento CAPES' },
    stats: [
      { value: { en: '7,000', 'pt-br': '7.000' }, label: { en: 'entries read', 'pt-br': 'verbetes lidos' } },
      { value: { en: '22,568', 'pt-br': '22.568' }, label: { en: 'kinship ties', 'pt-br': 'laços de parentesco' } },
    ],
    stack: ['Python', 'LLM', 'Graphs'],
    links: [
      { kind: 'site', href: 'https://felipelamarca.com/DHBB-Parentescos/' },
      { kind: 'paper', href: 'https://felipelamarca.com/DHBB-Parentescos/artigo/' },
    ],
    shot: {
      domain: 'felipelamarca.com/DHBB-Parentescos',
      alt: {
        en: 'DHBB kinship graph',
        'pt-br': 'Grafo de parentescos do DHBB',
      },
    },
  },
  {
    slug: 'comida-di-buteco',
    title: 'Comida di Buteco',
    year: 2026,
    tier: 'featured',
    categories: ['viz', 'data'],
    tagline: {
      en: 'Comida di Buteco is a contest that picks the best bars in cities across Brazil. This project uses web scraping and geolocation to map those bars nationwide.',
      'pt-br': 'Comida di Buteco é um concurso que elege os melhores botecos de várias cidades brasileiras. Este projeto usa webscraping e geolocalização para mapear esses bares em todo o Brasil.',
    },
    stack: ['Web scraping', 'Geolocation', 'MapLibre'],
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
    slug: 'abcp-2026',
    title: 'Programação ABCP 2026',
    year: 2026,
    tier: 'featured',
    categories: ['apps'],
    tagline: {
      en: 'The programme of the 15th ABCP Meeting (Belém, 2026) in real time: what’s on right now, a personal agenda, a calendar, and search across every paper and abstract. What you mark stays on your device.',
      'pt-br': 'Programação do 15º Encontro da ABCP (Belém, 2026) em tempo real: o que está rolando agora, agenda pessoal, calendário e busca em todos os trabalhos e resumos. O que você marca fica só no seu aparelho.',
    },
    stats: [
      { value: '170', label: { en: 'sessions', 'pt-br': 'atividades' } },
      { value: '579', label: { en: 'papers with abstracts', 'pt-br': 'trabalhos com resumo' } },
    ],
    stack: ['JavaScript'],
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

  // ── Standard ──────────────────────────────────────────────────────────────
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
    stack: ['Quarto', 'LaTeX'],
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
    stack: ['Python'],
    links: [],
    privateDeployment: true,
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
