import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const HOT = 'a, button, [data-cursor="hot"], input, textarea'

export default function Cursor() {
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 330, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 330, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      if (!ringRef.current) return
      ringRef.current.classList.toggle('is-hot', !!e.target.closest?.(HOT))
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div ref={ringRef} className="cursor-ring" style={{ x: rx, y: ry }} aria-hidden="true" />
    </>
  )
}
