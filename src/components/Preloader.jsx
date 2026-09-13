import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/preloader.css'

const WORDS = ['Strategy', 'Content', 'Campaigns', 'Growth', 'Rafit']

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const DUR = 1900
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / DUR, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        onDone?.()
        setTimeout(() => setGone(true), 620)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  const wordIndex = Math.min(Math.floor(count / (100 / WORDS.length)), WORDS.length - 1)

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="pre"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pre__inner">
            <div className="pre__words">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 34, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -34, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="pre__bar">
              <span style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <div className="pre__count">{String(count).padStart(3, '0')}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
