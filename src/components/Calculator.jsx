import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calculateEstimate, pricingConfig } from '../data/pricing'
import { formatCurrency } from '../utils/formatters'

const projectTypes = ['Residential', 'Commercial', 'Bungalow', 'House', 'Renovation']
const qualities = ['Basic', 'Standard', 'Premium']
const floorsOptions = [1, 2, 3, 4]

export default function Calculator() {
  const [form, setForm] = useState({
    projectType: 'Residential',
    area: '',
    quality: 'Standard',
    floors: 1,
  })

  const estimate = calculateEstimate({
    projectType: form.projectType,
    area: form.area,
    quality: form.quality,
    floors: form.floors,
  })

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="bg-white border border-stone-200 shadow-sm p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-navy-700/60">
            Project Type
          </span>
          <select
            value={form.projectType}
            onChange={(e) => update('projectType', e.target.value)}
            className="mt-2 w-full border border-stone-200 bg-stone-50 px-3 py-3 text-navy-900 focus:outline-none focus:border-gold-500"
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-navy-700/60">
            Construction Area (sq.ft)
          </span>
          <input
            type="number"
            min="0"
            value={form.area}
            onChange={(e) => update('area', e.target.value)}
            placeholder="e.g. 1200"
            className="mt-2 w-full border border-stone-200 bg-stone-50 px-3 py-3 text-navy-900 focus:outline-none focus:border-gold-500"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-navy-700/60">
            Quality Level
          </span>
          <select
            value={form.quality}
            onChange={(e) => update('quality', e.target.value)}
            className="mt-2 w-full border border-stone-200 bg-stone-50 px-3 py-3 text-navy-900 focus:outline-none focus:border-gold-500"
          >
            {qualities.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-navy-700/60">
            Number of Floors
          </span>
          <select
            value={form.floors}
            onChange={(e) => update('floors', Number(e.target.value))}
            className="mt-2 w-full border border-stone-200 bg-stone-50 px-3 py-3 text-navy-900 focus:outline-none focus:border-gold-500"
          >
            {floorsOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 border border-dashed border-gold-500/40 bg-stone-50 p-5">
        {estimate ? (
          <div>
            <p className="text-sm text-navy-700/70">Estimated quotation</p>
            <p className="font-display text-3xl text-navy-900 mt-1">
              {formatCurrency(estimate.total, estimate.currency)}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm uppercase tracking-wider text-gold-600 mb-2">
              {pricingConfig.note}
            </p>
            <p className="text-navy-800 leading-relaxed">
              {pricingConfig.estimateDisclaimer}
            </p>
            <p className="mt-3 text-sm text-navy-700/60">
              Calculator rates can be enabled later in{' '}
              <code className="text-xs bg-white px-1.5 py-0.5 border border-stone-200">
                src/data/pricing.js
              </code>
              .
            </p>
          </div>
        )}
      </div>

      <Link
        to="/request-quote"
        state={{ calculator: form }}
        className="mt-6 inline-flex w-full sm:w-auto justify-center bg-navy-900 hover:bg-navy-800 text-stone-50 px-6 py-3.5 text-sm font-medium transition"
      >
        Request Detailed Quote
      </Link>
    </div>
  )
}
