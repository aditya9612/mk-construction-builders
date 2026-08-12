import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import MobileActionBar from './components/MobileActionBar'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import PremiumCursor from './components/PremiumCursor'
import Seo from './components/Seo'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import GalleryPage from './pages/GalleryPage'
import Process from './pages/Process'
import Packages from './pages/Packages'
import CalculatorPage from './pages/CalculatorPage'
import HousePlans from './pages/HousePlans'
import Quality from './pages/Quality'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import RequestQuote from './pages/RequestQuote'
import { pageSeo } from './data/seo'
import { pageTransition } from './motion/variants'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}

function NotFound() {
  const seo = pageSeo.notFound
  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        noindex
      />
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="font-display text-4xl text-navy-900">Page not found</h1>
        <p className="mt-3 text-navy-700/70">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="mt-6 inline-block text-gold-600">
          Go home
        </Link>
      </div>
    </>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell min-h-screen flex flex-col w-full min-w-0 overflow-x-clip">
      <ScrollProgress />
      <PremiumCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full min-w-0">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/process" element={<Process />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/house-plans" element={<HousePlans />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </div>
  )
}
