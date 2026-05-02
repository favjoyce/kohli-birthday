import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Balloons from './Balloons'
import { ConfettiLottie } from './LottieAssets'

gsap.registerPlugin(ScrollTrigger)

const CANDLES = ['🕯️','🕯️','🕯️','🕯️','🕯️']

export default function WishSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const msgRef = useRef(null)
  const heartsRef = useRef(null)
  const balloonsRef = useRef(null)
  const candleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
    })
    tl
      .fromTo(titleRef.current,
        { scale: 0.5, opacity: 0, rotation: -8 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(2.5)' })
      .fromTo(candleRef.current.children,
        { y: 30, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, '-=0.3')
      .fromTo(msgRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.2')
      .fromTo(heartsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)' }, '-=0.1')
      .fromTo(balloonsRef.current.querySelectorAll('div > div'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, '-=0.2')

    // Floating hearts loop
    gsap.to(heartsRef.current, {
      y: -12, duration: 1.8,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    })
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(70px, 12vw, 120px) clamp(20px, 5vw, 40px)',
      background: 'linear-gradient(160deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)',
      color: 'white',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Confetti lottie overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', opacity: 0.55,
      }}>
        <ConfettiLottie style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto' }}>
        {/* Main title */}
        <div ref={titleRef} style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(40px, 10vw, 90px)',
          marginBottom: 16,
          textShadow: '0 0 60px rgba(255,110,180,0.6)',
          lineHeight: 1.1,
        }}>
          Make a Wish! 🎂
        </div>

        {/* Candles row */}
        <div ref={candleRef} style={{
          display: 'flex', justifyContent: 'center',
          gap: 12, fontSize: 32, marginBottom: 36,
        }}>
          {CANDLES.map((c, i) => (
            <span key={i} style={{
              display: 'inline-block',
              animation: `candleFlicker ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
            }}>{c}</span>
          ))}
        </div>

        {/* Message */}
        <div ref={msgRef} style={{
          fontSize: 'clamp(15px, 2.5vw, 20px)',
          color: 'rgba(255,255,255,0.82)',
          lineHeight: 1.85,
          fontWeight: 300,
          marginBottom: 40,
        }}>
          Jo, on your special day I wish you endless happiness, a heart overflowing with joy,
          and every dream you have ever dared to dream coming true.
          You deserve the whole universe and every beautiful thing in it.
          I love you more than words could ever say. 🌟
        </div>

        {/* Hearts */}
        <div ref={heartsRef} style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          letterSpacing: 14,
          marginBottom: 56,
        }}>
          💜 💖 💜
        </div>

        {/* Balloons */}
        <div ref={balloonsRef}>
          <Balloons count={8} />
        </div>

        {/* Closing */}
        <div style={{
          marginTop: 60,
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(20px, 3.5vw, 32px)',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
        }}>
          Happy Birthday my love 🌈<br />
          <span style={{ color: '#ff6eb4' }}>— forever and always, Joyce 💕</span>
        </div>
      </div>

      <style>{`
        @keyframes candleFlicker {
          from { transform: scaleY(1) rotate(-2deg); filter: brightness(1); }
          to   { transform: scaleY(1.1) rotate(2deg);  filter: brightness(1.3); }
        }
      `}</style>
    </section>
  )
}
