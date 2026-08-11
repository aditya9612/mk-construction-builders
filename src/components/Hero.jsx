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
    <section className="relative min-h-[100svh] flex items-end bg-navy-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={company.images.hero}
          alt="Modern residential construction by MK Construction & Builders"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,10,16,0.92)_0%,rgba(5,10,16,0.72)_42%,rgba(5,10,16,0.35)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/20" />
        <div className="absolute inset-0 grain" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[8%] hidden lg:block w-px bg-gradient-to-b from-transparent via-gold-500/35 to-transparent"
      />

      <div className="relative z-10 container-arch w-full min-w-0 pb-10 pt-24 sm:pt-28 md:pb-14 md:pt-32 lg:pb-16 lg:pt-36">
        <div className="max-w-4xl min-w-0 w-full">
          <motion.p
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-xl sm:text-3xl md:text-4xl text-stone-50/95 font-medium tracking-[0.01em] break-words max-w-full"
          >
            {company.name}
          </motion.p>

          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 min-w-0"
          >
            <span className="arch-rule" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-gold-400 break-words">
              Pune · Trust · Quality · On-Time
            </span>
          </motion.div>

          <motion.h1
            custom={0.22}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-[4.5rem] text-stone-50 font-semibold max-w-full break-words text-balance"
          >
            Building Dreams,
            <br className="hidden sm:block" />
            <span className="text-gold-400 italic font-medium"> Creating Futures.</span>
          </motion.h1>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 sm:mt-5 max-w-xl text-[15px] md:text-base text-stone-300/95 leading-relaxed break-words"
          >
            {company.heroSubheading}
          </motion.p>

          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full"
          >
            <Link to="/projects" className="btn-primary w-full sm:w-auto">
              Explore Our Projects
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link to="/request-quote" className="btn-secondary w-full sm:w-auto">
              Get Free Quote
            </Link>
          </motion.div>

          <motion.div
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-stone-300 hover:text-gold-400 transition"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              Call Now
            </a>
            <span className="hidden sm:inline h-3 w-px bg-white/20" />
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-stone-300 hover:text-gold-400 transition"
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
            className="mt-5 sm:mt-6 max-w-lg text-base md:text-lg text-stone-400/90 font-display italic leading-relaxed break-words"
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
