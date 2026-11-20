import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  Star,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { submitPublicReview, validateCustomerPhoto } from '../api/customerFeedback'

const RATING_DESCRIPTIONS = {
  1: '1 Star – Poor',
  2: '2 Stars – Fair',
  3: '3 Stars – Good',
  4: '4 Stars – Very Good',
  5: '5 Stars – Outstanding',
}

export default function ReviewFormModal({ isOpen, onClose, onSuccess }) {
  const [customerName, setCustomerName] = useState('')
  const [customerLocation, setCustomerLocation] = useState('')
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')
  const [customerPhoto, setCustomerPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [honeypot, setHoneypot] = useState('')

  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const fileInputRef = useRef(null)
  const previewUrlRef = useRef(null)

  // Cleanup object URL
  const clearPhotoPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setPhotoPreview(null)
  }, [])

  const handleRemovePhoto = useCallback(() => {
    clearPhotoPreview()
    setCustomerPhoto(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [clearPhotoPreview])

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateCustomerPhoto(file)
    if (!validation.valid) {
      setFieldErrors((prev) => ({ ...prev, photo: validation.error }))
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next.photo
      return next
    })

    clearPhotoPreview()
    const url = URL.createObjectURL(file)
    previewUrlRef.current = url
    setPhotoPreview(url)
    setCustomerPhoto(file)
  }

  // Reset form
  const resetForm = useCallback(() => {
    setCustomerName('')
    setCustomerLocation('')
    setRating(5)
    setHoveredRating(0)
    setReviewTitle('')
    setReviewMessage('')
    handleRemovePhoto()
    setHoneypot('')
    setFieldErrors({})
    setFormError('')
    setSubmitting(false)
    setSuccessMessage('')
  }, [handleRemovePhoto])

  // Handle Close
  const handleClose = useCallback(() => {
    if (submitting) return
    resetForm()
    onClose()
  }, [submitting, resetForm, onClose])

  // Lock scroll and listen for escape
  useEffect(() => {
    if (!isOpen) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) {
        handleClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, submitting, handleClose])

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  // Validate form
  const validate = () => {
    const errors = {}

    const trimmedName = customerName.trim()
    if (!trimmedName) {
      errors.customerName = 'Please enter your full name.'
    } else if (/<[^>]*script/i.test(trimmedName)) {
      errors.customerName = 'Name contains invalid characters.'
    } else if (trimmedName.length > 100) {
      errors.customerName = 'Name cannot exceed 100 characters.'
    }

    const trimmedLocation = customerLocation.trim()
    if (!trimmedLocation) {
      errors.customerLocation = 'Please enter your location (e.g. Baner, Pune).'
    } else if (trimmedLocation.length > 100) {
      errors.customerLocation = 'Location cannot exceed 100 characters.'
    }

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = 'Please select a star rating between 1 and 5.'
    }

    const trimmedMessage = reviewMessage.trim()
    if (!trimmedMessage) {
      errors.reviewMessage = 'Please write your review feedback.'
    } else if (trimmedMessage.length < 10) {
      errors.reviewMessage = 'Review message must be at least 10 characters.'
    } else if (trimmedMessage.length > 2000) {
      errors.reviewMessage = 'Review message cannot exceed 2000 characters.'
    }

    if (reviewTitle && reviewTitle.trim().length > 150) {
      errors.reviewTitle = 'Title cannot exceed 150 characters.'
    }

    if (customerPhoto) {
      const photoCheck = validateCustomerPhoto(customerPhoto)
      if (!photoCheck.valid) {
        errors.photo = photoCheck.error
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!validate()) {
      return
    }

    setSubmitting(true)

    try {
      const response = await submitPublicReview({
        customerName,
        customerLocation,
        rating,
        reviewTitle,
        reviewMessage,
        customerPhoto,
        honeypot,
      })

      const msg =
        response?.message ||
        'Thank you! Your review has been submitted and published successfully.'
      setSuccessMessage(msg)

      if (typeof onSuccess === 'function') {
        onSuccess(response?.data)
      }

      // Close automatically after 2.5 seconds
      setTimeout(() => {
        handleClose()
      }, 2500)
    } catch (err) {
      setSubmitting(false)

      // Handle field-specific errors if returned in payload
      if (err.payload?.errors && Array.isArray(err.payload.errors)) {
        const backendErrors = {}
        err.payload.errors.forEach((eItem) => {
          if (eItem.field === 'customer_name') backendErrors.customerName = eItem.message
          if (eItem.field === 'customer_location') backendErrors.customerLocation = eItem.message
          if (eItem.field === 'rating') backendErrors.rating = eItem.message
          if (eItem.field === 'review_message') backendErrors.reviewMessage = eItem.message
          if (eItem.field === 'review_title') backendErrors.reviewTitle = eItem.message
          if (eItem.field === 'customer_photo') backendErrors.photo = eItem.message
        })
        if (Object.keys(backendErrors).length > 0) {
          setFieldErrors((prev) => ({ ...prev, ...backendErrors }))
        }
      }

      setFormError(
        err.message || 'Unable to submit your review at this time. Please try again.',
      )
    }
  }

  const activeRating = hoveredRating || rating

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-form-title"
          className="fixed inset-0 z-[10050] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-white border border-stone-200/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600 block mb-1">
                  Verified Client Feedback
                </span>
                <h3
                  id="review-form-title"
                  className="font-display text-2xl sm:text-[26px] font-semibold text-navy-900 leading-tight"
                >
                  Write a Customer Review
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="w-10 h-10 rounded-full flex items-center justify-center text-navy-700/60 hover:text-navy-900 hover:bg-stone-100 transition-colors disabled:opacity-40"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto">
              {successMessage ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 animate-in fade-in zoom-in duration-300">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-2xl font-semibold text-navy-900">
                    Review Published!
                  </h4>
                  <p className="mt-2 text-sm text-navy-700/80 max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                  <p className="mt-1 text-xs text-navy-700/60">
                    Your review is now live on our website for other homeowners to see.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 btn-primary min-h-11 px-7 text-xs font-semibold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* General Form Error Alert */}
                  {formError && (
                    <div
                      role="alert"
                      className="border border-rose-200 bg-rose-50/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-rose-800"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      <div className="flex-1 leading-relaxed">{formError}</div>
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-2">
                      Your Rating <span className="text-gold-600">*</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-label="Star Rating"
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            role="radio"
                            aria-checked={rating === star}
                            aria-label={`${star} star`}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1 rounded-md hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                star <= activeRating
                                  ? 'text-gold-500 fill-gold-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-navy-800 ml-2">
                        {RATING_DESCRIPTIONS[activeRating]}
                      </span>
                    </div>
                    {fieldErrors.rating && (
                      <p className="mt-1 text-xs text-rose-600">{fieldErrors.rating}</p>
                    )}
                  </div>

                  {/* Customer Name & Location (2-columns on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="customer_name"
                        className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5"
                      >
                        Your Name <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="customer_name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        maxLength={100}
                        disabled={submitting}
                        className={`w-full bg-stone-50 border rounded-lg px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-700/40 focus:outline-none focus:bg-white transition-colors ${
                          fieldErrors.customerName
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-stone-200 focus:border-gold-500'
                        }`}
                      />
                      {fieldErrors.customerName && (
                        <p className="mt-1 text-xs text-rose-600">{fieldErrors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="customer_location"
                        className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5"
                      >
                        Your Location <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="customer_location"
                        type="text"
                        value={customerLocation}
                        onChange={(e) => setCustomerLocation(e.target.value)}
                        placeholder="e.g. Baner, Pune"
                        maxLength={100}
                        disabled={submitting}
                        className={`w-full bg-stone-50 border rounded-lg px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-700/40 focus:outline-none focus:bg-white transition-colors ${
                          fieldErrors.customerLocation
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-stone-200 focus:border-gold-500'
                        }`}
                      />
                      {fieldErrors.customerLocation && (
                        <p className="mt-1 text-xs text-rose-600">
                          {fieldErrors.customerLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Review Title (Optional) */}
                  <div>
                    <label
                      htmlFor="review_title"
                      className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5"
                    >
                      Review Title <span className="text-navy-700/40 normal-case font-normal">(Optional)</span>
                    </label>
                    <input
                      id="review_title"
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Outstanding bungalow construction in Pune"
                      maxLength={150}
                      disabled={submitting}
                      className={`w-full bg-stone-50 border rounded-lg px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-700/40 focus:outline-none focus:bg-white transition-colors ${
                        fieldErrors.reviewTitle
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-gold-500'
                      }`}
                    />
                    {fieldErrors.reviewTitle && (
                      <p className="mt-1 text-xs text-rose-600">{fieldErrors.reviewTitle}</p>
                    )}
                  </div>

                  {/* Review Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="review_message"
                        className="block text-xs font-semibold text-navy-900 uppercase tracking-wider"
                      >
                        Review Message <span className="text-gold-600">*</span>
                      </label>
                      <span className="text-[11px] text-navy-700/50">
                        {reviewMessage.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="review_message"
                      rows={4}
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                      placeholder="Share your experience regarding construction quality, timeline, team communication, and overall handover..."
                      maxLength={2000}
                      disabled={submitting}
                      className={`w-full bg-stone-50 border rounded-lg px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-700/40 focus:outline-none focus:bg-white transition-colors resize-y leading-relaxed ${
                        fieldErrors.reviewMessage
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-gold-500'
                      }`}
                    />
                    {fieldErrors.reviewMessage && (
                      <p className="mt-1 text-xs text-rose-600">{fieldErrors.reviewMessage}</p>
                    )}
                  </div>

                  {/* Customer Photo Upload (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5">
                      Customer Profile Photo{' '}
                      <span className="text-navy-700/40 normal-case font-normal">(Optional)</span>
                    </label>

                    {photoPreview ? (
                      <div className="flex items-center justify-between p-3 border border-stone-200 rounded-xl bg-stone-50">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={photoPreview}
                            alt="Selected avatar preview"
                            className="w-12 h-12 rounded-full object-cover border border-stone-300 aspect-square shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-navy-900 truncate">
                              {customerPhoto?.name}
                            </p>
                            <p className="text-[11px] text-navy-700/50">
                              {(customerPhoto?.size ? customerPhoto.size / 1024 : 0).toFixed(0)} KB
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={submitting}
                            className="px-2.5 py-1 text-xs font-medium border border-stone-200 rounded-md hover:border-gold-500 hover:text-gold-600 bg-white transition-colors disabled:opacity-40"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            disabled={submitting}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-40"
                            aria-label="Remove photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-stone-300 hover:border-gold-500 rounded-xl p-4 flex items-center gap-3.5 cursor-pointer bg-stone-50 hover:bg-stone-50/70 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600 shrink-0">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-navy-900">
                            Upload a profile photo
                          </p>
                          <p className="text-[11px] text-navy-700/50 mt-0.5">
                            JPG, PNG, or WEBP up to 5 MB
                          </p>
                        </div>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      disabled={submitting}
                      className="hidden"
                    />

                    {fieldErrors.photo && (
                      <p className="mt-1 text-xs text-rose-600">{fieldErrors.photo}</p>
                    )}
                  </div>

                  {/* Hidden Honeypot Field (traps spambots) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={submitting}
                      className="px-5 py-2.5 text-xs font-medium text-navy-700 hover:text-navy-900 rounded-lg transition-colors disabled:opacity-40"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary min-h-11 px-6 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Publishing Review...</span>
                        </>
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
