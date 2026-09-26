#!/usr/bin/env node
/*
 * Build-time per-post OG image generator.
 *
 * For every post in src/posts/, renders a 1200x630 PNG share card in the
 * site's brand gradient (matching the C8 site-wide OG design) with the post
 * title, and saves it to src/assets/og-posts/<slug>.png.
 *
 * Run automatically via `npm run build` (see package.json). New posts get
 * their card generated on the next build — no manual step needed.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');
const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'og-posts');
const W = 1200;
const H = 630;

const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function frontmatter(file) {
    const raw = fs.readFileSync(file, 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return m ? m[1] : '';
}

// Extract a simple frontmatter scalar: handles "quoted", 'quoted', or bare values.
function field(fm, name) {
    const m = fm.match(new RegExp(`^${name}:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|'((?:[^'\\\\]|\\\\.)*)'|(.+?))\\s*$`, 'm'));
    if (!m) return null;
    return (m[1] ?? m[2] ?? m[3]).trim();
}

function wrap(text, maxChars) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const w of words) {
        const next = line ? line + ' ' + w : w;
        if (next.length > maxChars && line) {
            lines.push(line);
            line = w;
        } else {
            line = next;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function svgFor(title, category) {
    let lines = wrap(title, 24).slice(0, 3);
    if (wrap(title, 24).length > 3) {
        lines[2] = lines[2].replace(/\s*\S*$/, '…');
    }
    const fontSize = lines.length > 2 ? 76 : 88;
    const lineHeight = Math.round(fontSize * 1.18);
    const firstBaseline = lines.length > 2 ? 290 : 300;

    const textEls = lines
        .map((l, i) => {
            const y = firstBaseline + i * lineHeight;
            return `<text x="90" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="#ffffff">${esc(l)}</text>`;
        })
        .join('\n    ');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6e35c4"/>
      <stop offset="1" stop-color="#b043c6"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="90" y="100" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="30" letter-spacing="8" fill="#ffffff" opacity="0.85">cerfly.net</text>
  <text x="90" y="152" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="24" letter-spacing="6" fill="#ffffff" opacity="0.6">${esc(category.toUpperCase())}</text>
    ${textEls}
  <line x1="90" y1="545" x2="210" y2="545" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <text x="90" y="592" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="24" letter-spacing="6" fill="#ffffff" opacity="0.7">cerfly.net</text>
</svg>`;
}

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
    if (!files.length) {
        console.log('og: no posts found, skipping');
        return;
    }
    for (const f of files) {
        const slug = f.replace(/\.md$/, '');
        const fm = frontmatter(path.join(POSTS_DIR, f));
        const title = field(fm, 'title') || slug;
        const category = field(fm, 'category') || 'Blog';
        const out = path.join(OUT_DIR, slug + '.png');
        await sharp(Buffer.from(svgFor(title, category))).png().toFile(out);
        console.log('og:', slug + '.png');
    }
}

main().catch((e) => {
    console.error('og: generation failed:', e.message);
    process.exit(1);
});
