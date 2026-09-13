import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { profile, marquee } from '../data/content.js'
import { Magnetic, Marquee } from './ui/primitives.jsx'
import '../styles/hero.css'

const ORBIT = [
  { label: 'Meta Ads', accent: 'violet' },
  { label: 'Content', accent: 'coral' },
  { label: 'Research', accent: 'cyan' },
  { label: 'Pitching', accent: 'lime' },
]

export default function Hero({ started }) {
  const [roleIdx, setRoleIdx] = useState(0)
  const ref = useRef(null)

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 130])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // pointer parallax
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })

  useEffect(() => {
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2)
      py.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [px, py])

  const photoX = useTransform(px, (v) => v * -18)
  const photoY = useTransform(py, (v) => v * -14)
  const glowX = useTransform(px, (v) => v * 34)
  const glowY = useTransform(py, (v) => v * 28)

  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [started])

  const rise = {
    hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero__glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />

      <div className="wrap hero__grid">
        <motion.div className="hero__copy" style={{ y: yText, opacity: fade }}>
          <motion.span className="hero__status" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={0}>
            <i />
            Open to marketing roles · {profile.location}
          </motion.span>

          <h1 className="hero__title">
            <motion.span className="hero__line" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={1}>
              {profile.first}
            </motion.span>
            <motion.span
              className="hero__line hero__line--stroke"
              variants={rise}
              initial="hidden"
              animate={started ? 'show' : 'hidden'}
              custom={2}
              data-text={profile.last}
            >
              {profile.last}
            </motion.span>
          </h1>

          <motion.div className="hero__roles" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={3}>
            <span className="hero__rolesLabel">I do</span>
            <span className="hero__rolesBox">
              <AnimatePresence mode="wait">
                <motion.b
                  key={roleIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  {profile.roles[roleIdx]}
                </motion.b>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p className="hero__tagline" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={4}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__actions" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={5}>
            <Magnetic>
              <a className="btn btn--primary" href="#contact">
                Work with me
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a className="btn btn--ghost" href={profile.resume} download>
                Download CV
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v12M6 12l6 6 6-6M4 20h16" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero__meta" variants={rise} initial="hidden" animate={started ? 'show' : 'hidden'} custom={6}>
            <li>
              <b>NidusLab</b>
              <span>Digital Marketing Intern</span>
            </li>
            <li>
              <b>NSU</b>
              <span>BBA, Marketing · 2026</span>
            </li>
            <li>
              <b>12K+</b>
              <span>Community managed</span>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div className="hero__visual" style={{ y: yPhoto, opacity: fade }}>
          <motion.div
            className="hero__photoWrap"
            style={{ x: photoX, y: photoY }}
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={started ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__ring" aria-hidden="true" />
            <span className="hero__blob" aria-hidden="true" />
            <div className="hero__photo">
              <img src={profile.photo} alt={`${profile.name} portrait`} loading="eager" />
            </div>

            {ORBIT.map((chip, i) => (
              <motion.span
                key={chip.label}
                className={`hero__chip hero__chip--${i + 1}`}
                data-accent={chip.accent}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={started ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__marquee">
        <Marquee items={marquee} speed={44} />
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-label="Scroll to about"
      >
        <span className="hero__scrollLine" />
        <span className="mono">SCROLL</span>
      </motion.a>
    </section>
  )
}
