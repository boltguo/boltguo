#!/usr/bin/env node
/**
 * Draws the hand-drawn SVGs the README points at, into readme/.
 *
 * roughjs' generator never touches the DOM, so the sketch language the site
 * draws on canvas can be emitted as plain SVG paths from Node. The files are
 * committed so GitHub serves them straight from the repo — nothing here needs
 * the site to be deployed.
 *
 * Everything a card needs travels inside its own file: the lettering as a
 * subset of Comic Neue, the character art as a data URI. An SVG referenced
 * from an <img>, which is how GitHub renders it, cannot fetch anything over
 * the network.
 *
 *   node scripts/draw-readme-art.mjs [--seed 1234]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import rough from 'roughjs';

const gen = rough.generator();

const INK = '#4a4138';
const PENCIL = '#8a7b66';
const PAPER = '#ffffff';
const PAPER_LINE = '#d4c9b4';

const accents = {
  blue: '#1e88e5',
  amber: '#ffb74d',
  coral: '#e88d8d',
  lilac: '#8e24aa',
};

/** The tones the site's project sketches are painted with. */
const tone = {
  blue: { bg: '#e3f2fd', border: '#1e88e5' },
  amber: { bg: '#fff3e0', border: '#ffb74d' },
  green: { bg: '#e8f5e9', border: '#43a047' },
  coral: { bg: '#ffdddd', border: '#e88d8d' },
  lilac: { bg: '#f3e5f5', border: '#8e24aa' },
  cell: { bg: '#fbf7ee', border: '#d9cfbc' },
  paper: { bg: PAPER, border: INK },
};

/** The two pastel marks still kept, for the footer. */
const doodlePaths = {
  arcs: {
    d: 'M3 4 C 12 7, 20 14, 39 15 M4 9 C 14 13, 23 19, 38 19',
    ink: '#d5d0ff',
  },
  smile: { d: 'M2 4 C 10 15, 23 16, 32 4', ink: '#ffc2bd' },
};

const esc = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const round = (n) => Math.round(n * 100) / 100;

/** Flatten a roughjs drawable into SVG path elements. */
const emit = (drawable) => {
  const o = drawable.options;
  return drawable.sets
    .map((set) => {
      const d = gen.opsToPath(set);
      if (!d) return '';
      if (set.type === 'fillPath') {
        return `<path d="${d}" fill="${o.fill}" stroke="none"/>`;
      }
      if (set.type === 'fillSketch') {
        const w = o.fillWeight > 0 ? o.fillWeight : o.strokeWidth / 2;
        return `<path d="${d}" fill="none" stroke="${o.fill}" stroke-width="${round(w)}"/>`;
      }
      return `<path d="${d}" fill="none" stroke="${o.stroke}" stroke-width="${round(o.strokeWidth)}"/>`;
    })
    .join('');
};

const sketch = {
  rect: (x, y, w, h, options) => emit(gen.rectangle(x, y, w, h, options)),
  path: (d, options) => emit(gen.path(d, options)),
  curve: (points, options) => emit(gen.curve(points, options)),
  line: (x1, y1, x2, y2, options) => emit(gen.line(x1, y1, x2, y2, options)),
};

const asset = (path) => new URL(path, import.meta.url);

/** Comic Neue, subset to the glyphs used here (see readme in the header). */
const fontFace = (() => {
  const base64 = readFileSync(
    asset('assets/comic-neue-700.subset.woff2')
  ).toString('base64');
  return `@font-face{font-family:'Comic Neue';font-weight:700;font-style:normal;src:url(data:font/woff2;base64,${base64}) format('woff2');}`;
})();

const dataUri = (path, mime) =>
  `data:${mime};base64,${readFileSync(asset(path)).toString('base64')}`;

const HAND = "'Comic Neue','Comic Sans MS','Chalkboard SE',cursive";

const text = (value, x, y, { size, fill = INK, anchor = 'start', opacity }) =>
  `<text x="${x}" y="${y}" font-family="${HAND}" font-weight="700" font-size="${size}" fill="${fill}"${
    anchor === 'start' ? '' : ` text-anchor="${anchor}"`
  }${opacity ? ` opacity="${opacity}"` : ''}>${esc(value)}</text>`;

/** Comic Neue runs narrow; close enough to place pills and swashes. */
const textWidth = (value, size) => value.length * size * 0.5;

const doc = (width, height, title, body) =>
  [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}">`,
    `<title>${esc(title)}</title>`,
    `<style>${fontFace}</style>`,
    body,
    '</svg>',
  ].join('');

const doodle = (name, x, y, scale, seed) => {
  const { d, ink } = doodlePaths[name];
  return `<g transform="translate(${x} ${y}) scale(${scale})">${sketch.path(d, {
    seed,
    roughness: 1.5,
    stroke: ink,
    strokeWidth: 2.4,
  })}</g>`;
};

/** The paper sheet every piece of art sits on. */
const sheet = (w, h, seed) =>
  sketch.rect(6, 6, w - 12, h - 12, {
    seed,
    roughness: 1.5,
    bowing: 1.1,
    stroke: PAPER_LINE,
    strokeWidth: 2,
    fill: PAPER,
    fillStyle: 'solid',
  });

/** The blue swash the site draws under its name. */
const swash = (x, y, width, color, seed, strokeWidth = 6) =>
  sketch.curve(
    [
      [x, y + 4],
      [x + width * 0.34, y - 4],
      [x + width * 0.68, y + 8],
      [x + width, y],
    ],
    { seed, roughness: 1.9, stroke: color, strokeWidth }
  );

/* ------------------------------------------------------------------ banner */

const BANNER_W = 880;
const BANNER_H = 300;

const tagPills = (labels, x, y, seed) => {
  let cursor = x;
  return labels
    .map((label, i) => {
      const size = 17;
      const w = textWidth(label, size) + 30;
      const pill = sketch.rect(cursor, y, w, 32, {
        seed: seed + i * 13,
        roughness: 1.7,
        bowing: 1.4,
        stroke: PENCIL,
        strokeWidth: 1.6,
      });
      const caption = text(label, cursor + w / 2, y + 22, {
        size,
        fill: PENCIL,
        anchor: 'middle',
      });
      cursor += w + 12;
      return pill + caption;
    })
    .join('');
};

const banner = (seed) => {
  const title = "Hello, I'm Bolt Guo.";
  const titleSize = 50;
  const x = 52;
  const titleY = 98;

  // Miku, drawn by hand and carried inside the file
  const mikuW = 232;
  const mikuH = Math.round((mikuW * 567) / 640);
  const mikuX = BANNER_W - mikuW - 46;
  const mikuY = Math.round((BANNER_H - mikuH) / 2) + 6;

  return doc(
    BANNER_W,
    BANNER_H,
    "Hello, I'm Bolt Guo — I don't take notes, I build them.",
    [
      sheet(BANNER_W, BANNER_H, seed),
      `<image href="${dataUri('../public/images/hero-miku.webp', 'image/webp')}" x="${mikuX}" y="${mikuY}" width="${mikuW}" height="${mikuH}"/>`,
      text(title, x, titleY, { size: titleSize }),
      swash(
        x - 4,
        titleY + 12,
        textWidth(title, titleSize),
        accents.blue,
        seed + 3
      ),
      text("I don't take notes. I build them.", x, titleY + 56, {
        size: 24,
        fill: PENCIL,
      }),
      text('Frontend developer and independent builder.', x, titleY + 88, {
        size: 17,
        fill: PENCIL,
        opacity: 0.85,
      }),
      text('Curiosity or annoyance in, the smallest useful', x, titleY + 110, {
        size: 17,
        fill: PENCIL,
        opacity: 0.85,
      }),
      text('version of it out.', x, titleY + 132, {
        size: 17,
        fill: PENCIL,
        opacity: 0.85,
      }),
      tagPills(
        ['Frontend', 'Learning tools', 'Indie products'],
        x,
        titleY + 148,
        seed + 5
      ),
    ].join('')
  );
};

/* -------------------------------------------------------------------- card */

const CARD_W = 880;
const CARD_H = 108;
const NAME_X = 44;
const BODY_X = 256;
/** Every glyph draws inside the same 150 × 80 box on the right of a card. */
const GLYPH_X = 700;
const GLYPH_Y = 14;

const box = (x, y, w, h, t, seed, options) =>
  sketch.rect(x, y, w, h, {
    seed,
    roughness: 0.9,
    strokeWidth: 2,
    stroke: t.border,
    fill: t.bg,
    fillStyle: 'solid',
    ...options,
  });

/**
 * A shrunk-down version of the sketch the site draws for each project — the
 * same shapes, with everything that needs a second look taken out.
 */
const glyphs = {
  // the sorting trace, kept as one row of bars
  vizlearn: (seed) => {
    const base = 72;
    const bars = [
      [30, tone.blue],
      [48, tone.amber],
      [62, tone.amber],
      [36, tone.blue],
      [54, tone.green],
    ];
    return (
      bars
        .map(([h, t], i) => box(9 + i * 28, base - h, 20, h, t, seed + i))
        .join('') +
      sketch.line(4, base, 146, base, {
        seed: seed + 9,
        roughness: 1,
        stroke: INK,
        strokeWidth: 2.2,
      })
    );
  },
  // the kana chart, six cells with today's one filled in
  kotoplanet: (seed) =>
    Array.from({ length: 6 }, (_, i) => {
      const x = 9 + (i % 3) * 45;
      const y = 8 + Math.floor(i / 3) * 34;
      const active = i === 0;
      const stroke = active ? PAPER : PENCIL;
      return [
        box(x, y, 38, 28, active ? tone.coral : tone.cell, seed + i, {
          fill: active ? tone.coral.border : tone.cell.bg,
        }),
        sketch.path(`M${x + 9} ${y + 10} L${x + 29} ${y + 10}`, {
          seed: seed + 20 + i,
          roughness: 1.1,
          stroke,
          strokeWidth: 2.1,
        }),
        sketch.path(
          `M${x + 20} ${y + 6} C${x + 18} ${y + 14}, ${x + 15} ${y + 18}, ${x + 11} ${y + 22}`,
          {
            seed: seed + 40 + i,
            roughness: 1.1,
            stroke,
            strokeWidth: 2.1,
          }
        ),
      ].join('');
    }).join(''),
  // a lock screen with a QR on it, down to its three eyes
  codepin: (seed) => {
    const px = 43;
    const py = 2;
    const parts = [
      box(px, py, 64, 76, tone.paper, seed, { strokeWidth: 2.4 }),
      sketch.rect(px + 21, py + 8, 22, 6, {
        seed: seed + 1,
        roughness: 0.8,
        stroke: PENCIL,
        strokeWidth: 1.4,
        fill: PENCIL,
        fillStyle: 'solid',
      }),
    ];
    [
      [8, 26],
      [41, 26],
      [8, 51],
    ].forEach(([dx, dy], i) => {
      parts.push(box(px + dx, py + dy, 15, 15, tone.amber, seed + 3 + i));
    });
    [
      [27, 30],
      [43, 53],
      [29, 62],
    ].forEach(([dx, dy], i) => {
      parts.push(
        box(px + dx, py + dy, 8, 8, tone.amber, seed + 7 + i, {
          fill: tone.amber.border,
          strokeWidth: 1.4,
        })
      );
    });
    return parts.join('');
  },
  // a stack of packs, the top one opened
  aouo: (seed) => {
    const packs = [16, 26, 36].map((x, i) =>
      box(
        x,
        34 - i * 10,
        84,
        40,
        i === 2 ? tone.lilac : tone.cell,
        seed + i,
        i === 2 ? undefined : { stroke: PENCIL, strokeWidth: 1.8 }
      )
    );
    return (
      packs.join('') +
      [
        [46, 30, 110],
        [46, 42, 90],
      ]
        .map(([x1, y, x2], i) =>
          sketch.line(x1, y, x2, y, {
            seed: seed + 11 + i,
            roughness: 1.1,
            stroke: tone.lilac.border,
            strokeWidth: 2.2,
          })
        )
        .join('')
    );
  },
};

/** One project, laid out like a row torn off the workbench. */
const card = ({ slug, name, line, meta, accent }, seed) => {
  const nameSize = 27;
  return doc(
    CARD_W,
    CARD_H,
    `${name} — ${line}`,
    [
      sheet(CARD_W, CARD_H, seed),
      `<g transform="translate(${GLYPH_X} ${GLYPH_Y})">${glyphs[slug](seed + 41)}</g>`,
      text(name, NAME_X, 52, { size: nameSize }),
      swash(
        NAME_X - 3,
        62,
        textWidth(name, nameSize),
        accents[accent],
        seed + 7,
        5
      ),
      text(line, BODY_X, 47, { size: 19 }),
      text(meta, BODY_X, 75, { size: 15, fill: PENCIL }),
    ].join('')
  );
};

/* ------------------------------------------------------------------- stack */

/** The stack, as a row of pencil-drawn pills instead of code chips. */
const stack = (labels, seed) => {
  const size = 17;
  const gap = 11;
  // narrow enough that the pills break into two balanced rows rather than
  // stranding one word on a line of its own
  const wrapAt = 470;
  const rows = [];
  let row = [];
  let width = 0;
  for (const label of labels) {
    const w = textWidth(label, size) + 30;
    if (width + w > wrapAt && row.length) {
      rows.push(row);
      row = [];
      width = 0;
    }
    row.push({ label, w });
    width += w + gap;
  }
  if (row.length) rows.push(row);

  const height = 26 + rows.length * 44;
  const body = rows
    .map((cells, r) => {
      const rowWidth =
        cells.reduce((sum, cell) => sum + cell.w, 0) + gap * (cells.length - 1);
      let cursor = (CARD_W - rowWidth) / 2;
      return cells
        .map(({ label, w }, i) => {
          const y = 13 + r * 44;
          const pill = sketch.rect(cursor, y, w, 32, {
            seed: seed + r * 31 + i * 13,
            roughness: 1.7,
            bowing: 1.4,
            stroke: PENCIL,
            strokeWidth: 1.6,
          });
          const caption = text(label, cursor + w / 2, y + 22, {
            size,
            fill: PENCIL,
            anchor: 'middle',
          });
          cursor += w + gap;
          return pill + caption;
        })
        .join('');
    })
    .join('');

  return doc(CARD_W, height, labels.join(', '), body);
};

/* ------------------------------------------------------------------ footer */

/** Anya, and the line she gets to say. */
const footer = (seed) => {
  const w = 560;
  const h = 148;
  const anyaW = 84;
  const anyaH = Math.round((anyaW * 720) / 480);
  return doc(
    w,
    h,
    'A small annoyance has entered the workbench. Waku waku.',
    [
      sheet(w, h, seed),
      doodle('smile', 494, 34, 1.1, seed + 19),
      doodle('arcs', 156, 108, 1.2, seed + 29),
      `<image href="${dataUri('../public/images/hero-anya.webp', 'image/webp')}" x="40" y="${Math.round((h - anyaH) / 2)}" width="${anyaW}" height="${anyaH}"/>`,
      text('A small annoyance has entered', 156, 62, {
        size: 21,
        fill: PENCIL,
      }),
      text('the workbench. Waku waku.', 156, 92, { size: 21, fill: PENCIL }),
    ].join('')
  );
};

/* -------------------------------------------------------------------- main */

const projects = [
  {
    slug: 'vizlearn',
    name: 'VizLearn',
    line: 'a debugger you can actually read',
    meta: '70+ lessons · code, canvas and logs move together',
    accent: 'blue',
  },
  {
    slug: 'kotoplanet',
    name: 'KotoPlanet',
    line: 'formerly KanaPlanet — it outgrew the kana',
    meta: 'N5–N1 · 13K+ items · 20K+ audio · AI + MCP',
    accent: 'coral',
  },
  {
    slug: 'codepin',
    name: 'CodePin',
    line: 'QR codes that live on the Lock Screen',
    meta: 'iOS · Live Activity · never leaves your device',
    accent: 'amber',
  },
  {
    slug: 'aouo',
    name: 'AOUO',
    line: 'local-first agent apps, one .aouo pack each',
    meta: 'pre-alpha · skills, memory, schedules, its own UI',
    accent: 'lilac',
  },
];

const flag = process.argv.indexOf('--seed');
const seed =
  flag === -1
    ? Math.floor(Date.now() / 86_400_000) % 100_000
    : Number(process.argv[flag + 1]);

const outDir = asset('../readme/');
mkdirSync(outDir, { recursive: true });

const files = [
  ['banner.svg', banner(seed)],
  ...projects.map((project, i) => [
    `card-${project.slug}.svg`,
    card(project, seed + i * 101),
  ]),
  [
    'stack.svg',
    stack(
      [
        'TypeScript',
        'React',
        'Vue',
        'Astro',
        'Expo',
        'Cloudflare',
        'SQLite',
        'Go',
        'iOS',
        'local-first',
      ],
      seed + 17
    ),
  ],
  ['footer.svg', footer(seed + 29)],
];

for (const [name, svg] of files) {
  writeFileSync(new URL(name, outDir), svg);
  console.log(`readme/${name}  ${(svg.length / 1024).toFixed(1)} KB`);
}
console.log(`seed ${seed}`);
