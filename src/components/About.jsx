import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, stats, languages } from '../data/content.js'
import { Counter, Reveal, SectionHeading, Tilt3D } from './ui/primitives.jsx'
import '../styles/about.css'

const WORDS = profile.summary.split(' ')

export default function About() {
  const textRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] })

  return (
    <section className="band about" id="about">
      <div className="wrap">
        <SectionHeading
          kicker="About"
          title="Marketing that"
          highlight="moves numbers."
          sub="Campaigns, content and conversations — built on research, delivered with a face-to-face pitch."
        />

        <div className="about__grid">
          {/* scroll-lit paragraph */}
          <div className="about__text" ref={textRef}>
            <p className="about__para" aria-label={profile.summary}>
              {WORDS.map((w, i) => (
                // the space lives outside the word span: a trailing space inside
                // an inline-block collapses and the words run together
                <Fragment key={i}>
                  <Word progress={scrollYProgress} range={[i / WORDS.length, (i + 1.6) / WORDS.length]}>{w}</Word>{' '}
                </Fragment>
              ))}
            </p>

            <div className="about__langs">
              {languages.map((l, i) => (
                <Reveal key={l.name} delay={i * 0.1} className="lang">
                  <div className="lang__top">
                    <b>{l.name}</b>
                    <span className="mono">{l.level}</span>
                  </div>
                  <div className="lang__bar">
                    <motion.i
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: l.pct / 100 }}
                      viewport={{ once: true, margin: '-15%' }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* signature card */}
          <Reveal delay={0.12} className="about__side">
            <Tilt3D className="about__card card card--glow card--edge" data-accent="violet" max={7}>
              <span className="about__cardGlow" aria-hidden="true" />
              <div className="about__cardHead">
                <img src={profile.photo} alt="" aria-hidden="true" />
                <div>
                  <b>{profile.name}</b>
                  <span className="mono">BBA Marketing · NSU</span>
                </div>
              </div>
              <ul className="about__facts">
                <li>
                  <span className="mono">NOW</span>Digital Marketing Intern @ NidusLab
                </li>
                <li>
                  <span className="mono">BASE</span>
                  {profile.location}
                </li>
                <li>
                  <span className="mono">EDGE</span>Ads + content + client-facing pitching
                </li>
                <li>
                  <span className="mono">TOOLS</span>Meta Suite, Canva, Adobe, AI copilots
                </li>
              </ul>
              <a className="about__cardLink" href={profile.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </Tilt3D>
          </Reveal>
        </div>

        {/* stats */}
        <div className="about__stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat card card--glow" >
              <div className="stat__num">
                <Counter to={s.display} duration={1.6 + i * 0.15} />
                <em>{s.suffix}</em>
              </div>
              <b className="stat__label">{s.label}</b>
              <span className="stat__hint">{s.hint}</span>
              <i className="stat__bar" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span className="about__word" style={{ opacity, y }} aria-hidden="true">
      {children}
    </motion.span>
  )
}
