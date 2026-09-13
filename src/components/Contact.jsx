import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content.js'
import { Magnetic, Reveal, SplitText } from './ui/primitives.jsx'
import '../styles/contact.css'

const CHANNELS = [
  {
    key: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: 'violet',
    icon: <path d="M3 7.5 12 13l9-5.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />,
  },
  {
    key: 'phone',
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    accent: 'coral',
    icon: <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4V3Z" />,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: '/in/mostofarfafit',
    href: profile.linkedin,
    accent: 'cyan',
    icon: <path d="M5 9v10M5 5.5v.01M10 19v-5.5a2.5 2.5 0 0 1 5 0V19M10 9v10" />,
  },
]

const INTENTS = [
  {
    key: 'internship',
    label: 'An internship',
    accent: 'violet',
    subject: 'Internship opportunity',
    line: 'We have a marketing internship open and your NidusLab work looks like a fit.',
  },
  {
    key: 'fulltime',
    label: 'A full-time role',
    accent: 'coral',
    subject: 'Full-time marketing role',
    line: 'We are hiring for a marketing position and would like to talk.',
  },
  {
    key: 'campaign',
    label: 'A campaign',
    accent: 'lime',
    subject: 'Campaign / freelance project',
    line: 'We need content and paid ads run for a campaign — here is the scope.',
  },
  {
    key: 'research',
    label: 'Market research',
    accent: 'cyan',
    subject: 'Market research project',
    line: 'We want consumer research and a recommendation report for a launch.',
  },
]

export default function Contact() {
  const [intent, setIntent] = useState(INTENTS[0])
  const [copied, setCopied] = useState(false)

  const draft = `Hi Rafit — ${intent.line}`
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(intent.subject)}&body=${encodeURIComponent(
    `${draft}\n\n`
  )}`
  const whatsapp = `https://wa.me/${profile.phone.replace(/\D/g, '')}?text=${encodeURIComponent(draft)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1900)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="band contact" id="contact">
      <div className="wrap">
        <div className="contact__shout">
          <Reveal>
            <span className="sec-kicker">
              <i />
              Contact
            </span>
          </Reveal>
          <h2 className="contact__title">
            <SplitText text="Let's build" />{' '}
            <span className="gradient-text">
              <SplitText text="something loud." delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.18}>
            <p className="sec-sub">
              Open to internships, full-time marketing roles and freelance campaign work. Reply time is usually same-day.
            </p>
          </Reveal>
        </div>

        <div className="contact__grid">
          {/* channels */}
          <div className="contact__channels">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.08} className="contact__chWrap">
                <a
                  className="contact__ch card card--glow card--edge"
                  data-accent={c.accent}
                  href={c.href}
                  target={c.key === 'linkedin' ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <span className="contact__chIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span className="contact__chText">
                    <em>{c.label}</em>
                    <b>{c.value}</b>
                  </span>
                  <svg className="contact__chArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="contact__chWrap">
              <button className="contact__copy card" onClick={copy} data-accent="lime">
                <span>{copied ? 'Email copied to clipboard' : 'Copy email address'}</span>
                <motion.i animate={{ rotate: copied ? 360 : 0, scale: copied ? 1.15 : 1 }} transition={{ duration: 0.5 }}>
                  {copied ? '✓' : '⧉'}
                </motion.i>
              </button>
            </Reveal>

            <Reveal delay={0.36} className="contact__chWrap">
              <div className="contact__avail card" data-accent="violet">
                <span className="contact__availDot" />
                <div>
                  <b>Available for work</b>
                  <span className="mono">{profile.location} · GMT+6</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* intent picker */}
          <Reveal delay={0.14} className="contact__pickWrap">
            <div className="contact__pick card" data-accent={intent.accent}>
              <span className="contact__pickGlow" aria-hidden="true" />

              <header className="contact__pickHead">
                <span className="mono">STEP 01</span>
                <h3>What do you need?</h3>
              </header>

              <div className="contact__intents" role="tablist" aria-label="Reason for contact">
                {INTENTS.map((it) => (
                  <button
                    key={it.key}
                    role="tab"
                    aria-selected={intent.key === it.key}
                    data-accent={it.accent}
                    className={`contact__intent ${intent.key === it.key ? 'is-on' : ''}`}
                    onClick={() => setIntent(it)}
                  >
                    {intent.key === it.key && (
                      <motion.span layoutId="intent-pill" className="contact__intentBg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="contact__intentLabel">{it.label}</span>
                  </button>
                ))}
              </div>

              <div className="contact__draft">
                <span className="mono">MESSAGE PREVIEW</span>
                <p>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={intent.key}
                      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {draft}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>

              <header className="contact__pickHead contact__pickHead--two">
                <span className="mono">STEP 02</span>
                <h3>Send it your way</h3>
              </header>

              <div className="contact__sends">
                <Magnetic strength={0.18}>
                  <a className="btn btn--primary" href={mailto}>
                    Open in email
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 12 16-8-6 16-2.5-6L4 12Z" />
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
                      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.4-.7-1 .8a5 5 0 0 1-2.2-2.2l.8-1L10 9.5c-.5 0-1 .4-1 1Z" />
                    </svg>
                  </a>
                </Magnetic>
              </div>

              <p className="contact__note mono">Both open pre-filled — nothing is sent until you hit send.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
