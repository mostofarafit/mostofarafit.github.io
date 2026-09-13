import { useEffect, useState } from 'react'
import { profile, navLinks } from '../data/content.js'
import { Marquee } from './ui/primitives.jsx'
import '../styles/footer.css'

export default function Footer() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Dhaka',
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="footer__marquee">
        <Marquee items={['Available for hire', 'Digital Marketing', 'Let’s talk', 'Dhaka, Bangladesh']} speed={30} reverse />
      </div>

      <div className="wrap footer__inner">
        <a className="footer__big" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>

        <div className="footer__cols">
          <div className="footer__col">
            <span className="mono">NAVIGATE</span>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <span className="mono">ELSEWHERE</span>
            <ul>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>Email ↗</a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
              </li>
              <li>
                <a href={profile.resume} download>
                  Résumé (PDF) ↓
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col footer__col--clock">
            <span className="mono">LOCAL TIME · DHAKA</span>
            <b className="footer__clock">{clock}</b>
            <span className="footer__loc">{profile.location}</span>
          </div>
        </div>

        <div className="footer__base">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; built with React + Framer Motion</span>
          <a href="#home" className="footer__top">
            Back to top
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
