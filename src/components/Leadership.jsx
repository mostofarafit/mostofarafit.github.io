import { motion } from 'framer-motion'
import { leadership } from '../data/content.js'
import { Reveal, SectionHeading, Tilt3D } from './ui/primitives.jsx'
import '../styles/leadership.css'

const ICONS = {
  research: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5M11 8v6M8 11h6" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 6-13 16-13 0 10-5 15-13 15-2 0-3-1-3-2Z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.7C19 15.6 12 20 12 20Z" />
    </>
  ),
}

export default function Leadership() {
  return (
    <section className="band lead" id="leadership">
      <div className="wrap">
        <SectionHeading
          kicker="Leadership & Involvement"
          title="Research, teams and"
          highlight="things that matter."
          sub="Leading a six-person startup team, running consumer research for a launch, and coordinating scholarships for a foundation."
        />

        <div className="lead__bento">
          {leadership.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.09} className={`lead__cell lead__cell--${item.size}`}>
              <Tilt3D className="lead__card card card--glow card--edge" data-accent={item.accent} max={6}>
                <span className="lead__aura" aria-hidden="true" />

                <div className="lead__top">
                  <span className="lead__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[item.icon]}
                    </svg>
                  </span>
                  <span className="lead__period mono">{item.period}</span>
                </div>

                <div className="lead__body">
                  <h3 className="lead__title">{item.title}</h3>
                  <p className="lead__org">
                    {item.org} <i /> <span>{item.place}</span>
                  </p>
                  <ul className="lead__points">
                    {item.points.map((p, k) => (
                      <li key={k}>{p}</li>
                    ))}
                  </ul>
                </div>

                <motion.span className="lead__sweep" aria-hidden="true" />
              </Tilt3D>
            </Reveal>
          ))}

          <Reveal delay={0.3} className="lead__cell lead__cell--cta">
            <div className="lead__quote card" data-accent="lime">
              <svg className="lead__quoteMark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 7H5a3 3 0 0 0-3 3v7h7v-7H6a3 3 0 0 1 3-3Zm12 0h-4a3 3 0 0 0-3 3v7h7v-7h-3a3 3 0 0 1 3-3Z" />
              </svg>
              <p>
                Research first, pitch second. The numbers tell you what to say — the room tells you how to say it.
              </p>
              <span className="mono">— how I work</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
