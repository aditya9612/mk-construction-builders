import sharp from 'sharp'
import { mkdir, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assets =
  'C:/Users/Admin/.cursor/projects/c-Users-Admin-Desktop-MK-Construction/assets'
const outDir = path.join(root, 'public', 'images', 'gallery')

const mappings = [
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.41.12_PM-9e9b4922-37ba-4805-80a4-2a1c01a3ec17',
    name: 'mk-construction-pune-site-supervision-rebar',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.31.56_PM__3_-debcaf78-7036-4dce-a034-65d1b98c3c65',
    name: 'mk-construction-pune-modern-house-project',
    w: 1600,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.41.14_PM-6ad839db-0ff8-4c81-a1a5-49901693e180',
    name: 'mk-construction-pune-rcc-reinforcement-work',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.44.22_PM-0607495e-25ef-4811-b9c2-b57b1aea06c3',
    name: 'mk-construction-pune-client-project-handover-01',
    w: 1200,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.41.12_PM__2_-a70ddb97-484f-4c2e-abcf-32707bf373b1',
    name: 'mk-construction-pune-site-supervision-blueprints',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.44.29_PM-901aea37-eac3-401c-be16-9e358c505a99',
    name: 'mk-construction-pune-client-project-handover-02',
    w: 1200,
  },
  {
    id: 'WhatsApp_Image_2026-08-11_at_10.27.34_PM-2bff6425-6daa-4798-85de-64ca51e2fd8f',
    name: 'mk-construction-pune-under-construction-scaffolding',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-11_at_10.31.48_PM-6df44f74-20af-4525-bb92-b841d9850dd9',
    name: 'mk-construction-pune-site-inspection-building',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.31.57_PM__3_-8e879e28-82f1-486b-aa3e-82a9b53b8efc',
    name: 'mk-construction-pune-rcc-slab-evening',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.44.25_PM-481ccaa8-b865-4abd-9c42-d5e21700024e',
    name: 'mk-construction-pune-client-project-handover-03',
    w: 1200,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.31.57_PM__4_-a4330438-fd30-401b-9e99-57d05f289bbf',
    name: 'mk-construction-pune-modern-luxury-residential',
    w: 1600,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.41.12_PM__1_-3a34729a-b236-410b-b52e-1b225c534c3a',
    name: 'mk-construction-pune-rcc-formwork-rebar',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.31.56_PM__4_-c51b23ee-c881-4f29-b883-7e58ac613963',
    name: 'mk-construction-pune-under-construction-rcc-frame',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-11_at_10.31.51_PM-8defd46d-a2c8-4a7a-92bc-1328d4c947ad',
    name: 'mk-construction-pune-site-inspection-team',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.31.53_PM__2_-9e2b31bd-fd67-4614-b7b9-f9a1be142fe1',
    name: 'mk-construction-pune-completed-residential-building',
    w: 1600,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.41.11_PM__2_-ff7b6e7c-c17b-43a6-9998-a22ac08dfea0',
    name: 'mk-construction-pune-construction-site-supervision',
    w: 1400,
  },
  {
    id: 'WhatsApp_Image_2026-08-10_at_8.44.32_PM-8ae3fb2b-13ee-435a-af4b-73dd1e36201f',
    name: 'mk-construction-pune-client-project-handover-04',
    w: 1200,
  },
  {
    id: 'WhatsApp_Image_2026-08-11_at_10.27.26_PM-0e5b9bb3-1f65-415b-9537-24e2786655f0',
    name: 'mk-construction-pune-under-construction-masonry',
    w: 1400,
  },
]

async function findAsset(id) {
  const files = await readdir(assets)
  const match = files.find((f) => f.includes(id))
  if (!match) throw new Error(`Asset not found for ${id}`)
  return path.join(assets, match)
}

await mkdir(outDir, { recursive: true })

for (const { id, name, w } of mappings) {
  const input = await findAsset(id)
  const buffer = await readFile(input)
  const fullOut = path.join(outDir, `${name}.webp`)
  const thumbOut = path.join(outDir, `${name}-thumb.webp`)

  await sharp(buffer)
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(fullOut)

  await sharp(buffer)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 76, effort: 4 })
    .toFile(thumbOut)

  console.log('ok', name)
}

console.log('done', mappings.length, 'images')
