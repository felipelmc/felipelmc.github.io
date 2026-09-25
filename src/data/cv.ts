import type { Cv } from './types';

// Web CV. Mirrors the PDF CV (cv/cv-en.qmd, cv/cv-pt.qmd): keep the two in step.

const a = (href: string, text: string) =>
  `<a href="${href}" class="link" target="_blank" rel="noopener noreferrer">${text}</a>`;

export const cv: Cv = {
  lastUpdated: { en: 'Last updated: September 2026', 'pt-br': 'Atualizado em setembro de 2026' },

  education: [
    {
      when: { en: '2025–present', 'pt-br': '2025–atual' },
      html: { en: 'M.A. in Political Science', 'pt-br': 'Mestrado em Ciência Política' },
      subHtml: {
        en: `${a('https://iesp.uerj.br/en/', 'Institute of Social and Political Studies')} (IESP-UERJ) · Advisor: ${a('https://iesp.uerj.br/pesquisador/fernando-meireles/', 'Fernando Meireles, Ph.D.')}`,
        'pt-br': `${a('https://iesp.uerj.br/', 'Instituto de Estudos Sociais e Políticos')} (IESP-UERJ) · Orientador: ${a('https://iesp.uerj.br/pesquisador/fernando-meireles/', 'Fernando Meireles, Ph.D.')}`,
      },
    },
    {
      when: '2021–2024',
      html: {
        en: 'B.Sc. in Data Science and Artificial Intelligence',
        'pt-br': 'Bacharelado em Ciência de Dados e Inteligência Artificial',
      },
      subHtml: {
        en: `${a('https://emap.fgv.br/en', 'School of Applied Mathematics')} (FGV EMAp) · Advisor: ${a('https://emap.fgv.br/professores/luiz-max-fagundes-de-carvalho', 'Luiz Max Carvalho, Ph.D.')}`,
        'pt-br': `${a('https://emap.fgv.br/', 'Escola de Matemática Aplicada')} (FGV EMAp) · Orientador: ${a('https://emap.fgv.br/professores/luiz-max-fagundes-de-carvalho', 'Luiz Max Carvalho, Ph.D.')}`,
      },
    },
    {
      when: '2019–2024',
      html: { en: 'B.A. in Social Sciences', 'pt-br': 'Bacharelado em Ciências Sociais' },
      subHtml: {
        en: `${a('https://cpdoc.fgv.br/en', 'School of Social Sciences')} (FGV CPDOC) · Advisor: ${a('https://cpdoc.fgv.br/equipe/jaquelinezulini', 'Jaqueline Porto Zulini, Ph.D.')}`,
        'pt-br': `${a('https://cpdoc.fgv.br/', 'Escola de Ciências Sociais')} (FGV CPDOC) · Orientadora: ${a('https://cpdoc.fgv.br/equipe/jaquelinezulini', 'Jaqueline Porto Zulini, Ph.D.')}`,
      },
    },
  ],

  research: [
    {
      id: 'labs',
      title: { en: 'Laboratories, IESP-UERJ', 'pt-br': 'Laboratórios, IESP-UERJ' },
      entries: [
        {
          when: { en: '01/2026 – present', 'pt-br': '01/2026 – presente' },
          titleHtml: `${a('http://necon.iesp.uerj.br', 'NECON')} (IESP-UERJ)`,
          bodyHtml: {
            en: "<em>Researcher</em> at the Center for Studies on Congress, coordinated by Fabiano Santos. I work on the lab's databases on roll-call votes and legislative production.",
            'pt-br': '<em>Pesquisador</em> no Núcleo de Estudos sobre o Congresso, coordenado por Fabiano Santos. Trabalho nas bases de votações nominais e de produção legislativa do núcleo.',
          },
          deliveryHtml: {
            en: 'A technical note applying spatial models of voting to the 2026 presidential race.',
            'pt-br': 'Nota técnica que aplica modelos espaciais de voto à disputa presidencial de 2026.',
          },
        },
        {
          when: { en: '05/2025 – present', 'pt-br': '05/2025 – presente' },
          titleHtml: `${a('https://www.lab-doxa.org.br/', 'DOXA')} (IESP-UERJ)`,
          bodyHtml: {
            en: "<em>Researcher</em> at the Laboratory of Electoral Studies, Political Communication and Public Opinion, coordinated by Fernando Meireles and Argelina Cheibub Figueiredo. I work on the design and analysis of the lab's public opinion surveys, including weighting and post-stratification.",
            'pt-br': '<em>Pesquisador</em> no Laboratório de Estudos Eleitorais, de Comunicação Política e Opinião Pública, coordenado por Fernando Meireles e Argelina Cheibub Figueiredo. Trabalho no desenho e na análise dos surveys, incluindo ponderação e pós-estratificação.',
          },
          deliveryHtml: {
            en: 'Analysis of the DOXA survey on how the population of the state of Rio de Janeiro learns about politics, now a DOXA discussion paper.',
            'pt-br': 'Análise do survey do DOXA sobre como a população do estado do Rio de Janeiro se informa sobre política, hoje um texto para discussão do DOXA.',
          },
        },
        {
          when: { en: '04/2025 – present', 'pt-br': '04/2025 – presente' },
          titleHtml: `${a('https://mape.org.br/', 'MAPE')} (IESP-UERJ)`,
          bodyHtml: {
            en: "<em>Researcher</em> at the Laboratory for Monitoring and Evaluation of Policies and Elections, coordinated by Fernando Meireles and Bruno Schaefer. I build and maintain the mape_municipios database and its public interface, and teach in the lab's methodological training.",
            'pt-br': '<em>Pesquisador</em> no Laboratório de Monitoramento e Avaliação de Políticas e Eleições, coordenado por Fernando Meireles e Bruno Schaefer. Construo e mantenho a base mape_municipios e sua interface pública, e dou aulas na formação metodológica.',
          },
          deliveryHtml: {
            en: 'A Streamlit application that lets users interact with mape_municipios, a database covering 30 years and 451 variables on Brazilian municipalities.',
            'pt-br': 'Aplicação em Streamlit que permite interagir com a mape_municipios, base que cobre 30 anos e 451 variáveis sobre municípios brasileiros.',
          },
        },
      ],
    },
    {
      id: 'funded',
      title: { en: 'Funded projects', 'pt-br': 'Projetos financiados' },
      entries: [
        {
          when: { en: '07/2026 – present', 'pt-br': '07/2026 – presente' },
          titleHtml: {
            en: '<em>Pensando o Direito</em> research grant, MJSP',
            'pt-br': 'Bolsa de pesquisa <em>Pensando o Direito</em>, MJSP',
          },
          bodyHtml: {
            en: `<em>Researcher.</em> Systematic review of the evidence on a set of public security policies for the Legal Amazon, organized around the idea of a qualified entry of the State into vulnerable territories, following the OQF (<em>O Que Funciona?</em>) protocol developed at MAPE. I run the search protocol, screening, and evidence extraction. Project coordinated by Djane Braz Duarte. <em>Expected deliveries:</em> (i) an analytical report for the Ministry; (ii) an article submitted to a peer-reviewed journal; (iii) entries on the reviewed policies in the ${a('https://wikifavelas.com.br', 'Dicionário de Favelas Marielle Franco')}.`,
            'pt-br': `<em>Pesquisador.</em> Revisão sistemática das evidências sobre um cardápio de políticas de segurança pública para a Amazônia Legal, organizado em torno da ideia de entrada qualificada do Estado em territórios vulnerabilizados, seguindo o protocolo OQF (<em>O Que Funciona?</em>) do MAPE. Conduzo busca, triagem e extração de evidências. Projeto coordenado por Djane Braz Duarte. <em>Entregas previstas:</em> (i) relatório técnico-analítico para o Ministério; (ii) artigo submetido a periódico qualificado; (iii) verbetes sobre as políticas revisadas no ${a('https://wikifavelas.com.br', 'Dicionário de Favelas Marielle Franco')}.`,
          },
        },
        {
          when: { en: '08/2025 – present', 'pt-br': '08/2025 – presente' },
          titleHtml: { en: 'RESA project, UFAC and IESP-UERJ', 'pt-br': 'Projeto RESA, UFAC e IESP-UERJ' },
          bodyHtml: {
            en: "<em>Researcher</em> on the socioeconomic and environmental impacts of family-based agroextractive production in the Chico Mendes Extractive Reserve, in Acre, with an emphasis on what cooperatives change in land use and in household income. I handle the quantitative data and build the project's public monitoring platform. Coordinated by Luci Maria Teston (UFAC), with IESP-UERJ as a partner institution.",
            'pt-br': '<em>Pesquisador</em> nos impactos socioeconômicos e ambientais da produção agroextrativista de base familiar na Reserva Extrativista Chico Mendes, no Acre, com ênfase no que o cooperativismo muda no uso da terra e na renda das famílias. Cuido dos dados quantitativos e construo a plataforma pública de monitoramento. Coordenado por Luci Maria Teston (UFAC), com o IESP-UERJ como parceiro executor.',
          },
          deliveryHtml: {
            en: `A preliminary version of the ${a('https://mapa-do-desmatamento-acre.streamlit.app/', 'monitoring platform')}, covering deforestation in Acre.`,
            'pt-br': `Versão preliminar da ${a('https://mapa-do-desmatamento-acre.streamlit.app/', 'plataforma de monitoramento')}, com dados de desmatamento no Acre.`,
          },
        },
      ],
    },
    {
      id: 'earlier',
      title: { en: 'Earlier positions', 'pt-br': 'Posições anteriores' },
      entries: [
        {
          when: '02/2025 – 04/2025',
          titleHtml: {
            en: 'School of Public and Business Administration, FGV EBAPE',
            'pt-br': 'Escola de Administração Pública e de Empresas, FGV EBAPE',
          },
          bodyHtml: {
            en: `<em>Research Assistant.</em> Digitized and systematized historical election results using OCR and LLMs, under the supervision of Prof. ${a('https://professor.fgv.br/ebape/cesar-zucco', 'Cesar Zucco, Ph.D.')}`,
            'pt-br': `<em>Assistente de Pesquisa.</em> Digitalização e sistematização de resultados eleitorais históricos com OCR e LLMs, sob supervisão do Prof. ${a('https://professor.fgv.br/ebape/cesar-zucco', 'Cesar Zucco, Ph.D.')}`,
          },
          deliveryHtml: {
            en: 'Databases extracted from historical images, source code, and a technical report.',
            'pt-br': 'Bases extraídas de imagens históricas, código-fonte e relatório técnico.',
          },
        },
        {
          when: '10/2024 – 02/2025',
          titleHtml: a('https://cebrap.org.br/', 'CEBRAP'),
          bodyHtml: {
            en: `<em>Consultant</em> for the Center for Critical Imagination. Applied OCR and LLMs to the Brazilian Statistical Yearbooks, published as manuscripts, to systematize social assistance data since the early 20th century. In collaboration with ${a('https://iesp.uerj.br/pesquisador/jose-eduardo-leon-szwako/', 'José Szwako, Ph.D.')}`,
            'pt-br': `<em>Consultor</em> para o Center for Critical Imagination. Apliquei OCR e LLMs aos Anuários Estatísticos Brasileiros, publicados como manuscritos, para sistematizar dados de assistência social desde o início do século XX. Em colaboração com ${a('https://iesp.uerj.br/pesquisador/jose-eduardo-leon-szwako/', 'José Szwako, Ph.D.')}`,
          },
          deliveryHtml: {
            en: 'Databases extracted from PDFs, source code, and a technical report.',
            'pt-br': 'Bases extraídas de PDFs, código-fonte e relatório técnico.',
          },
        },
        {
          when: '06/2019 – 09/2022',
          titleHtml: { en: 'School of Social Sciences, FGV CPDOC', 'pt-br': 'Escola de Ciências Sociais, FGV CPDOC' },
          bodyHtml: {
            en: `<em>Junior Research Fellow.</em> Supported by an FGV/CNPq fellowship, examined Executive-Legislative relations in the early 20th century using qualitative and quantitative methods. Supervised by Prof. ${a('https://cpdoc.fgv.br/equipe/jaquelinezulini', 'Jaqueline Porto Zulini, Ph.D.')}`,
            'pt-br': `<em>Bolsista de Iniciação Científica.</em> Com bolsa FGV/CNPq, examinei as relações Executivo-Legislativo no início do século XX com métodos qualitativos e quantitativos. Supervisão da Profa. ${a('https://cpdoc.fgv.br/equipe/jaquelinezulini', 'Jaqueline Porto Zulini, Ph.D.')}`,
          },
          deliveryHtml: {
            en: 'Three technical reports and one peer-reviewed article.',
            'pt-br': 'Três relatórios técnicos e um artigo revisado por pares.',
          },
        },
      ],
    },
  ],

  professional: [
    {
      when: { en: '06/2025 – present', 'pt-br': '06/2025 – presente' },
      titleHtml: a('https://atlasintel.org/', 'AtlasIntel'),
      bodyHtml: {
        en: '<em>Data Scientist</em> working on calibrating survey samples, political analysis, monitoring public opinion, and improving internal data pipelines.',
        'pt-br': '<em>Cientista de Dados</em> na calibração de amostras de surveys, análise política, monitoramento da opinião pública e melhoria dos pipelines internos de dados.',
      },
      deliveryHtml: {
        en: 'Cut the retrieval of Brazilian demographic data for sample weighting from a manual, multi-hour task to a single scripted call.',
        'pt-br': 'Reduzi a obtenção de dados demográficos para ponderação de amostras de horas de trabalho manual a uma chamada de script.',
      },
    },
    {
      when: '07/2024 – 06/2025',
      titleHtml: {
        en: 'Independent Consultant in Data Science and Research',
        'pt-br': 'Consultor Independente em Ciência de Dados e Pesquisa',
      },
      bodyHtml: {
        en: 'Data and AI work, research support, and training for clients across sectors.',
        'pt-br': 'Trabalhos de dados e IA, apoio à pesquisa e treinamentos para clientes de diversos setores.',
      },
      itemsHtml: {
        en: [
          `${a('https://artplan.com.br/', 'Artplan')}: applied deep learning to social media segmentation.`,
          `${a('https://www.frm.org.br/', 'Fundação Roberto Marinho')}: dashboards in Streamlit and Power BI, an AWS data lake, and Python/ML training.`,
          `${a('https://plataformacipo.org/', 'Plataforma CIPÓ')}: training modules in machine learning and data analysis.`,
          `${a('https://geni.uff.br/', 'GENI/UFF')}: LLM and RAG tools for structured extraction from unstructured documents.`,
        ],
        'pt-br': [
          `${a('https://artplan.com.br/', 'Artplan')}: apliquei deep learning para segmentação em redes sociais.`,
          `${a('https://www.frm.org.br/', 'Fundação Roberto Marinho')}: dashboards em Streamlit e Power BI, data lake na AWS e treinamento em Python/ML.`,
          `${a('https://plataformacipo.org/', 'Plataforma CIPÓ')}: módulos de treinamento em machine learning e análise de dados.`,
          `${a('https://geni.uff.br/', 'GENI/UFF')}: ferramentas de LLM e RAG para extração estruturada de documentos não estruturados.`,
        ],
      },
    },
    {
      when: '04/2022 – 06/2025',
      titleHtml: a('https://rio21.org/', 'Instituto Rio21'),
      bodyHtml: {
        en: '<em>Data Scientist and Researcher.</em> Ran and analyzed opinion polls on public policy and urban security.',
        'pt-br': '<em>Cientista de Dados e Pesquisador.</em> Conduzi e analisei pesquisas de opinião sobre políticas públicas e segurança urbana.',
      },
      deliveryHtml: {
        en: '(i) An automated Python pipeline that cut report production from days to about an hour; (ii) interactive and programmatic maps for corporate audiences.',
        'pt-br': '(i) Pipeline automatizado em Python que reduziu a produção de relatórios de dias para cerca de uma hora; (ii) mapas interativos e programáticos para públicos corporativos.',
      },
    },
    {
      when: '10/2024 – 12/2024',
      titleHtml: {
        en: 'Strategic Planning Superintendence, FGV',
        'pt-br': 'Superintendência de Planejamento Estratégico, FGV',
      },
      bodyHtml: {
        en: "<em>Data Science Intern.</em> Brought generative AI into decision-making pipelines and prepared presentations for FGV's executive leadership.",
        'pt-br': '<em>Estagiário em Ciência de Dados.</em> Levei IA generativa a pipelines de tomada de decisão e preparei apresentações para a liderança executiva da FGV.',
      },
      deliveryHtml: {
        en: "A RAG pipeline for querying FGV researchers' publications in natural language.",
        'pt-br': 'Pipeline RAG para consultar as publicações dos pesquisadores da FGV em linguagem natural.',
      },
    },
    {
      when: '01/2024 – 06/2024',
      titleHtml: a('https://visagio.com/en/home/', 'Visagio'),
      bodyHtml: {
        en: '<em>Part-time Data Scientist.</em> Optimization models, SQL pipelines, and Power BI dashboards for the pricing and operations teams.',
        'pt-br': '<em>Cientista de Dados em regime parcial.</em> Modelos de otimização, pipelines em SQL e dashboards em Power BI para as áreas de precificação e operações.',
      },
      deliveryHtml: {
        en: '(i) A sample-size calculator for A/B tests in complex non-experimental settings; (ii) Power BI dashboards for expense auditing; (iii) analytics for allocating discount campaigns.',
        'pt-br': '(i) Calculadora de tamanho amostral para testes A/B em contextos não experimentais complexos; (ii) dashboards em Power BI para auditoria de despesas; (iii) análises para alocação de campanhas de desconto.',
      },
    },
  ],

  // Order and FAPERJ/Pensando o Direito text follow the PDF; the other rows keep the site's phrasing.
  scholarships: [
    {
      when: '2026–2027',
      html: {
        en: 'Graduate fellowship, Fundação Carlos Chagas Filho de Amparo à Pesquisa do Estado do Rio de Janeiro (FAPERJ Nota 10), awarded for performance in the first year of the M.A. programme at IESP-UERJ.',
        'pt-br': 'Bolsa de pós-graduação FAPERJ Nota 10, concedida por desempenho no primeiro ano do mestrado no IESP-UERJ.',
      },
    },
    {
      when: '2026',
      html: {
        en: 'Research grant, <em>Pensando o Direito</em> programme, Ministry of Justice and Public Security (MJSP).',
        'pt-br': 'Bolsa de pesquisa do programa <em>Pensando o Direito</em>, Ministério da Justiça e Segurança Pública (MJSP).',
      },
    },
    {
      when: '2025–2026',
      html: {
        en: "Master's fellowship, Coordenação de Aperfeiçoamento de Pessoal de Nível Superior (CAPES).",
        'pt-br': 'Bolsa de mestrado (CAPES).',
      },
    },
    {
      when: '2021–2022',
      html: {
        en: 'Undergraduate research fellowship (CNPq).',
        'pt-br': 'Bolsa de iniciação científica (CNPq).',
      },
    },
    {
      when: '2019–2024',
      html: {
        en: '90% merit scholarship for undergraduate study at the Getulio Vargas Foundation, awarded for performance in the entrance examination.',
        'pt-br': 'Bolsa de mérito de 90% para a graduação na FGV, concedida por desempenho no vestibular.',
      },
    },
    {
      when: '2019–2021',
      html: {
        en: 'Undergraduate research fellowship (FGV).',
        'pt-br': 'Bolsa de iniciação científica (FGV).',
      },
    },
  ],

  distinctions: [
    {
      when: '2026',
      html: {
        en: `2nd Runner Up, Best DH Tool or Suite of Tools – ${a('http://dhawards.org/dhawards2025/results/', 'DH Awards 2025')}, for ${a('https://github.com/felipelmc/RelicarIA', 'RelicárIA')} (joint work with Danielle Sanches de Almeida).`,
        'pt-br': `2nd Runner Up (3º lugar), Best DH Tool or Suite of Tools – ${a('http://dhawards.org/dhawards2025/results/', 'DH Awards 2025')}, pelo projeto ${a('https://github.com/felipelmc/RelicarIA', 'RelicárIA')} (trabalho conjunto com Danielle Sanches de Almeida).`,
      },
    },
    {
      when: '2025',
      html: {
        en: 'Professor Carlos Eduardo Sarmento Academic Distinction Award, School of Social Sciences (FGV CPDOC), for achieving the highest academic performance among the Class of 2025 undergraduate students.',
        'pt-br': 'Prêmio de Distinção Acadêmica Professor Carlos Eduardo Sarmento, Escola de Ciências Sociais (FGV CPDOC), pelo melhor desempenho acadêmico entre os formandos da turma de 2025.',
      },
    },
    {
      when: '2024',
      html: {
        en: "1st place admission to the Master's program in Political Science at IESP-UERJ.",
        'pt-br': '1º lugar no ingresso ao Mestrado em Ciência Política no IESP-UERJ.',
      },
    },
    {
      when: '2020',
      html: {
        en: "Best Paper Award, History and Social Sciences Students' Week (FGV CPDOC).",
        'pt-br': 'Melhor Trabalho, Semana de História e Ciências Sociais (FGV CPDOC).',
      },
    },
  ],

  training: [
    {
      when: { en: 'February 2026', 'pt-br': 'Fevereiro 2026' },
      html: {
        en: `${a('https://www.effectivealtruism.org/ea-global', 'Effective Altruism Global')} – San Francisco, CA, United States (full funding).`,
        'pt-br': `${a('https://www.effectivealtruism.org/ea-global', 'Effective Altruism Global')} – San Francisco, CA, Estados Unidos (financiamento integral).`,
      },
    },
    {
      when: { en: 'November 2025', 'pt-br': 'Novembro 2025' },
      html: {
        en: 'Academic writing and publication of quantitative papers in Social Sciences @ IESP-UERJ.',
        'pt-br': 'Escrita acadêmica e publicação de artigos quantitativos em Ciências Sociais @ IESP-UERJ.',
      },
    },
    {
      when: { en: 'July 2024', 'pt-br': 'Julho 2024' },
      html: {
        en: `${a('https://sicss.io/2024/fgv-ecmi-brazil/', 'SICSS: Summer Institute in Computational Social Science')} – Rio de Janeiro, RJ, Brazil.`,
        'pt-br': `${a('https://sicss.io/2024/fgv-ecmi-brazil/', 'SICSS: Summer Institute in Computational Social Science')} – Rio de Janeiro, RJ, Brasil.`,
      },
    },
    {
      when: { en: 'July 2024', 'pt-br': 'Julho 2024' },
      html: `${a('https://www.ml4good.org/', 'ML4Good Bootcamp')}.`,
    },
  ],

  skills: [
    {
      label: { en: 'Programming', 'pt-br': 'Programação' },
      html: { en: 'R, Python, SQL, Git, LaTeX and Quarto.', 'pt-br': 'R, Python, SQL, Git, LaTeX e Quarto.' },
    },
    {
      label: { en: 'Methods', 'pt-br': 'Métodos' },
      html: {
        en: 'Causal inference; survey sampling, weighting, and post-stratification; text-as-data and NLP; machine learning and deep learning.',
        'pt-br': 'Inferência causal; amostragem, ponderação e pós-estratificação de surveys; text-as-data e PLN; machine learning e deep learning.',
      },
    },
    {
      label: { en: 'Tools', 'pt-br': 'Ferramentas' },
      html: {
        en: 'Streamlit, DuckDB, Power BI, AWS, LLM APIs and RAG pipelines (OpenAI, Groq, xAI, LlamaIndex, LangChain), Docling and DocTR for OCR.',
        'pt-br': 'Streamlit, DuckDB, Power BI, AWS, APIs de LLM e pipelines RAG (OpenAI, Groq, xAI, LlamaIndex, LangChain), Docling e DocTR para OCR.',
      },
    },
  ],

  references: [
    {
      name: 'Fernando Meireles, Ph.D.',
      institution: 'IESP-UERJ',
      note: { en: 'M.A. advisor', 'pt-br': 'orientador de mestrado' },
      email: 'fernando dot meireles at iesp dot uerj dot br',
    },
    {
      name: 'Argelina Cheibub Figueiredo, Ph.D.',
      institution: 'IESP-UERJ',
      email: 'argelina at iesp dot uerj dot br',
    },
    {
      name: 'Bruno Schaefer, Ph.D.',
      institution: 'IESP-UERJ',
      email: 'brunoschaefer at iesp dot uerj dot br',
    },
    {
      name: 'Jaqueline Zulini, Ph.D.',
      institution: 'FGV CPDOC',
      note: { en: 'B.A. advisor', 'pt-br': 'orientadora de graduação' },
      email: 'jaqueline dot zulini at fgv dot br',
    },
    {
      name: 'Luiz Max Carvalho, Ph.D.',
      institution: 'FGV EMAp',
      note: { en: 'B.Sc. advisor', 'pt-br': 'orientador de graduação' },
      email: 'luiz dot fagundes at fgv dot br',
    },
  ],
};
