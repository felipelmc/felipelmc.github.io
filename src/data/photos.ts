export interface Photo {
  slug: string;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  alt: {
    en: string;
    'pt-br': string;
  };
}

/** Twelve photos, three rows of four. Ordered for tonal rhythm across each row. */
export const photos: Photo[] = [
  {
    slug: 'felipe-with-camera',
    width: 1600,
    height: 1200,
    thumbWidth: 800,
    thumbHeight: 600,
    alt: {
      en: 'Felipe Lamarca holding a camera in front of rolling green hills',
      'pt-br': 'Felipe Lamarca segurando uma câmera diante de morros verdes',
    },
  },
  {
    slug: 'corcovado-from-urca',
    width: 1600,
    height: 1200,
    thumbWidth: 800,
    thumbHeight: 600,
    alt: {
      en: 'The Corcovado wrapped in cloud at dusk, seen from Urca, Rio de Janeiro',
      'pt-br': 'O Corcovado envolto em nuvem ao anoitecer, visto da Urca, Rio de Janeiro',
    },
  },
  {
    slug: 'sunflowers',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'Sunflowers in bloom, with a hummingbird at the flower on the left',
      'pt-br': 'Girassóis floridos, com um beija-flor na flor à esquerda',
    },
  },
  {
    slug: 'moon-daylight',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A half-lit moon in a daytime blue sky',
      'pt-br': 'A lua pela metade num céu azul de dia',
    },
  },
  {
    slug: 'urca-waterfront',
    width: 768,
    height: 1024,
    thumbWidth: 600,
    thumbHeight: 800,
    alt: {
      en: 'Late afternoon light on the Urca waterfront, Rio de Janeiro',
      'pt-br': 'Luz de fim de tarde na orla da Urca, Rio de Janeiro',
    },
  },
  {
    slug: 'ani-bird',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A smooth-billed ani perched among sunlit leaves',
      'pt-br': 'Um anu-preto pousado entre folhas iluminadas pelo sol',
    },
  },
  {
    slug: 'chrysanthemums',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A dense bed of crimson chrysanthemums',
      'pt-br': 'Um canteiro cerrado de crisântemos vermelhos',
    },
  },
  {
    slug: 'lone-tree',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A lone tree and a small shelter on a hilltop against a clear sky',
      'pt-br': 'Uma árvore solitária e um pequeno abrigo no alto de um morro, contra o céu limpo',
    },
  },
  {
    slug: 'transmission-tower',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A transmission tower on a hillside under an overcast sky, cattle grazing below',
      'pt-br': 'Uma torre de transmissão na encosta sob céu encoberto, com gado pastando abaixo',
    },
  },
  {
    slug: 'siamese-cat',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A siamese cat in close-up, foliage blurred behind',
      'pt-br': 'Um gato siamês em close, com a folhagem desfocada ao fundo',
    },
  },
  {
    slug: 'moon-night',
    width: 1182,
    height: 664,
    thumbWidth: 800,
    thumbHeight: 449,
    alt: {
      en: 'A nearly full moon against a black night sky',
      'pt-br': 'A lua quase cheia contra o céu negro da noite',
    },
  },
  {
    slug: 'dog-on-sand',
    width: 1182,
    height: 665,
    thumbWidth: 800,
    thumbHeight: 450,
    alt: {
      en: 'A dog carrying a tennis ball across wet sand',
      'pt-br': 'Um cachorro atravessando a areia molhada com uma bolinha de tênis',
    },
  },
];

export const photoSrc = (photo: Photo) => `/img/photos/${photo.slug}.jpg`;
export const photoThumb = (photo: Photo) => `/img/photos/thumbs/${photo.slug}.jpg`;
