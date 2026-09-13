import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data/content.js'
import '../styles/nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">
          <a href="#home" className="nav__brand" aria-label="Home">
            <span className="nav__mark">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M16 2 30 16 16 30 2 16Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                <circle cx="16" cy="16" r="4.2" fill="currentColor" />
              </svg>
            </span>
            <span className="nav__name">
              {profile.first}
              <b>.</b>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                {active === l.id && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__cta">
            <a className="btn btn--primary nav__hire" href="#contact">
              Let&apos;s talk
            </a>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ y: 34, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                    <em>{String(i + 1).padStart(2, '0')}</em>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="drawer__foot">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
