import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CustomCursor from './CustomCursor'
import HeroSection from './HeroSection'
import LoveLetterSection from './LoveLetterSection'
import ReasonsSection from './ReasonsSection'
import WishSection from './WishSection'

function SparkleOnClick() {
  useEffect(() => {
    const EMOJIS = ['✨','💖','🌟','💫','💜','🌸','🌈']
    const handle = (e) => {
      for (let i = 0; i < 9; i++) {
        const el = document.createElement('div')
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
        el.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          font-size: ${14 + Math.random() * 14}px;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          user-select: none;
        `
        document.body.appendChild(el)
        const angle = (i / 9) * Math.PI * 2
        const dist = 55 + Math.random() * 70
        gsap.to(el, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0,
          duration: 0.75 + Math.random() * 0.35,
          ease: 'power2.out',
          onComplete: () => el.remove()
        })
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])
  return null
}

export default function BirthdayPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    document.body.style.overflow = 'auto'
    document.body.style.cursor = 'none'
  }, [])

  return (
    <div ref={pageRef} style={{ position: 'relative' }}>
      <CustomCursor />
      <SparkleOnClick />
      <HeroSection />
      <LoveLetterSection />
      <ReasonsSection />
      <WishSection />
      <footer style={{
        background: '#0d0120',
        padding: 'clamp(32px, 5vw, 48px) 24px',
        textAlign: 'center',
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(16px, 2.5vw, 22px)',
        color: 'rgba(255,255,255,0.35)',
      }}>
        Made with{' '}
        <span style={{ color: '#ff6eb4' }}>♥</span>
        {' '}by Joyce, for the love of her life —{' '}
        <span style={{ color: '#c084fc' }}>Jo Joseph</span>{' '}
        🌈
      </footer>
    </div>
  )
}
