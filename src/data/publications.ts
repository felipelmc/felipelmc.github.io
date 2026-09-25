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
      en: 'Preference estimation in the Brazilian Congress.',
      'pt-br': 'Estimação de preferências no Congresso brasileiro.',
    },
    note: {
      en: 'M.A. dissertation in progress at IESP-UERJ.',
      'pt-br': 'Dissertação de mestrado em andamento no IESP-UERJ.',
    },
    featured: 1,
  },
  {
    id: 'como-se-informa',
    type: 'working-paper',
    year: 2026,
    title: 'Como a população do estado do Rio de Janeiro se informa sobre política?',
    titleLang: 'pt-BR',
    authors: [
      { name: 'Fernando Meireles', affiliation: 'IESP-UERJ' },
      { name: 'Argelina Cheibub Figueiredo', affiliation: 'IESP-UERJ' },
    ],
    venueHtml: '<em>DOXA — Laboratório de Estudos Eleitorais, de Comunicação Política e Opinião Pública (IESP-UERJ)</em>',
  },
  {
    id: 'quantos-votos',
    type: 'working-paper',
    year: 2026,
    title: 'Quantos votos meu partido vai fazer? Um tutorial de validação preditiva com dados abertos (2016-2024).',
    titleLang: 'pt-BR',
    authors: [{ name: 'Tomás Paixão Borges', affiliation: 'IESP-UERJ' }],
    note: {
      en: 'To be presented at the 50th Annual Meeting of the Brazilian National Association of Graduate Studies and Research in Social Sciences (ANPOCS).',
      'pt-br': 'A ser apresentado no 50º Encontro Anual da ANPOCS.',
    },
    abstract:
      'No Brasil, a modelagem estatística é usada no campo de Ciências Sociais quase exclusivamente para explicar fenômenos, raramente para prevê-los. A difusão de técnicas de machine learning, porém, vem dissolvendo a fronteira entre estudos preditivos e causais: a predição serve de benchmark para teorias, revela onde os modelos falham e disciplina o uso da informação disponível. Tendo isto em vista, este manuscrito parte de duas questões. A primeira é substantiva: é possível prever, com boa acurácia, o desempenho eleitoral dos partidos nas eleições proporcionais para vereador usando apenas informação disponível antes do pleito? A segunda é metodológica: como se conduz, na prática, um exercício preditivo rigoroso, dos dados brutos à validação dos resultados? Respondemos com um tutorial reprodutível aplicado aos 92 municípios fluminenses em três eleições (2016, 2020 e 2024), em expansão para o conjunto dos municípios brasileiros.',
    abstractLang: 'pt-BR',
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
