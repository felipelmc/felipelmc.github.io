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
    date: '2026-09-30',
    label: { en: 'Sep–Oct 2026', 'pt-br': 'set–out 2026' },
    text: {
      en: '“Quantos votos meu partido vai fazer?”, joint work with Tomás Paixão Borges, will be presented at the 50th ANPOCS Annual Meeting (SPG 31 — Methodology and Research Methods in the Social Sciences).',
      'pt-br': '“Quantos votos meu partido vai fazer?”, trabalho conjunto com Tomás Paixão Borges, será apresentado no 50º Encontro Anual da ANPOCS (SPG 31 — Metodologia e Métodos de Pesquisa em Ciências Sociais).',
    },
    href: '/publications',
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
