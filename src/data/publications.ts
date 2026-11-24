import type { Publication } from './types';

// Research output, newest first. Titles of Portuguese-language work stay in
// Portuguese on both locales (titleLang 'pt-BR'). `authors` holds the
// co-authors shown in the "Joint work with …" line.

export const publications: Publication[] = [
  {
    id: 'dissertation',
    type: 'dissertation',
    year: 2026,
    title: {
      en: 'Political preferences in legislative proposals: evidence from the Brazilian Chamber of Deputies, 1988–2026.',
      'pt-br': 'Preferências políticas em proposições legislativas: evidências da Câmara dos Deputados, 1988–2026.',
    },
    summary: {
      en: 'A new way of measuring the preferences of legislators, from contextual embeddings of the justifications of more than 100,000 bills introduced in the Chamber of Deputies since 1988.',
      'pt-br': 'Uma nova forma de medir as preferências dos deputados, a partir de embeddings contextuais das justificações de mais de 100 mil proposições apresentadas na Câmara dos Deputados desde 1988.',
    },
    // The map of the bills with one theme (health) in blue, drawn by scripts/build-mapa.py.
    figure: {
      width: 1600,
      height: 1561,
      alt: {
        en: 'Map in which each dot is a bill introduced in the Chamber of Deputies since 1988, placed by the text of its justification; the health bills, in blue, gather in one region',
        'pt-br': 'Mapa em que cada ponto é uma proposição apresentada na Câmara dos Deputados desde 1988, posicionada pelo texto da sua justificação; as de saúde, em azul, se concentram em uma região',
      },
    },
    // Title, abstract and committee as in the thesis (BR-Congress-Preferences, reports/thesis/thesis.qmd).
    note: {
      en: 'M.A. dissertation, IESP-UERJ. Advisor: Fernando Meireles. Defense on 3 December 2026. Committee: Fabiano Santos (IESP-UERJ), Cesar Zucco (Columbia University) and Mauricio Izumi (UFES).',
      'pt-br': 'Dissertação de mestrado, IESP-UERJ. Orientador: Fernando Meireles. Defesa em 3 de dezembro de 2026. Banca: Fabiano Santos (IESP-UERJ), Cesar Zucco (Columbia University) e Mauricio Izumi (UFES).',
    },
    abstract: {
      en: 'The preferences of legislators are central to several areas of political science, from spatial models of legislative politics to the study of policymaking, executive–legislative relations and polarization. The two usual sources have known limits: roll-call votes often capture the division between government and opposition more than ideology, as in Brazil, and elite surveys are costly and usually anonymous, so that they place parties and not individual legislators. In this dissertation, we propose and test a new strategy for measuring preferences, based on contextual embeddings of the justifications of bills, which in Brazil any deputy may introduce individually, without depending on party leaders. We build an original corpus with the full texts of more than 100,000 bills introduced in the Brazilian Chamber of Deputies since 1988, covering the whole democratic period. Deputies and parties are compared through operations on the vectors of their bills, and the estimates are set against roll-call votes and the Brazilian Legislative Survey. A series of tests shows the usefulness of the measure: it yields estimates of party cohesion that agree with what the literature expects, carries signs of ideology, and does not reproduce the division between government and opposition that organizes the votes. The dissertation thus contributes an original corpus, which allows a series of estimates about Brazilian deputies to be computed and opens an agenda of research, such as the study of polarization over time, of the cohesion of parties across the whole period and of how the characteristics of deputies relate to their preferences.',
      'pt-br': 'As preferências dos legisladores são centrais para diversas áreas da ciência política, dos modelos espaciais da política legislativa ao estudo da produção de políticas, das relações entre Executivo e Legislativo e da polarização. As duas fontes usuais têm limites conhecidos: as votações nominais frequentemente capturam a divisão entre governo e oposição mais do que a ideologia, como no Brasil, e os surveys com os próprios legisladores são caros e em geral anônimos, de modo que posicionam partidos, e não legisladores individuais. Nesta dissertação, propomos e testamos uma nova estratégia de mensuração de preferências, baseada em embeddings contextuais das justificações das proposições, que no Brasil qualquer deputado pode apresentar individualmente, sem depender das lideranças partidárias. Construímos um corpus original com o texto integral de mais de 100 mil proposições apresentadas na Câmara dos Deputados desde 1988, o que cobre todo o período democrático. Deputados e partidos são comparados por meio de operações com os vetores de suas proposições, e as estimativas são confrontadas com as votações nominais e com os surveys. Uma série de testes mostra a utilidade da medida: ela produz estimativas de coesão partidária que concordam com o que a literatura espera, carrega sinais de ideologia e não reproduz a divisão entre governo e oposição que organiza os votos. A dissertação contribui, assim, com um corpus original, que permite calcular uma série de estimativas sobre os deputados brasileiros e abre uma agenda de pesquisa, como o estudo da polarização ao longo do tempo, da coesão dos partidos em todo o período e da relação entre as características dos deputados e suas preferências.',
    },
    featured: 1,
  },
  {
    id: 'como-se-informa',
    type: 'discussion-paper',
    year: 2026,
    title: 'Como a população do estado do Rio de Janeiro se informa sobre política? Uma análise de survey.',
    titleLang: 'pt-BR',
    venueHtml: {
      en: '<em>Textos para Discussão do DOXA</em>, no. 3 (IESP-UERJ)',
      'pt-br': '<em>Textos para Discussão do DOXA</em>, n. 3 (IESP-UERJ)',
    },
    note: {
      en: 'November 2026. Data from a DOXA–Quaest survey, July 2023.',
      'pt-br': 'Novembro de 2026. Dados de um survey do DOXA com a Quaest, julho de 2023.',
    },
    abstract:
      'Este texto analisa como a população do estado do Rio de Janeiro se informa sobre política, a partir de um survey realizado pelo DOXA em parceria com a Quaest em julho de 2023. Cerca de 21% dos fluminenses dizem se informar sobre política todos os dias, enquanto 54% o fazem raramente ou nunca. O noticiário da TV segue como a principal fonte de informação política, mas as redes sociais têm um espaço de destaque, sobretudo entre os eleitores de Bolsonaro. A capital tem uma proporção menor de pessoas que nunca se informam sobre política do que o restante do estado. Quem se informa principalmente pela TV e quem se informa principalmente pela internet formam públicos distintos, sobretudo em idade e escolaridade. A aprovação do governo Lula era maior entre quem se informa pela TV, e quem nunca se informa sobre política declara com mais frequência não saber avaliar o governo estadual e não se identificar com ideologias ou partidos.',
    abstractLang: 'pt-BR',
    links: [
      { kind: 'doi', href: 'https://doi.org/10.5281/zenodo.24485143' },
      { kind: 'pdf', href: 'https://github.com/felipelmc/td-doxa-informacao-politica/blob/main/reports/report1-informacao.pdf' },
      {
        kind: 'repo',
        href: 'https://github.com/felipelmc/td-doxa-informacao-politica',
        label: { en: 'Replication package', 'pt-br': 'Pacote de replicação' },
      },
    ],
    // The entry in the replication package's README ("Como citar").
    citation: {
      key: 'como-se-informa',
      bibtex: `@techreport{lamarca2026informacao,
  author      = {Lamarca, Felipe},
  title       = {Como a população do estado do {Rio de Janeiro} se informa sobre política? {U}ma análise de \\textit{survey}},
  institution = {DOXA, Instituto de Estudos Sociais e Políticos, Universidade do Estado do Rio de Janeiro},
  type        = {Texto para Discussão},
  number      = {3},
  address     = {Rio de Janeiro},
  year        = {2026},
  month       = nov,
  doi         = {10.5281/zenodo.24485143},
  url         = {https://doi.org/10.5281/zenodo.24485143}
}`,
    },
    // Gráfico 2 of the paper (output/figuras/grafico2_fontes.png in the replication package).
    figure: {
      width: 1600,
      height: 889,
      alt: {
        en: 'Bar chart of the main source of information about politics in the state of Rio de Janeiro: TV news leads with 39%, followed by social media with 20%',
        'pt-br': 'Gráfico de barras da principal fonte de informação sobre política no estado do Rio de Janeiro: o noticiário da TV lidera com 39%, seguido das redes sociais, com 20%',
      },
    },
  },
  {
    id: 'mape-municipios',
    type: 'working-paper',
    year: 2026,
    title: 'Mapeamento Abrangente dos Municípios Brasileiros (mape_municipios): Um Banco de Dados para Pesquisa e Gestão Pública.',
    titleLang: 'pt-BR',
    // In the order of the preprint, where Felipe is the third author. The names are those of the
    // manuscript: SciELO's record cuts the surname of Jorge Lucas Nery de Oliveira.
    authors: [
      { name: 'Bruno Marques Schaefer' },
      { name: 'Fernando Meireles' },
      { name: 'Tomás Paixão Borges' },
      { name: 'Carlos Freitas' },
      { name: 'Renan Suzano' },
      { name: 'Guilherme Duque' },
      { name: 'Antonio Carlos Tiburcio' },
      { name: 'Bianca Cesário da Silva' },
      { name: 'Frederico Augusto Auad de Gomes Filho' },
      { name: 'Juliana Leitão' },
      { name: 'Izabela Borges de Vasconcelos' },
      { name: 'Olga Caldas' },
      { name: 'Jorge Lucas Nery de Oliveira' },
      { name: 'Luisa Barreto Fernandes' },
      { name: 'Davi Athaydes Leite' },
    ],
    venueHtml: '<em>SciELO Preprints</em>',
    abstract:
      'Este artigo apresenta o mape_municipios, um banco de dados abrangente sobre os municípios brasileiros que cobre mais de duas mil variáveis em 17 dimensões ao longo de 36 anos (1991-2026). O banco consolida informações de fontes oficiais e acadêmicas, facilitando análises sobre políticas públicas, desigualdades regionais e impactos de diferentes programas governamentais. Com um formato padronizado e acessível, permite o cruzamento de dados entre áreas como saúde, educação, assistência social, meio ambiente e finanças municipais de forma rápida e estruturada. Além disso, possibilita investigações sobre a relação entre indicadores municipais e políticas implementadas temporalmente. A estruturação dos dados segue um processo rigoroso de coleta, transformação e padronização, garantindo transparência e replicabilidade. Além de descrevermos este processo de coleta e sistematização da base dos dados, apresentamos também alguns usos potenciais: i) criação de tipologias de municípios a partir do cruzamento de variáveis (vulnerabilidade social vs. ambiental); ii) evolução temporal de indicadores (taxas de mortalidade por condições sensíveis à atenção primária (CSAP); e iii) aplicação de modelos multivariados. A partir deste banco, esperamos contribuir com pesquisadores e formuladores de políticas públicas no desenvolvimento de análises, teste de hipóteses e embasamento de decisões.',
    abstractLang: 'pt-BR',
    links: [
      { kind: 'doi', href: 'https://doi.org/10.1590/SciELOPreprints.19032' },
      { kind: 'pdf', href: 'https://preprints.scielo.org/index.php/scielo/preprint/download/19032/40037' },
    ],
    // Written by hand: the BibTeX that SciELO Preprints exports has no authors.
    citation: {
      key: 'mape-municipios',
      bibtex: `@article{schaefer2026mape,
  author    = {Bruno Marques Schaefer and
               Fernando Meireles and
               Felipe Lamarca and
               Tomás Paixão Borges and
               Carlos Freitas and
               Renan Suzano and
               Guilherme Duque and
               Antonio Carlos Tiburcio and
               Bianca Cesário da Silva and
               Frederico Augusto Auad de Gomes Filho and
               Juliana Leitão and
               Izabela Borges de Vasconcelos and
               Olga Caldas and
               Jorge Lucas Nery de Oliveira and
               Luisa Barreto Fernandes and
               Davi Athaydes Leite},
  title     = {Mapeamento Abrangente dos Municípios Brasileiros (mape\\_municipios): Um Banco de Dados para Pesquisa e Gestão Pública},
  journal   = {SciELO Preprints},
  year      = {2026},
  month     = nov,
  doi       = {10.1590/SciELOPreprints.19032},
  url       = {https://doi.org/10.1590/SciELOPreprints.19032},
  note      = {Preprint}
}`,
    },
  },
  {
    id: 'quantos-votos',
    type: 'working-paper',
    year: 2026,
    title: 'Quantos votos meu partido vai fazer? Um tutorial de validação preditiva com dados abertos (2016-2024).',
    titleLang: 'pt-BR',
    authors: [{ name: 'Tomás Paixão Borges', affiliation: 'IESP-UERJ' }],
    note: {
      en: 'Accepted for presentation at the 50th Annual Meeting of the Brazilian National Association of Graduate Studies and Research in Social Sciences (ANPOCS).',
      'pt-br': 'Aceito para apresentação no 50º Encontro Anual da ANPOCS.',
    },
    abstract:
      'No Brasil, a modelagem estatística é usada no campo de Ciências Sociais quase exclusivamente para explicar fenômenos, raramente para prevê-los. A difusão de técnicas de machine learning, porém, vem dissolvendo a fronteira entre estudos preditivos e causais: a predição serve de benchmark para teorias, revela onde os modelos falham e disciplina o uso da informação disponível. Tendo isto em vista, este manuscrito parte de duas questões. A primeira é substantiva: é possível prever, com boa acurácia, o desempenho eleitoral dos partidos nas eleições proporcionais para vereador usando apenas informação disponível antes do pleito? A segunda é metodológica: como se conduz, na prática, um exercício preditivo rigoroso, dos dados brutos à validação dos resultados? Respondemos com um tutorial reprodutível aplicado aos 92 municípios fluminenses em três eleições (2016, 2020 e 2024), em expansão para o conjunto dos municípios brasileiros.',
    abstractLang: 'pt-BR',
    links: [
      { kind: 'slides', href: 'https://felipelamarca.com/Presentations/Quantos-Votos-ANPOCS-2026/slides.html' },
      { kind: 'pdf', href: 'https://felipelamarca.com/Presentations/Quantos-Votos-ANPOCS-2026/slides.pdf', label: { en: 'Slides (PDF)', 'pt-br': 'Slides (PDF)' } },
    ],
    // The calibration figure, as in the ANPOCS slides (Presentations/Quantos-Votos-ANPOCS-2026/img).
    figure: {
      width: 1600,
      height: 1200,
      alt: {
        en: 'Scatter plot of predicted against observed vote share in 2024; the dashed diagonal marks a perfect forecast',
        'pt-br': 'Dispersão da proporção de votos prevista contra a observada em 2024; a diagonal tracejada marca a previsão perfeita',
      },
    },
    featured: 2,
  },
  {
    id: 'da-gaveta',
    type: 'working-paper',
    year: 2026,
    title: 'Da gaveta ao plenário: os caminhos da aprovação de pautas na Câmara dos Deputados.',
    titleLang: 'pt-BR',
    authors: [{ name: 'Lucas Calabró Berti', affiliation: 'IESP-UERJ' }],
    note: {
      en: 'Presented at the 2026 Meeting of the Brazilian Political Science Association (ABCP).',
      'pt-br': 'Apresentado no Encontro da ABCP 2026.',
    },
    abstract:
      'Este trabalho analisa os determinantes da aprovação de pautas na Câmara dos Deputados, com foco em fatores políticos e institucionais que condicionam o sucesso das proposições. A literatura sobre estudos legislativos e presidencialismo destaca como variáveis relevantes organização interna do Legislativo, pork barrel, disciplina partidária, acesso à informação, patronagem e tamanho e coesão da coalizão. Partindo desse debate, o trabalho investiga em que medida esses elementos afetam a probabilidade de aprovação das pautas ao longo do processo decisório. Metodologicamente, o estudo combina análise quantitativa de proposições legislativas e votações nominais com indicadores de coordenação partidária e características institucionais do processo legislativo. Ao articular a literatura de estudos legislativos com a de presidencialismo, argumentamos que a atuação da Câmara Baixa não pode ser compreendida a partir de uma única teoria de organização, mas sim a partir de uma combinação destas.',
    abstractLang: 'pt-BR',
    featured: 3,
  },
  {
    id: 'necon-2026',
    type: 'technical-note',
    year: 2026,
    title: 'Nota Técnica NECON sobre as próximas eleições presidenciais.',
    titleLang: 'pt-BR',
    authors: [
      { name: 'Fabiano Santos', affiliation: 'IESP-UERJ' },
      { name: 'Carlos Freitas', affiliation: 'IESP-UERJ' },
    ],
    venueHtml: '<em>NECON — Núcleo de Estudos sobre o Congresso (IESP-UERJ)</em>',
    abstract:
      'Esta nota técnica aplica conceitos de análise espacial às eleições presidenciais de 2026 no Brasil. Partimos do teorema do eleitor mediano e adicionamos algumas, poucas, camadas de complexidade a fim de exemplificar como tal instrumento pode ser aplicado a casos reais, em específico, ao provável cenário do próximo embate pelo posto máximo da República.',
    abstractLang: 'pt-BR',
  },
  {
    id: 'mosaico-2021',
    type: 'article',
    year: 2021,
    title: 'As relações Executivo-Legislativo na Primeira República: uma análise das mensagens presidenciais ao Congresso (1910-1920).',
    titleLang: 'pt-BR',
    venueHtml: '<em>Mosaico</em>',
    abstract:
      'A literatura clássica sobre a Primeira República assume que, a partir da instituição da política dos governadores, o Legislativo se tornou mera instituição figurativa. O presidente da República, em tese, negociava diretamente com os governadores dos estados para que estes evitassem que as oposições se elegessem ao Congresso Nacional, tornando raros os conflitos entre os poderes. Literatura mais recente, porém, relativizou o alcance dos acordos oligárquicos. No objetivo de resgatar a complexidade das relações entre os poderes na época, este artigo apresenta os resultados da análise das mensagens presidenciais encaminhadas pelos presidentes da República ao Congresso entre 1910 e 1920. Os dados levantados sinalizam para conflitos entre os dois poderes, algo impensável à abordagem clássica.',
    abstractLang: 'pt-BR',
    links: [
      { kind: 'doi', href: 'https://doi.org/10.12660/rm.v13n20.2021.82665' },
      { kind: 'paper', href: 'https://periodicos.fgv.br/mosaico/article/view/82665/79990' },
    ],
    citation: {
      key: 'mosaico-2021',
      bibtex: `@article{Lamarca2021,
  author = {Lamarca, Felipe Marques Esteves},
  title = {As relações Executivo-Legislativo na Primeira República: uma análise das mensagens presidenciais ao Congresso (1910-1920)},
  journal = {Mosaico},
  volume = {13},
  number = {20},
  pages = {525--546},
  year = {2021},
  doi = {10.12660/rm.v13n20.2021.82665}
}`,
    },
  },
];
