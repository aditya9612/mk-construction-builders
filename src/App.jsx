import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
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

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col w-full min-w-0 overflow-x-clip">
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
              <Route
                path="*"
                element={
                  <div className="pt-32 pb-20 text-center px-4">
                    <h1 className="font-display text-4xl text-navy-900">
                      Page not found
                    </h1>
                    <p className="mt-3 text-navy-700/70">
                      The page you are looking for does not exist.
                    </p>
                    <a href="/" className="mt-6 inline-block text-gold-600">
                      Go home
                    </a>
                  </div>
                }
              />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
