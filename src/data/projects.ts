export type Project = {
  id: string;
  title: string;
  description: string;
  /** Scannable product capabilities shown on featured cards */
  highlights?: readonly string[];
  /** Longer implementation context shown after the highlights */
  details?: string;
  tech: readonly string[];
  link: string;
  category: 'product' | 'tool' | 'learning';
  /** Featured projects get the big card treatment on the homepage */
  featured?: boolean;
  /** Only linked from the footer, not shown in the projects section */
  footerOnly?: boolean;
  /** One concrete proof point, shown on featured cards */
  proof?: string;
  /** Supporting copy displayed beside the primary call to action */
  ctaNote?: string;
};

export const projects: readonly Project[] = [
  {
    id: '01',
    title: 'VizLearn',
    description:
      'VizLearn is an interactive way to learn algorithms, AI, and computer science. Change the input and step through each operation while the code, visualization, and execution log stay in sync.',
    tech: ['Algorithms', 'AI & CS'],
    link: 'https://vizlearn.app/',
    category: 'product',
    featured: true,
    proof:
      'Free to use in the browser, with lessons on algorithms, AI, and computer science.',
  },
  {
    id: '02',
    title: 'KotoPlanet',
    description:
      "I couldn't find a Japanese-learning tool that felt right, so I built one.",
    highlights: [
      'Spaced repetition schedules reviews and new lessons.',
      'Practice reading, listening, shadowing, pronunciation, and kanji strokes in the same app.',
      'AI speaking scenarios, N5 mock exams, and an OAuth MCP connect ChatGPT and Claude to the same learning record.',
    ],
    details:
      'The app works offline and stores data locally. One Expo monorepo powers iOS and the Cloudflare web app; signing in adds sync. CSV content compiles into versioned seeds.',
    tech: ['N5–N1', 'Expo', 'OAuth + MCP', 'Local-first'],
    link: 'https://kotoplanet.com/',
    category: 'product',
    featured: true,
    proof: 'I built it to help me use Japanese, not just study for a test.',
    ctaNote: 'Free in your browser.',
  },
  {
    id: '04',
    title: 'AOUI (WIP)',
    description:
      'A work-in-progress UI reference for the CSS-variable themes, buttons, cards, forms, tables, and feedback patterns used across AOUOS projects.',
    tech: ['Design Tokens', 'Components'],
    link: 'https://aoui.aouos.com/',
    category: 'tool',
    footerOnly: true,
  },
  {
    id: '05',
    title: 'AOUOS LOGO',
    description:
      'Download the AOUOS logo as SVG or PNG, with transparent and white-background versions in several sizes.',
    tech: ['SVG', 'Brand Assets'],
    link: 'https://logo.aouos.com/',
    category: 'tool',
    footerOnly: true,
  },
  {
    id: '11',
    title: 'Luti',
    description:
      'Luti lets MCP-compatible AI clients work inside a Mac project you approve. It can read and edit code, run tests, use the browser and Mac apps, and share project memory, all under explicit permissions.',
    tech: ['macOS 14+', 'MCP', 'Open source'],
    link: 'https://luti.aouos.com/',
    category: 'product',
  },
  {
    id: '06',
    title: 'Watermark Remover',
    description:
      'Remove Nano Banana watermarks in your browser by reversing alpha blending. Your image stays on your device, and no AI tries to guess the missing pixels.',
    tech: ['Local Processing', 'Alpha Blending'],
    link: 'https://wmremover.aouos.com/',
    category: 'tool',
  },
  {
    id: '07',
    title: 'CodePin',
    description:
      'Create or scan QR codes and barcodes, keep them in history, pin them to the Lock Screen or Dynamic Island, and export them as HD images or SVG. Pro sync uses your private iCloud database.',
    tech: ['QR & Barcodes', 'Local-first', 'SVG & iCloud'],
    link: 'https://codepin.aouos.com/',
    category: 'product',
  },
  {
    id: '03',
    title: 'AOUO (Pre-alpha)',
    description:
      'A pre-alpha take on local-first agent apps. Each .aouo pack keeps its skills and data inside a separate app boundary, with its own schedule, permissions, and UI.',
    tech: ['Agent Runtime', 'Local-first'],
    link: 'https://aouo.ai/',
    category: 'tool',
    footerOnly: true,
  },
  {
    id: '08',
    title: 'React 19 Learning',
    description:
      'Thirty project-based lessons. Build a Todo app and a Next.js 15 storefront, add tests and deployment, then look inside React Fiber.',
    tech: ['React 19', 'Next.js 15'],
    link: 'https://react.aouos.com',
    category: 'learning',
    footerOnly: true,
  },
  {
    id: '09',
    title: 'Vue 3 Learning',
    description:
      'Learn Vue 3 by building projects, from a Todo app to a full-stack shop. Later lessons cover Pinia, routing, framework internals, and 15 comparisons with React.',
    tech: ['Vue 3', 'Composition API'],
    link: 'https://vue.aouos.com',
    category: 'learning',
    footerOnly: true,
  },
  {
    id: '10',
    title: 'React Vite CLI',
    description:
      'Scaffold a React and Vite project with optional TypeScript, Tailwind CSS, React Router, ESLint and Prettier, and Zustand.',
    tech: ['React', 'Vite', 'CLI'],
    link: 'https://www.npmjs.com/package/react-vite',
    category: 'tool',
    footerOnly: true,
  },
] as const;

export const projectCategories = [
  { key: 'product', title: 'Products' },
  { key: 'tool', title: 'Tools & experiments' },
  { key: 'learning', title: 'Learning notes' },
] as const;

/** Social accounts shown in the site footer. */
export const socials = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com/boltguo' },
  { name: 'X', icon: 'x', href: 'https://x.com/boltguo' },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/boltguo/',
  },
  { name: 'YouTube', icon: 'youtube', href: 'https://youtube.com/@boltguo' },
  {
    name: 'Instagram',
    icon: 'instagram',
    href: 'https://instagram.com/boltguo',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/48999569',
  },
] as const;
