import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/company'
import { getEnquiryMessage, isWhatsAppConfigured, openWhatsApp } from '../utils/whatsapp'

const initial = {
  name: '',
  mobile: '',
  email: '',
  projectType: '',
  location: '',
  area: '',
  message: '',
}

const STORAGE_KEY = 'mk_contact_enquiries'

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.mobile.trim()) {
      setError('Name and mobile number are required.')
      return
    }
    setStatus('loading')
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const entry = {
        ...form,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        // Ready for FastAPI: POST /api/enquiries
      }
      existing.push(entry)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
      setStatus('success')
      setForm(initial)
    } catch {
      setStatus('idle')
      setError('Unable to save enquiry locally. Please try again.')
    }
  }

  const handleWhatsApp = () => {
    if (!isWhatsAppConfigured()) {
      window.alert(`WhatsApp placeholder: ${company.whatsapp}`)
      return
    }
    openWhatsApp(
      getEnquiryMessage({
        name: form.name,
        projectType: form.projectType,
        location: form.location,
        area: form.area,
      }),
    )
  }

  if (status === 'success') {
    return (
      <div className="border border-gold-500/40 bg-stone-50 p-8 text-center">
        <h3 className="font-display text-2xl text-navy-900">Thank you</h3>
        <p className="mt-3 text-navy-700/80 leading-relaxed">
          Thank you for contacting {company.name}. Our team will get back to you.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-gold-600 hover:text-gold-500"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name *" value={form.name} onChange={(v) => update('name', v)} required />
        <Field
          label="Mobile *"
          value={form.mobile}
          onChange={(v) => update('mobile', v)}
          type="tel"
          required
        />
        <Field
          label="Email"
          value={form.email}
          onChange={(v) => update('email', v)}
          type="email"
        />
        <Field
          label="Project Type"
          value={form.projectType}
          onChange={(v) => update('projectType', v)}
        />
        <Field
          label="Location"
          value={form.location}
          onChange={(v) => update('location', v)}
        />
        <Field
          label="Construction Area"
          value={form.area}
          onChange={(v) => update('area', v)}
        />
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-wider text-navy-700/60">
          Message
        </span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="mt-2 w-full border border-stone-200 bg-stone-50 px-3.5 py-3.5 text-[14px] focus:outline-none focus:border-gold-500 transition"
        />
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-dark disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 border border-stone-200 px-6 py-3.5 text-[12px] uppercase tracking-[0.12em] hover:border-gold-500 hover:text-gold-600 transition"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
        <a
          href={`tel:${company.phone}`}
          className="inline-flex items-center justify-center gap-2 border border-stone-200 px-6 py-3.5 text-[12px] uppercase tracking-[0.12em] hover:border-gold-500 hover:text-gold-600 transition"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>
    </form>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-navy-700/60">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-stone-200 bg-stone-50 px-3.5 py-3.5 text-[14px] focus:outline-none focus:border-gold-500 transition"
      />
    </label>
  )
}
