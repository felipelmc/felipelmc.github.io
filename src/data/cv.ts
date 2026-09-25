import type { Cv } from './types';

// Web CV. Degree labels and dates follow the PDF CV (cv/cv-en.qmd, cv/cv-pt.qmd).

export const cv: Cv = {
  lastUpdated: { en: 'Last updated: July 2026', 'pt-br': 'Atualizado em julho de 2026' },

  affiliations: [
    {
      role: { en: 'Data Scientist', 'pt-br': 'Cientista de Dados' },
      org: 'AtlasIntel',
      orgUrl: 'https://atlasintel.org/',
      descriptionHtml: {
        en: 'AtlasIntel provides advanced data products for political intelligence and economic forecasting. My work involves calibrating survey samples, political analysis, public opinion monitoring, and improving internal data pipelines.',
        'pt-br': 'A AtlasIntel fornece produtos de dados avançados para inteligência política e previsão econômica. Meu trabalho envolve calibração de amostras de surveys, análise política, monitoramento de opinião pública e melhoria de pipelines de dados internos.',
      },
    },
    {
      role: { en: 'Researcher', 'pt-br': 'Pesquisador' },
      org: 'IESP-UERJ',
      labs: [
        {
          name: 'MAPE',
          url: 'https://mape.org.br/',
          coordinators: 'Fernando Meireles & Bruno Schaefer',
          description: {
            en: 'Policy and Election Monitoring and Evaluation Laboratory. Dedicated to studying public policy, elections, and their interconnections using causal inference and machine learning techniques.',
            'pt-br': 'Laboratório de Monitoramento e Avaliação de Políticas Públicas e Eleições. Dedicado ao estudo de políticas públicas, eleições e suas interconexões por meio de técnicas de inferência causal e aprendizado de máquina.',
          },
        },
        {
          name: 'DOXA',
          url: 'https://www.lab-doxa.org.br/',
          coordinators: 'Fernando Meireles & Argelina Cheibub Figueiredo',
          description: {
            en: 'Laboratory of Electoral Studies, Political Communication and Public Opinion. A leading center for research on electoral processes, political communication, and voting behavior in Brazil.',
            'pt-br': 'Laboratório de Estudos Eleitorais, de Comunicação Política e Opinião Pública. Um dos principais centros de pesquisa sobre processos eleitorais, comunicação política e comportamento de voto no Brasil.',
          },
        },
        {
          name: 'NECON',
          url: 'http://necon.iesp.uerj.br',
          coordinators: 'Fabiano Santos',
          description: {
            en: 'Center for Studies on Congress. Focused on academic research on the Brazilian legislature, including databases on nominal votes, party migration, and legislative production.',
            'pt-br': 'Núcleo de Estudos sobre o Congresso. Focado em pesquisa acadêmica sobre o Legislativo brasileiro, incluindo bases de dados sobre votações nominais, migração partidária e produção legislativa.',
          },
        },
      ],
    },
  ],

  education: [
    {
      when: { en: '2025–present', 'pt-br': '2025–atual' },
      html: { en: 'M.A. in Political Science', 'pt-br': 'Mestrado em Ciência Política' },
      subHtml: {
        en: '<a href="https://iesp.uerj.br/en/" class="link" target="_blank" rel="noopener noreferrer">Institute of Social and Political Studies</a> (IESP-UERJ)',
        'pt-br': '<a href="https://iesp.uerj.br/" class="link" target="_blank" rel="noopener noreferrer">Instituto de Estudos Sociais e Políticos</a> (IESP-UERJ)',
      },
    },
    {
      when: '2021–2024',
      html: {
        en: 'B.Sc. in Data Science and Artificial Intelligence',
        'pt-br': 'Bacharelado em Ciência de Dados e Inteligência Artificial',
      },
      subHtml: {
        en: '<a href="https://emap.fgv.br/en" class="link" target="_blank" rel="noopener noreferrer">School of Applied Mathematics</a> (FGV EMAp)',
        'pt-br': '<a href="https://emap.fgv.br/" class="link" target="_blank" rel="noopener noreferrer">Escola de Matemática Aplicada</a> (FGV EMAp)',
      },
    },
    {
      when: '2019–2024',
      html: { en: 'B.A. in Social Sciences', 'pt-br': 'Bacharelado em Ciências Sociais' },
      subHtml: {
        en: '<a href="https://cpdoc.fgv.br/en" class="link" target="_blank" rel="noopener noreferrer">School of Social Sciences</a> (FGV CPDOC)',
        'pt-br': '<a href="https://cpdoc.fgv.br/" class="link" target="_blank" rel="noopener noreferrer">Escola de Ciências Sociais</a> (FGV CPDOC)',
      },
    },
  ],

  scholarships: [
    {
      when: '2026–2027',
      html: {
        en: 'Graduate Scholarship — FAPERJ Nota 10 (Fundação de Amparo à Pesquisa do Estado do Rio de Janeiro).',
        'pt-br': 'Bolsa de Pesquisa de Pós-Graduação — FAPERJ Nota 10 (Fundação de Amparo à Pesquisa do Estado do Rio de Janeiro).',
      },
    },
    {
      when: '2025–2026',
      html: {
        en: 'Graduate Scholarship — CAPES (Coordenação de Aperfeiçoamento de Pessoal de Nível Superior).',
        'pt-br': 'Bolsa de Pesquisa de Pós-Graduação — CAPES (Coordenação de Aperfeiçoamento de Pessoal de Nível Superior).',
      },
    },
    {
      when: '2021–2022',
      html: {
        en: 'Institutional Scientific Initiation Scholarship — CNPq.',
        'pt-br': 'Bolsa de Iniciação Científica Institucional — CNPq.',
      },
    },
    {
      when: '2019–2021',
      html: {
        en: 'Institutional Scientific Initiation Scholarship — FGV.',
        'pt-br': 'Bolsa de Iniciação Científica Institucional — FGV.',
      },
    },
    {
      when: '2019–2024',
      html: {
        en: '90% Merit Scholarship for undergraduate studies at FGV, awarded for outstanding performance in the entrance examination.',
        'pt-br': 'Bolsa de Mérito de 90% para estudos de graduação na FGV, concedida por desempenho excepcional no exame de admissão.',
      },
    },
  ],

  distinctions: [
    {
      when: '2026',
      html: {
        en: '2nd Runner Up, Best DH Tool or Suite of Tools – <a href="http://dhawards.org/dhawards2025/results/" class="link" target="_blank" rel="noopener noreferrer">DH Awards 2025</a>, for <a href="https://github.com/felipelmc/RelicarIA" class="link" target="_blank" rel="noopener noreferrer">RelicarIA</a> (joint work with Danielle Sanches de Almeida).',
        'pt-br': '2nd Runner Up (3º lugar), Best DH Tool or Suite of Tools – <a href="http://dhawards.org/dhawards2025/results/" class="link" target="_blank" rel="noopener noreferrer">DH Awards 2025</a>, pelo projeto <a href="https://github.com/felipelmc/RelicarIA" class="link" target="_blank" rel="noopener noreferrer">RelicarIA</a> (trabalho conjunto com Danielle Sanches de Almeida).',
      },
    },
    {
      when: '2026',
      html: {
        en: "Selected to receive the FAPERJ Nota 10 Graduate Scholarship for outstanding performance in the first year of the Master's program in Political Science at IESP-UERJ.",
        'pt-br': 'Selecionado para receber a Bolsa de Pós-Graduação FAPERJ Nota 10 por desempenho excepcional no primeiro ano do Mestrado em Ciência Política no IESP-UERJ.',
      },
    },
    {
      when: '2025',
      html: {
        en: 'Professor Carlos Eduardo Sarmento Academic Distinction Award, School of Social Sciences (FGV CPDOC), for achieving the highest academic performance among the Class of 2025 undergraduate students.',
        'pt-br': 'Prêmio de Distinção Acadêmica Professor Carlos Eduardo Sarmento, Escola de Ciências Sociais (FGV CPDOC), pelo melhor desempenho acadêmico entre os formandos da turma de 2025.',
      },
    },
    {
      when: '2024',
      html: {
        en: "1st place admission to the Master's program in Political Science at IESP-UERJ.",
        'pt-br': '1º lugar no ingresso ao Mestrado em Ciência Política no IESP-UERJ.',
      },
    },
    {
      when: '2020',
      html: {
        en: "Best Paper Award, History and Social Sciences Students' Week (FGV CPDOC).",
        'pt-br': 'Melhor Trabalho, Semana de História e Ciências Sociais (FGV CPDOC).',
      },
    },
  ],

  training: [
    {
      when: { en: 'February 2026', 'pt-br': 'Fevereiro 2026' },
      html: {
        en: '<a href="https://www.effectivealtruism.org/ea-global" class="link" target="_blank" rel="noopener noreferrer">Effective Altruism Global</a> – San Francisco, CA, United States (full funding).',
        'pt-br': '<a href="https://www.effectivealtruism.org/ea-global" class="link" target="_blank" rel="noopener noreferrer">Effective Altruism Global</a> – San Francisco, CA, Estados Unidos (financiamento integral).',
      },
    },
    {
      when: { en: 'November 2025', 'pt-br': 'Novembro 2025' },
      html: {
        en: 'Academic writing and publication of quantitative papers in Social Sciences @ IESP-UERJ.',
        'pt-br': 'Escrita acadêmica e publicação de artigos quantitativos em Ciências Sociais @ IESP-UERJ.',
      },
    },
    {
      when: { en: 'July 2025', 'pt-br': 'Julho 2025' },
      html: 'Advanced Text-As-Data: Word Embeddings, Deep Learning, and LLMs @ IESP-UERJ.',
    },
    {
      when: { en: 'July 2024', 'pt-br': 'Julho 2024' },
      html: {
        en: '<a href="https://sicss.io/2024/fgv-ecmi-brazil/" class="link" target="_blank" rel="noopener noreferrer">SICSS: Summer Institute in Computational Social Science</a> – Rio de Janeiro, RJ, Brazil.',
        'pt-br': '<a href="https://sicss.io/2024/fgv-ecmi-brazil/" class="link" target="_blank" rel="noopener noreferrer">SICSS: Summer Institute in Computational Social Science</a> – Rio de Janeiro, RJ, Brasil.',
      },
    },
    {
      when: { en: 'July 2024', 'pt-br': 'Julho 2024' },
      html: '<a href="https://www.ml4good.org/" class="link" target="_blank" rel="noopener noreferrer">ML4Good Bootcamp</a>.',
    },
  ],

  references: [
    {
      name: 'Fernando Meireles, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research and Teaching', 'pt-br': 'Pesquisa e Ensino' },
      email: 'fernando dot meireles at iesp dot uerj dot br',
    },
    {
      name: 'Jaqueline Zulini, Ph.D.',
      institution: 'FGV CPDOC',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'jaqueline dot zulini at fgv dot br',
    },
    {
      name: 'Bruno Schaefer, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research and Teaching', 'pt-br': 'Pesquisa e Ensino' },
      email: 'brunoschaefer at iesp dot uerj dot br',
    },
    {
      name: 'Argelina Figueiredo, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'argelina at iesp dot uerj dot br',
    },
    {
      name: 'José Szwako, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'zeszwako at iesp dot uerj dot br',
    },
    {
      name: 'Rogério Barbosa, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'rogerio dot barbosa at iesp dot uerj dot br',
    },
    {
      name: 'Fabiano Santos, Ph.D.',
      institution: 'IESP-UERJ',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'fsantos at iesp dot uerj dot br',
    },
    {
      name: 'Luiz Max Carvalho, Ph.D.',
      institution: 'FGV EMAp',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'luiz dot fagundes at fgv dot br',
    },
    {
      name: 'Renato Rocha Souza, Ph.D.',
      institution: 'University of Vienna',
      role: { en: 'Research', 'pt-br': 'Pesquisa' },
      email: 'renato dot rocha dot souza at univie dot ac dot at',
    },
    {
      name: 'Jimmy Medeiros, Ph.D.',
      institution: 'FGV CPDOC',
      role: { en: 'Research and Teaching', 'pt-br': 'Pesquisa e Ensino' },
      email: 'jimmy dot medeiros at fgv dot br',
    },
  ],
};
