import type { Talk } from './types';

// Conference presentations, newest first. `date` is the first day of the event
// (the first of the month when only the month is known).

export const talks: Talk[] = [
  // The ANPOCS 2026 paper (Quantos votos) was accepted but not presented, so it is
  // not listed here; its slides are linked from the paper in publications.ts.
  {
    date: '2026-08-01',
    dateLabel: { en: 'August 2026', 'pt-br': 'Agosto 2026' },
    event: 'XV Encontro da ABCP',
    detail: { en: 'Belém, Pará, Brazil', 'pt-br': 'Belém, Pará, Brasil' },
    title: 'Da gaveta ao plenário: os caminhos da aprovação de pautas na Câmara dos Deputados',
    titleLang: 'pt-BR',
    publicationId: 'da-gaveta',
  },
  {
    date: '2025-11-01',
    dateLabel: { en: 'November 2025', 'pt-br': 'Novembro 2025' },
    event: {
      en: '10th Student Week of the Postgraduate Programs',
      'pt-br': '10ª Jornada Discente dos Programas de Pós-Graduação',
    },
    detail: {
      en: 'IESP-UERJ, Rio de Janeiro, RJ, Brazil',
      'pt-br': 'IESP-UERJ, Rio de Janeiro, RJ, Brasil',
    },
    title: 'Quantos votos meu partido vai fazer? Prevendo o vote share nos municípios fluminenses',
    titleLang: 'pt-BR',
    publicationId: 'quantos-votos',
    links: [
      { kind: 'pdf', href: 'https://felipelamarca.com/Presentations/GT-Jornada-Discente-IESP-2025/jornada-discente-2025.pdf' },
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/GT-Jornada-Discente-IESP-2025' },
    ],
  },
  {
    date: '2025-08-01',
    dateLabel: { en: 'August 2025', 'pt-br': 'Agosto 2025' },
    event: 'BIEN Congress 2025',
    eventUrl: 'https://bien2025.com.br/',
    detail: { en: 'Brazil', 'pt-br': 'Brasil' },
    title:
      'Fatores explicativos do apoio ou rejeição à criação de uma política municipal de renda básica: modelando a percepção dos cariocas',
    titleLang: 'pt-BR',
    links: [
      { kind: 'pdf', href: 'https://felipelamarca.com/Presentations/BIEN-2025/bien2025.pdf' },
    ],
  },
];
