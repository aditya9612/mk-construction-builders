import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { ApiError } from '../api/client'
import {
  createEnquiry,
  isValidIndianMobile,
  normalizeIndianMobile,
} from '../api/enquiries'
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

const FIELD_LIMITS = {
  name: 200,
  projectType: 120,
  location: 255,
  area: 120,
  message: 4000,
}

const API_FIELD_TO_FORM = {
  name: 'name',
  mobile: 'mobile',
  email: 'email',
  project_type: 'projectType',
  location: 'location',
  construction_area: 'area',
  message: 'message',
}

const SUCCESS_TEXT = 'Thank you. We will contact you soon.'
const RATE_LIMIT_TEXT = 'Please wait before submitting again.'
const GENERIC_SUBMIT_ERROR = 'Could not submit. Please try again.'

function validateClient(form) {
  const errors = {}
  const name = form.name.trim()
  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`
  }

  const mobile = normalizeIndianMobile(form.mobile)
  if (!isValidIndianMobile(mobile)) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (form.projectType.trim().length > FIELD_LIMITS.projectType) {
    errors.projectType = `Project type must be ${FIELD_LIMITS.projectType} characters or fewer.`
  }
  if (form.location.trim().length > FIELD_LIMITS.location) {
    errors.location = `Location must be ${FIELD_LIMITS.location} characters or fewer.`
  }
  if (form.area.trim().length > FIELD_LIMITS.area) {
    errors.area = `Construction area must be ${FIELD_LIMITS.area} characters or fewer.`
  }
  if (form.message.trim().length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`
  }

  return errors
}

function fieldErrorsFromPayload(payload) {
  const errors = {}
  const list = payload?.errors
  if (!Array.isArray(list)) return errors
  list.forEach((item) => {
    const formKey = API_FIELD_TO_FORM[item?.field]
    if (!formKey || errors[formKey]) return
    errors[formKey] = item.message || 'Invalid value.'
  })
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    setError('')
    const clientErrors = validateClient(form)
    if (Object.keys(clientErrors).length) {
      setFieldErrors(clientErrors)
      return
    }

    setFieldErrors({})
    setStatus('loading')

    try {
      await createEnquiry(form)
      setForm(initial)
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      const statusCode = err instanceof ApiError ? err.status : 0
      if (statusCode === 429) {
        setError(RATE_LIMIT_TEXT)
        return
      }
      if (statusCode === 422) {
        const mapped = fieldErrorsFromPayload(err.payload)
        setFieldErrors(mapped)
        setError(
          Object.keys(mapped).length
            ? ''
            : err.message || 'Validation failed',
        )
        return
      }
      setError(GENERIC_SUBMIT_ERROR)
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
      <div className="border border-gold-500/40 bg-stone-50 p-6 sm:p-8 text-center rounded-[14px] sm:rounded-none">
        <h3 className="font-display text-2xl text-navy-900">Thank you</h3>
        <p className="mt-3 text-navy-700/80 leading-relaxed text-[15px]">
          {SUCCESS_TEXT}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 min-h-11 text-sm text-gold-600 hover:text-gold-500"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const submitting = status === 'loading'

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Name *"
          value={form.name}
          onChange={(v) => update('name', v)}
          error={fieldErrors.name}
          maxLength={FIELD_LIMITS.name}
          autoComplete="name"
        />
        <Field
          label="Mobile *"
          value={form.mobile}
          onChange={(v) => update('mobile', v)}
          type="tel"
          error={fieldErrors.mobile}
          autoComplete="tel"
        />
        <Field
          label="Email"
          value={form.email}
          onChange={(v) => update('email', v)}
          type="email"
          error={fieldErrors.email}
          autoComplete="email"
        />
        <Field
          label="Project Type"
          value={form.projectType}
          onChange={(v) => update('projectType', v)}
          error={fieldErrors.projectType}
          maxLength={FIELD_LIMITS.projectType}
        />
        <Field
          label="Location"
          value={form.location}
          onChange={(v) => update('location', v)}
          error={fieldErrors.location}
          maxLength={FIELD_LIMITS.location}
        />
        <Field
          label="Construction Area"
          value={form.area}
          onChange={(v) => update('area', v)}
          error={fieldErrors.area}
          maxLength={FIELD_LIMITS.area}
        />
      </div>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.16em] text-navy-700/60">
          Message
        </span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="form-textarea"
          maxLength={FIELD_LIMITS.message}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-700">{fieldErrors.message}</p>
        )}
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-dark w-full min-h-[50px] disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit Enquiry'}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 border border-stone-200 min-h-[50px] px-6 py-3.5 text-[12px] uppercase tracking-[0.12em] hover:border-gold-500 hover:text-gold-600 transition"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <a
            href={`tel:${company.phone}`}
            className="inline-flex items-center justify-center gap-2 border border-stone-200 min-h-[50px] px-6 py-3.5 text-[12px] uppercase tracking-[0.12em] hover:border-gold-500 hover:text-gold-600 transition"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  error,
  maxLength,
  autoComplete,
}) {
  return (
    <label className="block min-w-0">
      <span className="text-[11px] uppercase tracking-[0.16em] text-navy-700/60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </label>
  )
}
