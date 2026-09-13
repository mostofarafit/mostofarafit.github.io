import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups } from '../data/content.js'
import { Reveal, SectionHeading } from './ui/primitives.jsx'
import '../styles/skills.css'

const ALL = { key: 'all', label: 'Everything', accent: 'violet' }

export default function Skills() {
  const [filter, setFilter] = useState('all')

  const tabs = [ALL, ...skillGroups]

  const visible = useMemo(() => {
    const flat = skillGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.key, accent: g.accent, label: g.label })))
    return filter === 'all' ? flat : flat.filter((s) => s.group === filter)
  }, [filter])

  return (
    <section className="band skills" id="skills">
      <div className="wrap">
        <SectionHeading
          kicker="Skills"
          title="The toolkit,"
          highlight="sorted."
          sub="Pick a lane — the grid re-shuffles. Platforms I run campaigns on, methods I use to find the insight, and the human side that closes it."
        />

        <div className="skills__tabs" role="tablist" aria-label="Skill filters">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={filter === t.key}
              className={`skills__tab ${filter === t.key ? 'is-on' : ''}`}
              data-accent={t.accent}
              onClick={() => setFilter(t.key)}
            >
              {filter === t.key && (
                <motion.span layoutId="skills-tab" className="skills__tabBg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="skills__tabLabel">{t.label}</span>
              <em>{t.key === 'all' ? skillGroups.reduce((n, g) => n + g.items.length, 0) : t.items.length}</em>
            </button>
          ))}
        </div>

        <motion.div className="skills__grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => (
              <motion.span
                key={s.item}
                layout
                data-accent={s.accent}
                className="skills__chip"
                initial={{ opacity: 0, scale: 0.82, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: -10 }}
                transition={{ duration: 0.42, delay: Math.min(i * 0.022, 0.3), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
              >
                <i className="skills__chipDot" />
                {s.item}
                <b className="skills__chipTag">{s.label}</b>
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="skills__cards">
          {skillGroups.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.07} className="skills__sumWrap">
              <div className="skills__sum card card--glow card--edge" data-accent={g.accent}>
                <span className="skills__sumNum mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.label}</h3>
                <p>{g.items.slice(0, 3).join(' · ')}</p>
                <span className="skills__sumCount">
                  {g.items.length}
                  <em>skills</em>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
