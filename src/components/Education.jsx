import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { education } from '../data/content.js'
import { SectionHeading } from './ui/primitives.jsx'
import '../styles/education.css'

export default function Education() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [shift, setShift] = useState(0)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const measure = () => {
      const wide = window.innerWidth > 860
      setHorizontal(wide)
      if (!wide || !trackRef.current) return setShift(0)
      const extra = trackRef.current.scrollWidth - window.innerWidth
      setShift(Math.max(extra + 40, 0))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  const x = useTransform(smooth, [0, 1], [0, -shift])
  const barScale = useTransform(smooth, [0, 1], [0.04, 1])

  return (
    <section className="edu" id="education" ref={wrapRef} style={{ height: horizontal ? `calc(100svh + ${shift + 260}px)` : 'auto' }}>
      <div className="edu__sticky">
        <div className="wrap">
          <SectionHeading kicker="Education" title="Built on" highlight="a marketing degree." sub="Plus four years captaining a football team — which taught the other half." />
        </div>

        <motion.div className="edu__track" ref={trackRef} style={horizontal ? { x } : undefined}>
          {education.map((e, i) => (
            <article className="edu__card card card--glow card--edge" data-accent={e.accent} key={e.school}>
              <span className="edu__index mono">{String(i + 1).padStart(2, '0')} / {String(education.length).padStart(2, '0')}</span>
              <span className="edu__ribbon">{e.meta}</span>

              <div className="edu__cap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8.5 12 4l10 4.5-10 4.5L2 8.5Z" />
                  <path d="M6 10.6V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.4M21 9v5" />
                </svg>
              </div>

              <h3 className="edu__school">{e.school}</h3>
              <p className="edu__degree">{e.degree}</p>
              <p className="edu__detail">{e.detail}</p>

              <footer className="edu__foot">
                <span className="edu__date">{e.date}</span>
                <span className="edu__place mono">{e.place}</span>
              </footer>

              <span className="edu__shine" aria-hidden="true" />
            </article>
          ))}
        </motion.div>

        {horizontal && (
          <div className="wrap edu__progress">
            <span className="edu__progressTrack">
              <motion.i style={{ scaleX: barScale }} />
            </span>
            <span className="mono">SCROLL TO ADVANCE →</span>
          </div>
        )}
      </div>
    </section>
  )
}
