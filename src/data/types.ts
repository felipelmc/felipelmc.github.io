// Shared types for the bilingual content in src/data/. Every page renders the
// same data for both locales; a field typed `Text` is either one string used
// as-is in both languages (proper nouns, titles kept in their original
// language) or an `L` pair with one string per locale.
//
// Fields named `...Html` hold trusted, hand-written HTML (inline links, <em>)
// and are rendered with set:html. Everything else is plain text.

export type Locale = 'en' | 'pt-br';
export type L<T = string> = Record<Locale, T>;
export type Text = string | L;

/** Language a plain-string title or abstract is written in, for its `lang` attribute. */
export type ContentLang = 'en' | 'pt-BR';

export interface Person {
  name: string;
  affiliation?: string;
  url?: string;
}

export type LinkKind =
  | 'live' | 'site' | 'repo' | 'doi' | 'paper' | 'pdf' | 'files' | 'slides' | 'data' | 'event';

export interface Link {
  kind: LinkKind;
  href: string;
  /** Overrides the default label for `kind` (from translations.ts). */
  label?: Text;
}

export interface Citation {
  /** Unique id; becomes the dialog id `cite-<key>`. */
  key: string;
  /** Raw BibTeX, stored once. Astro escapes it on render; copy reads textContent. */
  bibtex: string;
}

// ── Research ────────────────────────────────────────────────────────────────

export type PublicationType = 'dissertation' | 'working-paper' | 'article' | 'technical-note';

export interface Publication {
  id: string;
  type: PublicationType;
  year: number;
  title: Text;
  titleLang?: ContentLang;
  /** Co-authors, excluding Felipe. */
  authors?: Person[];
  /** Journal/lab/venue line, may contain <em>. */
  venueHtml?: Text;
  /** Status or presentation note, e.g. "Presented at ABCP 2026." */
  note?: Text;
  abstract?: Text;
  abstractLang?: ContentLang;
  links?: Link[];
  citation?: Citation;
  /** Shown in the home page's Research section, in this order. */
  featured?: number;
}

export interface Talk {
  /** ISO date of the (first) day; drives ordering and past/upcoming. */
  date: string;
  dateLabel: L;
  event: Text;
  eventUrl?: string;
  /** Session, city, etc. */
  detail?: Text;
  title: string;
  titleLang?: ContentLang;
  publicationId?: string;
  links?: Link[];
  /**
   * Still ahead. Set by hand, not computed from the build date, so a rebuild on
   * CI always reproduces the committed docs/. Clear it once the talk happens.
   */
  upcoming?: boolean;
}

// ── Teaching ────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  kind: 'short-course' | 'ta';
  title: Text;
  titleLang?: ContentLang;
  /** Institution/venue line, may contain links. */
  whereHtml: Text;
  term: Text;
  /** ISO date for ordering (newest first). */
  date: string;
  level?: L;
  descriptionHtml?: Text;
  instructors?: Person[];
  links?: Link[];
}

export interface CourseNotes {
  id: string;
  title: Text;
  institution: string;
  term: string;
  level: 'graduate' | 'undergraduate';
  description: L;
  instructors?: Person[];
  repo?: string;
  site?: string;
}

// ── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory = 'ai' | 'apps' | 'data' | 'software' | 'viz';

export interface Project {
  slug: string;
  title: Text;
  /** Render the title in monospace (package/repo names). */
  code?: boolean;
  year: number;
  tier: 'featured' | 'standard' | 'compact';
  /** Position on the home page, if shown there. */
  home?: number;
  categories: ProjectCategory[];
  tagline: L;
  descriptionHtml?: L;
  context?: Text;
  collaborators?: Person[];
  stack?: string[];
  stats?: { value: Text; label: L }[];
  links: Link[];
  award?: { label: L; href?: string };
  /** Streamlit Community Cloud apps sleep when idle and take a while to wake. */
  coldStart?: boolean;
  coursework?: boolean;
  /** No public URL (e.g. deployed for a client). */
  privateDeployment?: boolean;
  /**
   * Screenshot at /img/projects/<image>.webp (1600×1000) and
   * /img/projects/thumbs/<image>.webp (800×500); `image` defaults to the slug.
   * `domain` is what the frame's address bar shows.
   */
  shot?: { image?: string; domain: string; alt: L };
  citation?: Citation;
}

// ── CV ──────────────────────────────────────────────────────────────────────

export interface CvLab {
  name: string;
  url: string;
  coordinators: string;
  description: L;
}

export interface CvAffiliation {
  role: L;
  org: string;
  orgUrl?: string;
  descriptionHtml?: L;
  labs?: CvLab[];
}

export interface CvRow {
  /** Left column: years or a date label. */
  when: Text;
  /** Main line; may contain links. */
  html: Text;
  /** Optional second line, e.g. the institution. */
  subHtml?: Text;
}

export interface CvReference {
  name: string;
  institution: string;
  role: L;
  /** Obfuscated address, e.g. "fernando dot meireles at iesp dot uerj dot br". */
  email: string;
}

export interface Cv {
  lastUpdated: L;
  affiliations: CvAffiliation[];
  education: CvRow[];
  scholarships: CvRow[];
  distinctions: CvRow[];
  training: CvRow[];
  references: CvReference[];
}
