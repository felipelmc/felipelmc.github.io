export interface NewsItem {
  /** ISO date, used only for ordering and the RSS feed */
  date: string;
  label: { en: string; 'pt-br': string };
  text: { en: string; 'pt-br': string };
  /** Site-relative path in its EN form; PT pages prefix /pt-br */
  href?: string;
}

export const news: NewsItem[] = [
  {
    date: '2026-08-01',
    label: { en: 'Aug 2026', 'pt-br': 'ago 2026' },
    text: {
      en: '“Da gaveta ao plenário”, joint work with Lucas Calabró Berti, will be presented at the XV ABCP Meeting in Belém, Brazil.',
      'pt-br': '“Da gaveta ao plenário”, trabalho conjunto com Lucas Calabró Berti, será apresentado no XV Encontro da ABCP, em Belém.',
    },
    href: '/publications',
  },
  {
    date: '2026-07-01',
    label: { en: 'Jul 2026', 'pt-br': 'jul 2026' },
    text: {
      en: 'Taught the Text Analysis session at SICSS 2026 (Summer Institute in Computational Social Science).',
      'pt-br': 'Ministrei a sessão de Análise de Texto no SICSS 2026 (Summer Institute in Computational Social Science).',
    },
    href: '/teaching',
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
