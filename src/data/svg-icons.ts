import Logo from '../../public/logo.svg?raw';
import VizLearn from '../assets/icons/projects/vizlearn.svg?raw';
import PicNest from '../assets/icons/projects/picnest.svg?raw';
import GitHub from '../assets/icons/socials/remix-github.svg?raw';
import X from '../assets/icons/socials/remix-x.svg?raw';
import LinkedIn from '../assets/icons/socials/remix-linkedin.svg?raw';
import YouTube from '../assets/icons/socials/remix-youtube.svg?raw';
import Bilibili from '../assets/icons/socials/remix-bilibili.svg?raw';

export const svgIcons = {
  logo: Logo,
  vizlearn: VizLearn,
  picnest: PicNest,
  github: GitHub,
  x: X,
  linkedin: LinkedIn,
  youtube: YouTube,
  bilibili: Bilibili,
} as const;

export type SvgIconName = keyof typeof svgIcons;
