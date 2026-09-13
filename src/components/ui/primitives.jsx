import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* --------------------------------------------------------------
   Reveal — slide + fade when scrolled into view
   -------------------------------------------------------------- */
export function Reveal({ children, delay = 0, y = 28, once = true, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -10% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* --------------------------------------------------------------
   SplitText — per-word (and optional per-char) staggered entrance
   -------------------------------------------------------------- */
const UNIT_VARIANTS = {
  hidden: { y: '110%', opacity: 0, rotate: 4 },
  show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.035, mode = 'word' }) {
  const units = mode === 'char' ? [...text] : text.split(' ')
  // Once the entrance is done the transforms are dropped: a composited unit
  // breaks the parent's background-clip:text gradient in Chrome.
  const [settled, setSettled] = useState(false)

  return (
    <motion.span
      className={`split ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      onAnimationComplete={() => setSettled(true)}
    >
      {units.map((unit, i) => {
        const content = `${unit}${mode === 'word' && i < units.length - 1 ? ' ' : ''}`
        return (
          <span className="split__mask" key={`${unit}-${i}`} aria-hidden="true">
            {settled ? (
              <span className="split__unit">{content}</span>
            ) : (
              <motion.span className="split__unit" variants={UNIT_VARIANTS}>
                {content}
              </motion.span>
            )}
          </span>
        )
      })}
    </motion.span>
  )
}

/* --------------------------------------------------------------
   Magnetic — element leans toward the cursor
   -------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------
   Tilt3D — perspective tilt that follows the pointer
   -------------------------------------------------------------- */
export function Tilt3D({ children, className = '', max = 9, glow = true, ...rest }) {
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })

  const onMove = (e) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rx.set((0.5 - py) * max * 2)
    ry.set((px - 0.5) * max * 2)
    if (glow) {
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------
   Counter — animates 0 → value once visible
   -------------------------------------------------------------- */
export function Counter({ to, duration = 1.8, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => v.toFixed(decimals))
  const [display, setDisplay] = useState('0')

  useEffect(() => rounded.on('change', setDisplay), [rounded])

  useEffect(() => {
    if (!inView) return
    const controls = animateValue(mv, to, duration)
    return controls
  }, [inView, to, duration, mv])

  return <span ref={ref}>{display}</span>
}

function animateValue(mv, to, duration) {
  const start = performance.now()
  let raf
  const tick = (now) => {
    const t = Math.min((now - start) / (duration * 1000), 1)
    // easeOutExpo
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    mv.set(to * eased)
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

/* --------------------------------------------------------------
   SectionHeading
   -------------------------------------------------------------- */
export function SectionHeading({ kicker, title, highlight, sub, align = 'left' }) {
  return (
    <header className="sec-head" style={align === 'center' ? { alignItems: 'center', textAlign: 'center' } : undefined}>
      <Reveal>
        <span className="sec-kicker">
          <i />
          {kicker}
        </span>
      </Reveal>
      <h2 className="sec-title">
        <SplitText text={title} />{' '}
        {highlight && (
          <span className="gradient-text">
            <SplitText text={highlight} delay={0.12} />
          </span>
        )}
      </h2>
      {sub && (
        <Reveal delay={0.16}>
          <p className="sec-sub">{sub}</p>
        </Reveal>
      )}
    </header>
  )
}

/* --------------------------------------------------------------
   useCardGlow — feeds pointer position to every .card--glow
   -------------------------------------------------------------- */
export function useCardGlow() {
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const onMove = (e) => {
      const card = e.target.closest?.('.card--glow')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}

/* --------------------------------------------------------------
   Marquee — seamless infinite scroller
   -------------------------------------------------------------- */
export function Marquee({ items, speed = 34, reverse = false, className = '' }) {
  const loop = [...items, ...items]
  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee__track"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <b className="marquee__dot" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
