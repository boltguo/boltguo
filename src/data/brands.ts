import {
  siClaude,
  siReact,
  siTypescript,
  siVite,
  siVuedotjs,
} from 'simple-icons';

export const brands = {
  typescript: { icon: siTypescript, label: 'TypeScript' },
  react: { icon: siReact, label: 'React' },
  vue: { icon: siVuedotjs, label: 'Vue' },
  claude: { icon: siClaude, label: 'Claude' },
  vite: { icon: siVite, label: 'Vite' },
} as const;

export type BrandName = keyof typeof brands;
