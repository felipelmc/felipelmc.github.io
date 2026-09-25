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

  /** Hero statement, set in the serif. */
  statement: {
    en: 'Data scientist and social scientist. I work on elections, Congress and public opinion in Brazil, mostly in R and Python.',
    'pt-br': 'Cientista de dados e cientista social. Trabalho com eleições, Congresso e opinião pública no Brasil, quase sempre em R e Python.',
  } as L,

  /** The mono "now / work / labs" list under the hero statement. */
  facts: [
    {
      key: { en: 'now', 'pt-br': 'agora' } as L,
      html: {
        en: `M.A. student in Political Science · ${a('https://iesp.uerj.br/en/', 'IESP-UERJ')}`,
        'pt-br': `Mestrando em Ciência Política · ${a('https://iesp.uerj.br/', 'IESP-UERJ')}`,
      } as L,
    },
    {
      key: { en: 'thesis', 'pt-br': 'dissertação' } as L,
      html: {
        en: '<a href="/publications#dissertation" class="link">Preference estimation in the Brazilian Congress</a>',
        'pt-br': '<a href="/pt-br/publications#dissertation" class="link">Estimação de preferências no Congresso brasileiro</a>',
      } as L,
    },
    {
      key: { en: 'work', 'pt-br': 'trabalho' } as L,
      html: {
        en: `Data Scientist · ${a('https://atlasintel.org/', 'AtlasIntel')}`,
        'pt-br': `Cientista de dados · ${a('https://atlasintel.org/', 'AtlasIntel')}`,
      } as L,
    },
    {
      key: { en: 'labs', 'pt-br': 'labs' } as L,
      html: {
        en: [a('https://mape.org.br/', 'MAPE'), a('https://www.lab-doxa.org.br/', 'DOXA'), a('http://necon.iesp.uerj.br', 'NECON')].join(' · '),
        'pt-br': [a('https://mape.org.br/', 'MAPE'), a('https://www.lab-doxa.org.br/', 'DOXA'), a('http://necon.iesp.uerj.br', 'NECON')].join(' · '),
      } as L,
    },
  ],

  /** Full bio for the About section, one HTML string per paragraph. */
  bio: {
    en: [
      `I'm a data scientist with a degree from the ${a('https://emap.fgv.br/en', 'School of Applied Mathematics')} (FGV EMAp) and a social scientist with a degree from the ${a('https://cpdoc.fgv.br/en', 'School of Social Sciences')} (FGV CPDOC). Currently, I'm pursuing a Master's degree in Political Science at the ${a('https://iesp.uerj.br/en/', 'Institute of Social and Political Studies')} (IESP-UERJ).`,
      `I work as a data scientist at ${a('https://atlasintel.org/', 'AtlasIntel')} and do research at three laboratories: the Policy and Election Monitoring and Evaluation Laboratory (${a('https://mape.org.br/', 'MAPE')}), the Laboratory of Electoral Studies, Political Communication and Public Opinion (${a('https://www.lab-doxa.org.br/', 'DOXA')}), and the Center for Studies on Congress (${a('http://necon.iesp.uerj.br', 'NECON')}).`,
      'My research interests include political behavior, public policy, and the application of data science techniques to social science research. This broadly encompasses the use of machine learning, deep learning, causal inference, and survey methods to investigate political phenomena.',
    ],
    'pt-br': [
      `Sou cientista de dados formado pela ${a('https://emap.fgv.br/', 'Escola de Matemática Aplicada')} (FGV EMAp) e cientista social formado pela ${a('https://cpdoc.fgv.br/', 'Escola de Ciências Sociais')} (FGV CPDOC). Atualmente, curso o Mestrado em Ciência Política no ${a('https://iesp.uerj.br/', 'Instituto de Estudos Sociais e Políticos')} (IESP-UERJ).`,
      `Trabalho como cientista de dados na ${a('https://atlasintel.org/', 'AtlasIntel')} e faço pesquisa em três laboratórios: o Laboratório de Monitoramento e Avaliação de Políticas Públicas e Eleições (${a('https://mape.org.br/', 'MAPE')}), o Laboratório de Estudos Eleitorais, de Comunicação Política e Opinião Pública (${a('https://www.lab-doxa.org.br/', 'DOXA')}) e o Núcleo de Estudos sobre o Congresso (${a('http://necon.iesp.uerj.br', 'NECON')}).`,
      'Meus interesses de pesquisa incluem comportamento político, políticas públicas e a aplicação de técnicas de ciência de dados à pesquisa em ciências sociais. Isso abrange o uso de aprendizado de máquina, aprendizado profundo, inferência causal e métodos de survey para investigar fenômenos políticos.',
    ],
  } as L<string[]>,

  interests: {
    en: ['Legislative behavior', 'Computational methods', 'Political behavior', 'Survey research', 'Causal inference'],
    'pt-br': ['Comportamento legislativo', 'Métodos computacionais', 'Comportamento político', 'Pesquisa de survey', 'Inferência causal'],
  } as L<string[]>,

  portrait: { src: '/img/profilepic/me_at_iesp.webp', width: 576, height: 576 },

  cvPdf: { en: '/files/cv-en.pdf', 'pt-br': '/files/cv-pt.pdf' } as L,

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
