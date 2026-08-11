import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { getEnquiryMessage, isWhatsAppConfigured, openWhatsApp } from '../utils/whatsapp'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const handleWhatsApp = () => {
    if (!isWhatsAppConfigured()) {
      window.alert(`WhatsApp number placeholder: ${company.whatsapp}`)
      return
    }
    openWhatsApp(getEnquiryMessage())
  }

  return (
    <section className="hero-section relative flex items-end bg-navy-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={company.images.hero}
          alt="Modern residential construction project by MK Construction & Builders in Pune"
          className="h-full w-full object-cover object-center max-md:object-[center_30%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,16,0.55)_0%,rgba(5,10,16,0.72)_42%,rgba(5,10,16,0.94)_100%)] md:bg-[linear-gradient(105deg,rgba(5,10,16,0.92)_0%,rgba(5,10,16,0.72)_42%,rgba(5,10,16,0.35)_100%)]" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/20" />
        <div className="absolute inset-0 grain" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[8%] hidden lg:block w-px bg-gradient-to-b from-transparent via-gold-500/35 to-transparent"
      />

      <div className="hero-content relative z-10 container-arch w-full min-w-0">
        <div className="max-w-4xl min-w-0 w-full">
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 min-w-0"
          >
            <span className="arch-rule" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-gold-400/90 break-words">
              Pune · Maharashtra · Trust · Quality · On-Time
            </span>
          </motion.div>

          <motion.h1
            custom={0.22}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-full break-words text-balance"
          >
            <span className="block font-display text-[1.15rem] sm:text-xl md:text-3xl lg:text-4xl text-stone-50/95 font-medium tracking-[0.01em] mb-3 sm:mb-4 md:mb-3">
              {company.name}
            </span>
            <span className="hero-heading font-display text-stone-50 font-semibold block">
              Building Dreams,
              <br />
              <span className="text-gold-400 italic font-medium">Creating Futures.</span>
            </span>
          </motion.h1>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-sub mt-4 sm:mt-5 max-w-xl text-stone-300/95 leading-relaxed break-words"
          >
            {company.heroSubheading}
          </motion.p>

          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full"
          >
            <Link to="/projects" className="btn-primary w-full sm:w-auto min-h-[50px]">
              Explore our projects
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link to="/request-quote" className="btn-secondary w-full sm:w-auto min-h-[50px]">
              Get Free Quote
            </Link>
          </motion.div>

          <motion.div
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 hidden sm:flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-2 min-h-11 text-[12px] uppercase tracking-[0.16em] text-stone-300 hover:text-gold-400 transition"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              Call Now
            </a>
            <span className="hidden sm:inline h-3 w-px bg-white/20" />
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 min-h-11 text-[12px] uppercase tracking-[0.16em] text-stone-300 hover:text-gold-400 transition"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" />
              WhatsApp
            </button>
          </motion.div>

          <motion.p
            custom={0.65}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 sm:mt-6 max-w-lg text-[15px] md:text-lg text-stone-400/90 font-display italic leading-relaxed break-words"
          >
            {company.marathiTagline}
          </motion.p>
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-5 right-4 md:right-8 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-stone-400 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  )
}
