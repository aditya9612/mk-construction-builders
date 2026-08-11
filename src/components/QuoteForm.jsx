import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '../data/company'

const STORAGE_KEY = 'mk_quote_requests'

export default function QuoteForm() {
  const location = useLocation()
  const prefill = location.state || {}

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    projectType: prefill.calculator?.projectType || prefill.plan || '',
    projectLocation: '',
    constructionArea: prefill.calculator?.area || '',
    floors: prefill.calculator?.floors || '',
    startDate: '',
    budgetRange: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.fullName.trim() || !form.mobile.trim() || !form.projectType.trim() || !form.projectLocation.trim()) {
      setError('Please fill all required fields marked with *.')
      return
    }

    setStatus('loading')
    const payload = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      source: 'request-quote',
    }

    try {
      // Future FastAPI integration:
      // await fetch(`${import.meta.env.VITE_API_URL}/api/quotes`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // })
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      existing.push(payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
      setStatus('success')
    } catch {
      setStatus('idle')
      setError('Something went wrong while saving your request.')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gold-500/40 bg-white p-8 md:p-10 text-center">
        <h3 className="font-display text-3xl text-navy-900">Request received</h3>
        <p className="mt-4 text-navy-700/80 leading-relaxed max-w-xl mx-auto">
          Thank you for contacting {company.name}. Our team will get back to you.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200 p-5 sm:p-6 md:p-8 space-y-4 rounded-[14px] sm:rounded-none"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name *" value={form.fullName} onChange={(v) => update('fullName', v)} />
        <Input label="Mobile Number *" value={form.mobile} onChange={(v) => update('mobile', v)} type="tel" />
        <Input label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
        <Input label="Project Type *" value={form.projectType} onChange={(v) => update('projectType', v)} />
        <Input label="Project Location *" value={form.projectLocation} onChange={(v) => update('projectLocation', v)} />
        <Input label="Construction Area" value={form.constructionArea} onChange={(v) => update('constructionArea', v)} />
        <Input label="Number of Floors" value={form.floors} onChange={(v) => update('floors', v)} />
        <Input label="Expected Start Date" value={form.startDate} onChange={(v) => update('startDate', v)} type="date" />
        <Input label="Budget Range" value={form.budgetRange} onChange={(v) => update('budgetRange', v)} />
      </div>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.16em] text-navy-700/60">Message</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="form-textarea"
        />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto btn-primary min-h-[50px] disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Quote Request'}
      </button>
    </form>
  )
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block min-w-0">
      <span className="text-[11px] uppercase tracking-[0.16em] text-navy-700/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
    </label>
  )
}
