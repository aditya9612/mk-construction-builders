import fs from 'fs'
import path from 'path'

function svg(title, subtitle, w = 1600, h = 1000) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#1a2d3f"/>
      <stop offset="45%" stop-color="#0d1a26"/>
      <stop offset="100%" stop-color="#070f18"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c4972f" stop-opacity="0"/>
      <stop offset="40%" stop-color="#d6b057" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c4972f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d6b057" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#d6b057" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <g opacity="0.12" stroke="#d6b057" stroke-width="1" fill="none">
    <path d="M0 220 H1600 M0 420 H1600 M0 640 H1600"/>
    <path d="M220 0 V1000 M520 0 V1000 M820 0 V1000 M1120 0 V1000 M1420 0 V1000"/>
  </g>
  <g opacity="0.55" fill="#0a1420">
    <path d="M0 1000 V560 H160 V420 H280 V560 H360 V380 H520 V560 H620 V500 H760 V300 H980 V560 H1080 V460 H1260 V560 H1380 V400 H1600 V1000 Z"/>
  </g>
  <g opacity="0.35" fill="url(#glass)">
    <rect x="780" y="330" width="48" height="120"/>
    <rect x="850" y="330" width="48" height="120"/>
    <rect x="920" y="330" width="48" height="120"/>
    <rect x="160" y="450" width="36" height="90"/>
    <rect x="210" y="450" width="36" height="90"/>
    <rect x="390" y="410" width="36" height="100"/>
    <rect x="440" y="410" width="36" height="100"/>
  </g>
  <g opacity="0.45" fill="none" stroke="#d6b057" stroke-width="1.5">
    <path d="M760 560 V300 H980 V560"/>
    <path d="M760 300 L870 220 L980 300"/>
    <path d="M360 560 V380 H520 V560"/>
    <path d="M1380 560 V400 H1600"/>
  </g>
  <rect x="0" y="${h * 0.78}" width="${w}" height="2" fill="url(#gold)"/>
  <text x="72" y="120" fill="#f8f6f2" font-family="Georgia, serif" font-size="42" font-weight="600">${title}</text>
  <text x="72" y="158" fill="#d6b057" font-family="Arial, sans-serif" font-size="14" letter-spacing="4">${subtitle}</text>
</svg>`
}

const files = [
  ['public/images/hero.svg', 'Building Dreams', 'MK CONSTRUCTION & BUILDERS'],
  ['public/images/founder.svg', 'Mr. Milind Kumawat', 'FOUNDER & CEO'],
  ['public/images/about.svg', 'MK Construction', 'TRUST · QUALITY · ON-TIME'],
  ['public/images/quality.svg', 'Quality First', '300+ QUALITY CHECKS'],
  ['public/images/contact.svg', 'Start Your Project', 'PUNE'],
]

for (let i = 1; i <= 11; i++) {
  const n = String(i).padStart(2, '0')
  files.push([`public/images/projects/project-${n}.svg`, `Project ${n}`, 'PUNE'])
}
for (let i = 1; i <= 8; i++) {
  const n = String(i).padStart(2, '0')
  files.push([`public/images/gallery/gallery-${n}.svg`, `Gallery ${n}`, 'SITE & PROJECTS'])
}
;[
  'residential',
  'commercial',
  'bungalow',
  'house',
  'renovation',
  'interior',
  'rcc',
  'structural',
  'planning',
].forEach((s) => {
  files.push([
    `public/images/services/${s}.svg`,
    s.replace(/-/g, ' ').toUpperCase(),
    'SERVICE',
  ])
})
;['1bhk', '2bhk', '3bhk', '4bhk', 'duplex', 'bungalow'].forEach((s) => {
  files.push([`public/images/plans/${s}.svg`, s.toUpperCase(), 'HOUSE PLAN'])
})

files.forEach(([file, title, sub]) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, svg(title, sub))
})

console.log(`Updated ${files.length} architectural placeholders`)
