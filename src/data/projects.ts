import type { BrandName } from './brands';
import type { SvgIconName } from './svg-icons';

export type Project = {
  id: string;
  title: string;
  summary: string;
  /** The project's own favicon, or a brand mark for developer tools. */
  icon?: SvgIconName;
  iconSprite?: 'kotoplanet' | 'luti' | 'codepin' | 'anya-codex-pet';
  iconBrand?: BrandName;
  link: string;
  /** Shown in the secondary More section. */
  footerOnly?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: '01',
    title: 'VizLearn',
    icon: 'vizlearn',
    summary: 'Trace algorithms, AI, and systems step by step.',
    link: 'https://vizlearn.app/',
  },
  {
    id: '02',
    title: 'KotoPlanet',
    iconSprite: 'kotoplanet',
    summary: 'Learn Japanese from N5 to N1 with spaced review.',
    link: 'https://kotoplanet.com/',
  },
  {
    id: '11',
    title: 'Luti',
    iconSprite: 'luti',
    summary: "Connect AI to your Mac's tools and project memory.",
    link: 'https://luti.aouos.com/',
  },
  {
    id: '03',
    title: 'AOUO',
    icon: 'logo',
    summary: 'Build and run local-first AI app packs (pre-alpha).',
    link: 'https://aouo.ai/',
    footerOnly: true,
  },
  {
    id: '07',
    title: 'CodePin',
    iconSprite: 'codepin',
    summary: 'Pin QR codes and barcodes to your Lock Screen.',
    link: 'https://codepin.aouos.com/',
    footerOnly: true,
  },
  {
    id: '12',
    title: 'PicNest',
    icon: 'picnest',
    summary: 'Self-host and share images on Cloudflare.',
    link: 'https://github.com/boltguo/PicNest',
    footerOnly: true,
  },
  {
    id: '10',
    title: 'React Vite CLI',
    iconBrand: 'vite',
    summary: 'Scaffold and extend React + Vite apps.',
    link: 'https://www.npmjs.com/package/react-vite',
    footerOnly: true,
  },
  {
    id: '13',
    title: 'Anya Codex Pet',
    // Original artwork: first idle frame from boltguo/anya-codex-pet's v1 spritesheet.
    iconSprite: 'anya-codex-pet',
    summary: 'A fan-made animated Anya pet for Codex.',
    link: 'https://github.com/boltguo/anya-codex-pet',
    footerOnly: true,
  },
] as const;

/** Social accounts shown in the site footer. */
export const socials = [
  {
    name: 'GitHub',
    icon: 'github',
    href: 'https://github.com/boltguo',
  },
  {
    name: 'X',
    icon: 'x',
    href: 'https://x.com/boltguo',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/boltguo/',
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    href: 'https://youtube.com/@boltguo',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/48999569',
  },
] as const;
