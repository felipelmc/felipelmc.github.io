import type { L } from './types';

// The map of bills on the home page (components/MapaProposicoes): the figure of
// the nine themes in Felipe's dissertation. Each dot is a bill introduced in the
// Chamber of Deputies since 1988, placed by the text of its justification.
// The images and these counts come from scripts/build-mapa.py, which reads the
// dissertation's repository; only images are published, never the data.

export interface MapaCamada {
  /** File name in /img/mapa/, without the extension. */
  slug: string;
  label: L;
  /** Bills in the layer. */
  n: number;
}

export const mapa = {
  width: 1400,
  height: 1366,
  total: 94423,
  themes: [
    { slug: 'saude', label: { en: 'Health', 'pt-br': 'Saúde' }, n: 11547 },
    { slug: 'educacao', label: { en: 'Education', 'pt-br': 'Educação' }, n: 7075 },
    { slug: 'penal', label: { en: 'Criminal law', 'pt-br': 'Direito penal' }, n: 8419 },
    { slug: 'ambiente', label: { en: 'Environment', 'pt-br': 'Meio ambiente' }, n: 4891 },
    { slug: 'politica', label: { en: 'Parties and elections', 'pt-br': 'Partidos e eleições' }, n: 2296 },
    { slug: 'transporte', label: { en: 'Transport', 'pt-br': 'Transporte' }, n: 6017 },
    { slug: 'administracao', label: { en: 'Public administration', 'pt-br': 'Administração pública' }, n: 10844 },
    { slug: 'industria', label: { en: 'Industry and commerce', 'pt-br': 'Indústria e comércio' }, n: 6992 },
    { slug: 'direitos-humanos', label: { en: 'Human rights', 'pt-br': 'Direitos humanos' }, n: 15094 },
  ] as MapaCamada[],
  caption: {
    en: 'Each dot is a bill introduced in the Chamber of Deputies since 1988, placed by the text of its justification: bills that say similar things sit close together.',
    'pt-br': 'Cada ponto é uma proposição apresentada na Câmara dos Deputados desde 1988, posicionada pelo texto da sua justificação: proposições que dizem coisas parecidas ficam próximas.',
  } as L,
  source: {
    en: 'From my M.A. dissertation.',
    'pt-br': 'Da minha dissertação de mestrado.',
  } as L,
  alt: {
    en: 'Map of about 94,000 dots, one per bill; the bills of the selected theme appear in blue and gather in one region',
    'pt-br': 'Mapa com cerca de 94 mil pontos, um por proposição; as do tema selecionado aparecem em azul e se concentram em uma região',
  } as L,
};
