export interface NewsItem {
  /** ISO date, used only for ordering and the RSS feed */
  date: string;
  label: { en: string; 'pt-br': string };
  text: { en: string; 'pt-br': string };
  /** Site-relative path in its EN form; PT pages prefix /pt-br */
  href?: string;
  /**
   * Still ahead: the date label takes the accent and an "Upcoming" tag. Set by
   * hand, like a talk's, and cleared once the date has passed.
   */
  upcoming?: boolean;
}

export const news: NewsItem[] = [
  {
    date: '2026-12-03',
    label: { en: '3 Dec 2026', 'pt-br': '3 dez 2026' },
    text: {
      en: 'I will defend my M.A. dissertation, “Political preferences in legislative proposals: evidence from the Brazilian Chamber of Deputies, 1988–2026”, at IESP-UERJ on 3 December. Committee: Fernando Meireles (advisor), Fabiano Santos, Cesar Zucco and Mauricio Izumi.',
      'pt-br': 'Defendo minha dissertação de mestrado, “Preferências políticas em proposições legislativas: evidências da Câmara dos Deputados, 1988–2026”, no IESP-UERJ, em 3 de dezembro. Banca: Fernando Meireles (orientador), Fabiano Santos, Cesar Zucco e Mauricio Izumi.',
    },
    href: '/publications',
    upcoming: true,
  },
  {
    date: '2026-11-11',
    label: { en: 'Nov 2026', 'pt-br': 'nov 2026' },
    text: {
      en: 'Taught a short course on AI agents for research at the Graduate Student Seminar of the Department of Political Science, USP, with Manoel Galdino and Tales Mançano.',
      'pt-br': 'Ministrei um minicurso sobre agentes de IA para pesquisa no Seminário Discente do Departamento de Ciência Política da USP, com Manoel Galdino e Tales Mançano.',
    },
    href: '/teaching',
  },
  {
    date: '2026-09-30',
    label: { en: 'Sep–Oct 2026', 'pt-br': 'set–out 2026' },
    text: {
      en: '“Quantos votos meu partido vai fazer?”, joint work with Tomás Paixão Borges, was accepted for presentation at the 50th ANPOCS Annual Meeting (SPG 31 — Methodology and Research Methods in the Social Sciences).',
      'pt-br': '“Quantos votos meu partido vai fazer?”, trabalho conjunto com Tomás Paixão Borges, foi aceito para apresentação no 50º Encontro Anual da ANPOCS (SPG 31 — Metodologia e Métodos de Pesquisa em Ciências Sociais).',
    },
    href: '/publications',
  },
  {
    date: '2026-09-27',
    label: { en: 'Sep 2026', 'pt-br': 'set 2026' },
    text: {
      en: 'Released mapa-da-ciencia 1.0, an observatory of the scientific literature built on local language models. Its pilot maps 4,275 political science articles from SciELO Brasil, 2010–2025.',
      'pt-br': 'Lancei o mapa-da-ciencia 1.0, observatório da literatura científica com modelos de linguagem locais. O piloto mapeia 4.275 artigos de ciência política do SciELO Brasil, de 2010 a 2025.',
    },
    href: '/projects',
  },
  {
    date: '2026-09-14',
    label: { en: 'Sep 2026', 'pt-br': 'set 2026' },
    text: {
      en: 'Published a DOXA discussion paper on how the population of the state of Rio de Janeiro gets information about politics, with its replication package.',
      'pt-br': 'Publiquei um texto para discussão do DOXA sobre como a população do estado do Rio de Janeiro se informa sobre política, com o pacote de replicação.',
    },
    href: '/publications',
  },
  {
    date: '2026-08-17',
    label: { en: 'Aug 2026', 'pt-br': 'ago 2026' },
    text: {
      en: 'Taught a short course on AI agents for social science research (an introduction to Claude Code) at MAPE’s Methodological Training, IESP-UERJ.',
      'pt-br': 'Ministrei um minicurso sobre agentes de IA para pesquisa em ciências sociais (uma introdução ao Claude Code) na Formação Metodológica do MAPE, IESP-UERJ.',
    },
    href: '/teaching',
  },
  {
    date: '2026-08-01',
    label: { en: 'Aug 2026', 'pt-br': 'ago 2026' },
    text: {
      en: '“Da gaveta ao plenário”, joint work with Lucas Calabró Berti, was presented at the XV ABCP Meeting in Belém, Brazil.',
      'pt-br': '“Da gaveta ao plenário”, trabalho conjunto com Lucas Calabró Berti, foi apresentado no XV Encontro da ABCP, em Belém.',
    },
    href: '/publications',
  },
  {
    date: '2026-06-01',
    label: { en: 'May–Jun 2026', 'pt-br': 'mai–jun 2026' },
    text: {
      en: 'Taught short courses on AI agents for academic research at LABIIA and at CERES (IESP-UERJ).',
      'pt-br': 'Ministrei minicursos sobre agentes de IA na pesquisa acadêmica no LABIIA e no CERES (IESP-UERJ).',
    },
    href: '/teaching',
  },
  {
    date: '2026-04-01',
    label: { en: '2026', 'pt-br': '2026' },
    text: {
      en: 'Awarded the FAPERJ Nota 10 graduate scholarship for outstanding performance in the first year of the Master’s program at IESP-UERJ.',
      'pt-br': 'Selecionado para a bolsa FAPERJ Nota 10 por desempenho no primeiro ano do Mestrado no IESP-UERJ.',
    },
  },
  {
    date: '2026-02-15',
    label: { en: '2026', 'pt-br': '2026' },
    text: {
      en: 'RelicárIA was 2nd Runner Up for Best DH Tool or Suite of Tools at the DH Awards 2025.',
      'pt-br': 'O RelicárIA ficou em 3º lugar (2nd Runner Up) na categoria Best DH Tool or Suite of Tools do DH Awards 2025.',
    },
    href: '/publications',
  },
];
