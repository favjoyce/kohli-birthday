import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const CURSORS = ['💜', '🌟', '✨', '💖', '🌈', '🦋', '🌸', '💫']

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - 12,
        y: e.clientY - 12,
        duration: 0.08,
        ease: 'none',
      })
    }
    window.addEventListener('mousemove', move)
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % CURSORS.length)
      gsap.fromTo(cursorRef.current,
        { scale: 1.5, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' }
      )
    }, 2200)
    return () => { window.removeEventListener('mousemove', move); clearInterval(interval) }
  }, [])

  return (
    <div ref={cursorRef} style={{
      position: 'fixed',
      top: 0, left: 0,
      fontSize: 22,
      pointerEvents: 'none',
      zIndex: 99999,
      lineHeight: 1,
      userSelect: 'none',
    }}>
      {CURSORS[idx]}
    </div>
  )
}
