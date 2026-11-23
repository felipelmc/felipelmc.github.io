import type { L } from './types';

export type SocialId = 'github' | 'scholar' | 'linkedin' | 'orcid' | 'lattes' | 'email' | 'instagram' | 'rss';

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

const a = (href: string, text: string) =>
  `<a href="${href}" class="link" target="_blank" rel="noopener noreferrer">${text}</a>`;

export const profile = {
  name: 'Felipe Lamarca',
  email: 'felipe.lamarca@hotmail.com',
  role: {
    en: 'Computational Political Scientist',
    'pt-br': 'Cientista Político Computacional',
  } as L,

  /** The two lines under the name on the home page: what he is now, and where. */
  positions: {
    en: [
      `M.A. student in Political Science, ${a('https://iesp.uerj.br/en/', 'IESP-UERJ')}`,
      `Data scientist, ${a('https://atlasintel.org/', 'AtlasIntel')}`,
    ],
    'pt-br': [
      `Mestrando em Ciência Política, ${a('https://iesp.uerj.br/', 'IESP-UERJ')}`,
      `Cientista de dados, ${a('https://atlasintel.org/', 'AtlasIntel')}`,
    ],
  } as L<string[]>,

  /**
   * The home page's text, one HTML string per paragraph: who he is and what he
   * does, in running prose (positions and affiliations only; projects are not
   * presented as jobs). The second paragraph names his research groups only;
   * Felipe took the dissertation out of this text.
   */
  intro: {
    en: [
      `I am a data scientist and a social scientist, trained at ${a('https://emap.fgv.br/en', 'FGV EMAp')} and ${a('https://cpdoc.fgv.br/en', 'FGV CPDOC')}. I use statistical and computational methods to understand political and social phenomena, such as elections, legislative behavior, public opinion and public policy.`,
      `I do research at ${a('https://mape.org.br/', 'MAPE')}, ${a('https://www.lab-doxa.org.br/', 'DOXA')} and ${a('http://necon.iesp.uerj.br', 'NECON')}.`,
    ],
    'pt-br': [
      `Sou cientista de dados e cientista social, formado pela ${a('https://emap.fgv.br/', 'FGV EMAp')} e pela ${a('https://cpdoc.fgv.br/', 'FGV CPDOC')}. Uso métodos estatísticos e computacionais para entender fenômenos políticos e sociais, como eleições, comportamento legislativo, opinião pública e políticas públicas.`,
      `Faço pesquisa no ${a('https://mape.org.br/', 'MAPE')}, no ${a('https://www.lab-doxa.org.br/', 'DOXA')} e no ${a('http://necon.iesp.uerj.br', 'NECON')}.`,
    ],
  } as L<string[]>,

  /** The portrait: `portrait` is the small one next to the name on the home page (a circle with transparent corners). */
  portrait: { src: '/img/profilepic/me_at_iesp.webp', width: 576, height: 576 },
  /** CV PDFs: the 2-page short version and the full one (cv/README.md). */
  cvPdf: {
    short: { en: '/files/cv-en-short.pdf', 'pt-br': '/files/cv-pt-short.pdf' } as L,
    full: { en: '/files/cv-en.pdf', 'pt-br': '/files/cv-pt.pdf' } as L,
  },

  social: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/felipelmc' },
    { id: 'scholar', label: 'Google Scholar', href: 'https://scholar.google.com.br/citations?user=xPf8_64AAAAJ&hl=pt-BR&oi=ao' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/felipe-lamarca/' },
    { id: 'orcid', label: 'ORCID', href: 'https://orcid.org/0000-0003-0002-3627' },
    { id: 'lattes', label: 'Lattes', href: 'http://lattes.cnpq.br/2606938112682925' },
    { id: 'email', label: 'Email', href: 'mailto:felipe.lamarca@hotmail.com' },
  ] as SocialLink[],

  instagram: { handle: '@veryfirsttake', href: 'https://www.instagram.com/veryfirsttake/' },

};
