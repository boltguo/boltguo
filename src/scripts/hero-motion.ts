import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';

const INK = '#4a4138';
const BLUE = '#1e88e5';
const GREEN = '#43a047';
const RED = '#e88d8d';
const AMBER = '#ffb74d';

const CHATGPT_LOGO = new Path2D(
  'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'
);
const CLAUDE_LOGO = new Path2D(
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'
);
const TYPESCRIPT_LOGO = new Path2D(
  'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z'
);
const REACT_LOGO = new Path2D(
  'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z'
);

// redraw ~11fps so the wobble reads as a hand-drawn "boil", not smooth motion
const FRAME_MS = 88;
const BOIL_MS = 240;

type Scene = {
  rc: RoughCanvas;
  ctx: CanvasRenderingContext2D;
  seed: number;
};

// drawn around its original (250, 216) center, then shifted to (cx, cy)
const controller = (
  { rc, ctx, seed }: Scene,
  cx = 250,
  cy = 216,
  scale = 1
) => {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-250, -216);

  rc.path(
    'M 184 166 Q 166 166 160 185 L 150 236 Q 145 256 158 267 ' +
      'Q 171 278 183 260 L 198 238 Q 204 230 216 230 L 284 230 ' +
      'Q 296 230 302 238 L 317 260 Q 329 278 342 267 Q 355 256 350 236 ' +
      'L 340 185 Q 334 166 316 166 Z',
    {
      stroke: INK,
      strokeWidth: 2.8,
      fill: '#ffffff',
      fillStyle: 'solid',
      roughness: 1.3,
      seed,
    }
  );
  // shoulder seams
  rc.line(184, 173, 201, 184, {
    stroke: INK,
    strokeWidth: 2,
    roughness: 1,
    seed: seed + 1,
  });
  rc.line(316, 173, 299, 184, {
    stroke: INK,
    strokeWidth: 2,
    roughness: 1,
    seed: seed + 2,
  });
  // d-pad
  rc.line(192, 202, 224, 202, {
    stroke: INK,
    strokeWidth: 5,
    roughness: 1,
    seed: seed + 3,
  });
  rc.line(208, 186, 208, 218, {
    stroke: INK,
    strokeWidth: 5,
    roughness: 1,
    seed: seed + 4,
  });
  // four face buttons
  [
    [312, 191, BLUE, '#E3F2FD'],
    [326, 205, RED, '#FFDDDD'],
    [312, 219, GREEN, '#E4F5E5'],
    [298, 205, AMBER, '#FFF1D7'],
  ].forEach(([x, y, color, fill], i) => {
    rc.circle(x as number, y as number, 11, {
      stroke: color as string,
      strokeWidth: 2.1,
      fill: fill as string,
      fillStyle: 'solid',
      roughness: 1,
      seed: seed + 5 + i,
    });
  });
  // thumb sticks and a small home button
  rc.circle(241, 207, 16, {
    stroke: INK,
    strokeWidth: 2.2,
    fill: '#f4f1ed',
    fillStyle: 'solid',
    roughness: 1,
    seed: seed + 9,
  });
  rc.circle(276, 207, 16, {
    stroke: INK,
    strokeWidth: 2.2,
    fill: '#f4f1ed',
    fillStyle: 'solid',
    roughness: 1,
    seed: seed + 10,
  });
  rc.circle(258, 190, 7, {
    stroke: INK,
    strokeWidth: 1.8,
    fill: '#ffffff',
    fillStyle: 'solid',
    roughness: 0.8,
    seed: seed + 11,
  });

  ctx.restore();
};

const musicNote = (
  { rc, ctx, seed }: Scene,
  t: number,
  x: number,
  y: number,
  size: number,
  color: string,
  phase: number
) => {
  const bob = Math.sin(t / 1100 + phase) * 7;
  const tilt = Math.sin(t / 1500 + phase) * 0.12;

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.rotate(tilt);

  rc.ellipse(0, 0, size * 0.95, size * 0.66, {
    stroke: color,
    strokeWidth: 2,
    fill: color,
    fillStyle: 'solid',
    roughness: 1,
    seed,
  });
  rc.line(size * 0.42, -size * 0.08, size * 0.42, -size * 1.9, {
    stroke: color,
    strokeWidth: 2.4,
    roughness: 1,
    seed: seed + 1,
  });
  rc.path(
    `M ${size * 0.42} ${-size * 1.9} Q ${size * 1.35} ${-size * 1.5} ${size * 1.05} ${-size * 0.7}`,
    { stroke: color, strokeWidth: 2.2, roughness: 1, seed: seed + 2 }
  );

  ctx.restore();
};

const equalizer = ({ rc, seed }: Scene, t: number, baseX = 86, baseY = 318) => {
  [BLUE, AMBER, GREEN].forEach((color, i) => {
    const h = 20 + (Math.sin(t / 420 + i * 1.15) * 0.5 + 0.5) * 30;
    rc.line(baseX + i * 19, baseY, baseX + i * 19, baseY - h, {
      stroke: color,
      strokeWidth: 7,
      roughness: 1,
      seed: seed + i,
    });
  });
};

const logoMark = (
  { ctx }: Scene,
  path: Path2D,
  x: number,
  y: number,
  size: number,
  color: string,
  tilt = 0
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.scale(size / 24, size / 24);
  ctx.translate(-12, -12);
  ctx.fillStyle = color;
  ctx.fill(path);
  ctx.restore();
};

type SceneDef = {
  width: number;
  height: number;
  animated?: boolean;
  draw: (scene: Scene, t: number) => void;
};

// Only the music animates; the tool marks stay fixed in the surrounding gaps.
const drawTop = (scene: Scene, t: number) => {
  equalizer(scene, t, 70, 172);
  musicNote(scene, t, 148, 106, 20, BLUE, 0);
  musicNote(scene, t, 202, 62, 14, AMBER, 1.8);
  logoMark(scene, CHATGPT_LOGO, 372, 74, 20, '#111111', -0.12);
  logoMark(scene, CLAUDE_LOGO, 458, 140, 28, '#d97757', 0.08);
};

// Anya sits at left; the controller cable reaches back toward the center.
const drawBottom = (scene: Scene) => {
  scene.rc.path(
    'M 654 88 C 644 132, 612 174, 570 181 ' +
      'C 526 189, 493 145, 446 145 ' +
      'C 398 145, 358 195, 294 218',
    {
      stroke: INK,
      strokeWidth: 2.4,
      roughness: 1.2,
      seed: scene.seed + 15,
    }
  );
  controller(scene, 670, 86, 0.76);
  logoMark(scene, TYPESCRIPT_LOGO, 272, 186, 17, '#3178c6', -0.1);
  logoMark(scene, REACT_LOGO, 452, 166, 27, '#149eca', 0.07);
};

const SCENES: Record<string, SceneDef> = {
  top: { width: 760, height: 190, draw: drawTop },
  bottom: { width: 760, height: 230, animated: false, draw: drawBottom },
};

const fitCanvas = (
  canvas: HTMLCanvasElement,
  def: SceneDef
): CanvasRenderingContext2D => {
  const cssWidth = canvas.getBoundingClientRect().width || def.width;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const scale = (cssWidth / def.width) * dpr;
  canvas.width = Math.round(def.width * scale);
  canvas.height = Math.round(def.height * scale);
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return ctx;
};

const bootCanvas = (canvas: HTMLCanvasElement) => {
  const def = SCENES[canvas.dataset.heroMotion || ''];
  if (!def) return;

  const rc = rough.canvas(canvas);
  const scene: Scene = { rc, ctx: fitCanvas(canvas, def), seed: 11 };
  const baseSeed = scene.seed;

  const drawScene = (t: number) => {
    scene.ctx.clearRect(0, 0, def.width, def.height);
    def.draw(scene, t);
  };

  const still =
    def.animated === false ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) {
    drawScene(0);
    new ResizeObserver(() => {
      scene.ctx = fitCanvas(canvas, def);
      drawScene(0);
    }).observe(canvas);
    return;
  }

  let raf = 0;
  let last = 0;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (now - last < FRAME_MS) return;
    last = now;
    scene.seed = baseSeed + (Math.floor(now / BOIL_MS) % 3);
    drawScene(now);
  };

  const start = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  // don't burn frames while the hero is scrolled away
  new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) start();
    else stop();
  }).observe(canvas);

  new ResizeObserver(() => {
    scene.ctx = fitCanvas(canvas, def);
    drawScene(last || 0);
  }).observe(canvas);

  start();
};

const boot = () => {
  document
    .querySelectorAll<HTMLCanvasElement>('canvas[data-hero-motion]')
    .forEach(bootCanvas);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
