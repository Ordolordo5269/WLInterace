import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Home from './components/Home'

const MobilityAI = lazy(() => import('./components/MobilityAI'))
const InvestmentAI = lazy(() => import('./components/InvestmentAI'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))
const About = lazy(() => import('./pages/About'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobility-ai" element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}><MobilityAI /></Suspense>} />
        <Route path="/investment-ai" element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}><InvestmentAI /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}><About /></Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}><PrivacyPolicy /></Suspense>} />
        <Route path="/terms-of-service" element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}><TermsOfService /></Suspense>} />
      </Routes>
    </>
  )
}

export default App
