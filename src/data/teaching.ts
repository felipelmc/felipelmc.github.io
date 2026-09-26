import type { Course, CourseNotes } from './types';

const graduate = { en: 'Graduate', 'pt-br': 'Pós-Graduação' };
const undergraduate = { en: 'Undergraduate', 'pt-br': 'Graduação' };

// Courses taught (short courses) and teaching assistance, newest first.
export const courses: Course[] = [
  {
    id: 'mape-agents-2026',
    kind: 'short-course',
    title: {
      en: 'AI agents for social science research: an introduction to Claude Code',
      'pt-br': 'Agentes de IA para pesquisa em ciências sociais: uma introdução ao Claude Code',
    },
    whereHtml: {
      en: 'Methodological Training of <a href="https://mape.org.br/" class="link" target="_blank" rel="noopener noreferrer">MAPE</a>',
      'pt-br': 'Formação Metodológica do <a href="https://mape.org.br/" class="link" target="_blank" rel="noopener noreferrer">MAPE</a>',
    },
    term: { en: 'August 2026', 'pt-br': 'Agosto 2026' },
    date: '2026-08-17',
    level: graduate,
    descriptionHtml: {
      en: 'From chat to agents: installing Claude Code, CLAUDE.md and skills, plan mode and context management, with live demos of a literature search through the OpenAlex API and of roll-call data from the Chamber of Deputies API.',
      'pt-br': 'Do chat ao agente: instalação do Claude Code, CLAUDE.md e skills, plan mode e gerenciamento de contexto, com demonstrações ao vivo de uma busca de literatura pela API da OpenAlex e de dados de votações pela API da Câmara dos Deputados.',
    },
    links: [
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/AgentesIA-FMMAPE-2026' },
      { kind: 'pdf', href: 'https://github.com/felipelmc/Presentations/blob/main/AgentesIA-FMMAPE-2026/slides.pdf' },
    ],
  },
  {
    id: 'labiia-2026',
    kind: 'short-course',
    title: {
      en: 'Introduction to AI agents in academic research',
      'pt-br': 'Introdução aos agentes de IA na pesquisa acadêmica',
    },
    whereHtml: '<a href="https://labiialab.com.br" class="link" target="_blank" rel="noopener noreferrer">LABIIA</a>',
    term: { en: 'June 2026', 'pt-br': 'Junho 2026' },
    date: '2026-06-01',
    links: [
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/Intro-to-ClaudeCode-LABIIA-2026' },
    ],
  },
  {
    id: 'ceres-2026',
    kind: 'short-course',
    title: {
      en: 'AI agents for social science research: an introduction to Claude Code',
      'pt-br': 'Agentes de IA para pesquisa em ciências sociais: uma introdução ao Claude Code',
    },
    whereHtml: '<a href="https://ceres-iesp.uerj.br" class="link" target="_blank" rel="noopener noreferrer">CERES</a>, IESP-UERJ',
    term: { en: 'May 2026', 'pt-br': 'Maio 2026' },
    date: '2026-05-01',
    links: [
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/Intro-to-ClaudeCode-CERES-2026' },
    ],
  },
  {
    id: 'deep-learning-tad-2025',
    kind: 'short-course',
    title: 'Deep Learning & Text-as-Data',
    whereHtml: {
      en: '10th Student Week of the Postgraduate Programs, IESP-UERJ',
      'pt-br': '10ª Jornada Discente dos Programas de Pós-Graduação, IESP-UERJ',
    },
    term: '2025.2',
    date: '2025-11-01',
    level: graduate,
    descriptionHtml: {
      en: 'Fundamentals of deep learning: what it is and how to train a neural network, and text-as-data with deep learning.',
      'pt-br': 'Fundamentos de aprendizado profundo: o que é e como treinar uma rede neural, e text-as-data com deep learning.',
    },
    links: [
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/Minicurso-DL-Jornada-Discente-IESP-2025' },
    ],
  },
  {
    id: 'mape-ml-2025',
    kind: 'short-course',
    title: 'Machine Learning',
    whereHtml: {
      en: 'Methodological Training of <a href="https://mape.org.br/" class="link" target="_blank" rel="noopener noreferrer">MAPE</a>',
      'pt-br': 'Formação Metodológica do <a href="https://mape.org.br/" class="link" target="_blank" rel="noopener noreferrer">MAPE</a>',
    },
    term: '2025.2',
    date: '2025-09-01',
    level: graduate,
    descriptionHtml: {
      en: 'Fundamentals of machine learning, focusing on recognizing, training, interpreting, and evaluating simple predictive models applied to social research.',
      'pt-br': 'Fundamentos de aprendizado de máquina, com foco em reconhecer, treinar, interpretar e avaliar modelos preditivos simples aplicados à pesquisa social.',
    },
    links: [
      { kind: 'files', href: 'https://github.com/felipelmc/Presentations/tree/main/ML-FMMAPE-2025' },
    ],
  },
  {
    id: 'sicss-2025',
    kind: 'short-course',
    title: 'Automated Text Analysis',
    whereHtml: '<a href="https://sicss.io/2025/fgv-ecmi-brazil/" class="link" target="_blank" rel="noopener noreferrer">SICSS 2025</a>',
    term: { en: 'July 2025', 'pt-br': 'Julho 2025' },
    date: '2025-07-01',
    links: [
      { kind: 'pdf', href: 'https://github.com/felipelmc/Presentations/blob/main/SICSS-2025/sicss2025.pdf' },
    ],
  },
  {
    id: 'advanced-tad-2025',
    kind: 'ta',
    title: 'Advanced Text-as-Data',
    whereHtml: 'IESP-UERJ Winter School',
    term: '2025.1',
    date: '2025-07-01',
    level: graduate,
    descriptionHtml: {
      en: 'Deep Learning, Transformers, Embeddings, and Large Language Models applied to political science research.',
      'pt-br': 'Deep Learning, Transformers, Embeddings e Grandes Modelos de Linguagem aplicados à pesquisa em ciência política.',
    },
    instructors: [
      { name: 'Tiago Ventura', url: 'https://www.venturatiago.com/' },
      { name: 'Sebastián Vallejo Vera', url: 'https://www.svallejovera.com/' },
    ],
    links: [
      {
        kind: 'site',
        href: 'https://tiagoventura.github.io/tad_iesp_workshop/',
        label: { en: 'Course website', 'pt-br': 'Website do curso' },
      },
    ],
  },
  {
    id: 'quant-methods-ii-2024',
    kind: 'ta',
    title: { en: 'Quantitative Methods II', 'pt-br': 'Métodos Quantitativos II' },
    whereHtml: 'FGV CPDOC',
    term: '2024.2',
    date: '2024-08-01',
    level: undergraduate,
    descriptionHtml: {
      en: 'Exploratory data analysis, basic statistical inference, and regression models.',
      'pt-br': 'Análise exploratória de dados, inferência estatística básica e modelos de regressão.',
    },
    instructors: [{ name: 'Jairo Nicolau', url: 'https://cpdoc.fgv.br/equipe/jaironicolau' }],
  },
  {
    id: 'intro-r-2020',
    kind: 'ta',
    title: { en: 'Introduction to R', 'pt-br': 'Introdução ao R' },
    whereHtml: 'FGV CPDOC',
    term: '2020.2',
    date: '2020-08-01',
    level: graduate,
    descriptionHtml: {
      en: 'Introduction to programming for social sciences.',
      'pt-br': 'Introdução à programação para ciências sociais.',
    },
    instructors: [{ name: 'Jimmy Medeiros', url: 'https://cpdoc.fgv.br/equipe/JimmyMedeiros' }],
  },
];

// Open notes from courses Felipe took, newest first within each level.
export const courseNotes: CourseNotes[] = [
  {
    id: 'lego-iii',
    title: 'Lego III',
    institution: 'IESP-UERJ',
    term: '2026.1',
    level: 'graduate',
    description: {
      en: 'Causal inference: potential outcomes, DAGs, and identification strategies.',
      'pt-br': 'Inferência causal: resultados potenciais, DAGs e estratégias de identificação.',
    },
    instructors: [
      { name: 'Pedro H. G. Ferreira de Souza', affiliation: 'IESP-UERJ' },
      { name: 'Carlos Antonio Costa Ribeiro', affiliation: 'IESP-UERJ' },
      { name: 'Rogério J. Barbosa', affiliation: 'IESP-UERJ' },
    ],
    repo: 'https://github.com/felipelmc/Lego-III',
    site: 'https://felipelamarca.com/Lego-III/',
  },
  {
    id: 'lego-ii',
    title: 'Lego II',
    institution: 'IESP-UERJ',
    term: '2025.2',
    level: 'graduate',
    description: {
      en: 'Linear regression models and extensions.',
      'pt-br': 'Modelos de regressão linear e extensões.',
    },
    instructors: [{ name: 'Rogério J. Barbosa', affiliation: 'IESP-UERJ' }],
    repo: 'https://github.com/felipelmc/Lego-II',
    site: 'https://felipelamarca.com/Lego-II/',
  },
  {
    id: 'lego-i',
    title: 'Lego I',
    institution: 'IESP-UERJ',
    term: '2025.1',
    level: 'graduate',
    description: {
      en: 'Quantitative social science: data analysis, research design, probability, and inference.',
      'pt-br': 'Ciências sociais quantitativas: análise de dados, desenho de pesquisa, probabilidade e inferência.',
    },
    instructors: [{ name: 'Bruno Schaefer', affiliation: 'IESP-UERJ' }],
    repo: 'https://github.com/felipelmc/Lego-I',
    site: 'https://felipelamarca.com/Lego-I/',
  },
  {
    id: 'survey-research',
    title: { en: 'Survey Research', 'pt-br': 'Pesquisa de Survey' },
    institution: 'IESP-UERJ',
    term: '2025.1',
    level: 'graduate',
    description: {
      en: 'Survey research: total survey error, sampling, questionnaire design, post-stratification and MrP, nonresponse, and election polls.',
      'pt-br': 'Pesquisa de survey: erro total de survey, amostragem, desenho de questionários, pós-estratificação e MrP, não-resposta e pesquisas eleitorais.',
    },
    instructors: [{ name: 'Fernando Meireles', affiliation: 'IESP-UERJ', url: 'https://fmeireles.com/' }],
    repo: 'https://github.com/felipelmc/Survey-Research',
    site: 'https://felipelamarca.com/Survey-Research/',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    institution: 'FGV EMAp',
    term: '2023.2',
    level: 'undergraduate',
    description: {
      en: 'Foundations of NNs, CNNs, LSTMs, GANs, Transformers, transfer learning, and autoencoders.',
      'pt-br': 'Fundamentos de redes neurais, CNNs, LSTMs, GANs, Transformers, transfer learning e autoencoders.',
    },
    repo: 'https://github.com/felipelmc/Deep-Learning',
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    institution: 'FGV EMAp',
    term: '2023.1',
    level: 'undergraduate',
    description: {
      en: 'Probabilistic machine learning, mixture models, and approximate Bayesian inference.',
      'pt-br': 'Aprendizado de máquina probabilístico, modelos de mistura e inferência bayesiana aproximada.',
    },
    repo: 'https://github.com/felipelmc/Machine-Learning',
  },
];
