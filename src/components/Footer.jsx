import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content.js'
import { Magnetic } from './ui/primitives.jsx'
import '../styles/footer.css'

/* channels shown as the "transmission" row */
const CHANNELS = [
  { idx: '01', label: 'LinkedIn', hint: '/in/mostofarfafit', href: profile.linkedin, ext: true, accent: 'cyan' },
  { idx: '02', label: 'Email', hint: profile.email, href: `mailto:${profile.email}`, accent: 'violet' },
  { idx: '03', label: 'Phone', hint: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, accent: 'coral' },
  { idx: '04', label: 'Résumé', hint: 'PDF · 1 page', href: profile.resume, download: true, accent: 'lime' },
]

export default function Footer() {
  const markRef = useRef(null)
  const rafRef = useRef(0)
  const [clock, setClock] = useState('--:--:--')
  const [lit, setLit] = useState(false)

  /* Dhaka wall clock */
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Dhaka',
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* spotlight follows the pointer across the wordmark; idles on its own otherwise */
  const onMove = (e) => {
    const el = markRef.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--fx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--fy', `${((e.clientY - r.top) / r.height) * 100}%`)
    })
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <footer className="footer">
      <div className="footer__horizon" aria-hidden="true" />
      <div className="footer__grid" aria-hidden="true" />
      <div className="footer__scan" aria-hidden="true" />

      <div className="wrap footer__inner">
        {/* ---------- status strip ---------- */}
        <div className="footer__status">
          <span className="footer__beacon">
            <i />
            Available for work
          </span>
          <span className="footer__statusMid mono">DHAKA · GMT+6</span>
          <span className="footer__clock" aria-label={`Local time in Dhaka ${clock}`}>
            {clock.split('').map((ch, i) => (
              <b key={i} className={ch === ':' ? 'footer__tick' : undefined}>
                {ch}
              </b>
            ))}
          </span>
        </div>

        {/* ---------- cursor-lit wordmark ---------- */}
        <div
          className={`footer__mark ${lit ? 'is-lit' : ''}`}
          ref={markRef}
          onMouseMove={onMove}
          onMouseEnter={() => setLit(true)}
          onMouseLeave={() => setLit(false)}
        >
          <span className="sr-only">{profile.name}</span>
          <span className="footer__markRow" aria-hidden="true">
            <span className="footer__markOut">MOSTOFA</span>
            <span className="footer__markLit">MOSTOFA</span>
          </span>
          <span className="footer__markRow footer__markRow--wide" aria-hidden="true">
            <span className="footer__markOut">RAFIT</span>
            <span className="footer__markLit">RAFIT</span>
          </span>
        </div>

        {/* ---------- call to action ---------- */}
        <div className="footer__cta">
          <p className="footer__pitch">
            Got a campaign, a role, or just a question? <br />
            The inbox is open and the reply is usually same-day.
          </p>
          <Magnetic strength={0.2}>
            <a className="footer__mail" href={`mailto:${profile.email}`}>
              <span className="footer__mailRing" aria-hidden="true" />
              <span className="footer__mailText">
                <em className="mono">SAY HELLO</em>
                <b>{profile.email}</b>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </Magnetic>
        </div>

        {/* ---------- transmission row ---------- */}
        <ul className="footer__chan">
          {CHANNELS.map((c) => (
            <li key={c.idx} data-accent={c.accent}>
              <a
                href={c.href}
                target={c.ext ? '_blank' : undefined}
                rel={c.ext ? 'noreferrer' : undefined}
                download={c.download || undefined}
              >
                <span className="footer__chanIdx mono">{c.idx}</span>
                <span className="footer__chanLabel">{c.label}</span>
                <span className="footer__chanHint mono">{c.hint}</span>
                <span className="footer__chanLine" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {/* ---------- base bar ---------- */}
        <div className="footer__base">
          <span className="mono">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="mono footer__colophon">Sora / Space Grotesk · React + Framer Motion</span>
          <a href="#home" className="footer__top" aria-label="Back to top">
            <svg className="footer__topRing" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            </svg>
            <svg className="footer__topArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
