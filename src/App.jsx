import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'

import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Leadership from './components/Leadership.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Credentials from './components/Credentials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useCardGlow } from './components/ui/primitives.jsx'

import './styles/primitives.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useCardGlow()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  // smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onAnchor = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -70, duration: 1.25 })
    }
    document.addEventListener('click', onAnchor)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
    }
  }, [])

  // lock scroll while preloader runs
  useEffect(() => {
    document.body.classList.toggle('is-locked', !loaded)
  }, [loaded])

  return (
    <>
      <Cursor />
      <Preloader onDone={() => setLoaded(true)} />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <div className="page-bg" aria-hidden="true">
        <span className="aurora aurora--1" />
        <span className="aurora aurora--2" />
        <span className="aurora aurora--3" />
        <span className="grid-veil" />
      </div>

      <div className="shell">
        <Nav />
        <main>
          <Hero started={loaded} />
          <About />
          <Experience />
          <Leadership />
          <Skills />
          <Education />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
