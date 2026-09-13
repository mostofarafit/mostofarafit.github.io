import { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/content.js'
import { Reveal, SectionHeading } from './ui/primitives.jsx'
import '../styles/experience.css'

export default function Experience() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.8', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })
  const [open, setOpen] = useState(0)

  return (
    <section className="band exp" id="experience">
      <div className="wrap">
        <SectionHeading
          kicker="Experience"
          title="Where the work"
          highlight="happened."
          sub="From night-shift telemarketing in 2018 to representing a product at career fairs and university boardrooms in 2026."
        />

        <div className="exp__track" ref={trackRef}>
          <div className="exp__rail" aria-hidden="true">
            <motion.span className="exp__railFill" style={{ scaleY: line }} />
          </div>

          {experience.map((job, i) => (
            <Reveal key={job.role + job.org} delay={0.05} className="exp__row">
              <span className="exp__node" data-accent={job.accent}>
                <i />
                {job.current && <b className="exp__nodePing" />}
              </span>

              <article
                className={`exp__card card card--glow card--edge ${open === i ? 'is-open' : ''}`}
                data-accent={job.accent}
                onClick={() => setOpen(open === i ? -1 : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(open === i ? -1 : i))}
                aria-expanded={open === i}
              >
                <div className="exp__head">
                  <div className="exp__headMain">
                    <span className="exp__period mono">{job.period}</span>
                    <h3 className="exp__role">{job.role}</h3>
                    <p className="exp__org">
                      <span>{job.org}</span>
                      <i />
                      <span className="exp__place">{job.place}</span>
                    </p>
                  </div>
                  <div className="exp__headSide">
                    <span className="exp__tag">{job.tag}</span>
                    <span className="exp__toggle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>

                <motion.div
                  className="exp__bodyWrap"
                  initial={false}
                  animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ul className="exp__points">
                    {job.points.map((p, k) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0, x: -12 }}
                        animate={open === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                        transition={{ duration: 0.45, delay: open === i ? 0.08 + k * 0.06 : 0 }}
                      >
                        <span className="exp__bullet" />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
