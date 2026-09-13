import { credentials } from '../data/content.js'
import { Reveal, SectionHeading } from './ui/primitives.jsx'
import '../styles/credentials.css'

const COLUMNS = [
  { key: 'certifications', title: 'Certifications', items: credentials.certifications, icon: 'badge' },
  { key: 'awards', title: 'Awards & Achievements', items: credentials.awards, icon: 'trophy' },
  { key: 'volunteering', title: 'Volunteering', items: credentials.volunteering, icon: 'hands' },
]

const ICONS = {
  badge: <path d="M12 3 4 6.5v5c0 4.6 3.3 8.4 8 9.5 4.7-1.1 8-4.9 8-9.5v-5L12 3Zm-1.4 11.6-2.8-2.8 1.4-1.4 1.4 1.4 3.8-3.8 1.4 1.4-5.2 5.2Z" />,
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M16 5h3v2a3 3 0 0 1-3 3M8 5H5v2a3 3 0 0 0 3 3M10 17h4M9 20h6M12 13v4" />
    </>
  ),
  hands: (
    <>
      <path d="M7 13V6.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M10 11V5.5a1.5 1.5 0 0 1 3 0V12M13 11.5v-4a1.5 1.5 0 0 1 3 0V15a5 5 0 0 1-5 5H9.8a4 4 0 0 1-3-1.4L4 15.4a1.6 1.6 0 0 1 2.4-2.1L7 14" />
    </>
  ),
}

export default function Credentials() {
  return (
    <section className="band creds">
      <div className="wrap">
        <SectionHeading
          kicker="Recognition"
          title="Certified, awarded,"
          highlight="and out in the field."
          sub="Formal training, competitive sport, stage performance and volunteering — the mix that makes the pitch land."
        />

        <div className="creds__cols">
          {COLUMNS.map((col, ci) => (
            <Reveal key={col.key} delay={ci * 0.1} className="creds__col">
              <div className="creds__colHead">
                <span className="creds__colIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill={col.icon === 'badge' ? 'currentColor' : 'none'} stroke={col.icon === 'badge' ? 'none' : 'currentColor'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[col.icon]}
                  </svg>
                </span>
                <h3>{col.title}</h3>
                <span className="creds__count mono">{String(col.items.length).padStart(2, '0')}</span>
              </div>

              <ul className="creds__list">
                {col.items.map((item, i) => (
                  <li key={item.title} className="creds__item card card--glow" data-accent={item.accent} style={{ '--i': i }}>
                    <span className="creds__itemLine" aria-hidden="true" />
                    <b>{item.title}</b>
                    <span>{item.issuer}</span>
                    <svg className="creds__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
