import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const FLOAT_EMOJIS = ['🌈','💜','⭐','🌸','✨','💖','🦋','🌟','💫','🎉','🌺','💝']

function StarField() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    dur: 1.5 + Math.random() * 3,
    delay: Math.random() * 4,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          width: s.size,
          height: s.size,
          background: 'white',
          borderRadius: '50%',
          top: `${s.top}%`,
          left: `${s.left}%`,
          animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  )
}

function FloatingEmojis() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    emoji: FLOAT_EMOJIS[i % FLOAT_EMOJIS.length],
    left: Math.random() * 100,
    dur: 7 + Math.random() * 9,
    delay: Math.random() * 9,
    size: 18 + Math.random() * 22,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {items.map(it => (
        <div key={it.id} style={{
          position: 'absolute',
          left: `${it.left}%`,
          bottom: '-10%',
          fontSize: it.size,
          animation: `floatUp ${it.dur}s ${it.delay}s linear infinite`,
          opacity: 0,
        }}>{it.emoji}</div>
      ))}
    </div>
  )
}

export default function Onboarding({ onEnter, zooming }) {
  const overlayRef = useRef(null)
  const btnRef = useRef(null)
  const contentRef = useRef(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline()
    tl.fromTo(contentRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'back.out(1.6)' }
    )
  }, [])

  const handleClick = () => {
    if (clicked) return
    setClicked(true)

    // Button pulse
    gsap.to(btnRef.current, {
      scale: 1.25, duration: 0.1,
      yoyo: true, repeat: 3, ease: 'power2.inOut',
      onComplete: () => {
        // Zoom overlay expands
        gsap.set(overlayRef.current, { scale: 0, opacity: 1, display: 'block' })
        gsap.to(overlayRef.current, {
          scale: 30,
          duration: 0.85,
          ease: 'power4.in',
          onComplete: onEnter,
        })
        gsap.to(contentRef.current, { opacity: 0, duration: 0.3 })
      }
    })
  }

  return (
    <>
      <style>{`
        @keyframes twinkle {
          from { opacity: 0.15; transform: scale(0.7); }
          to   { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 24px rgba(255,110,180,0.35), 0 0 60px rgba(168,85,247,0.2); }
          50%     { box-shadow: 0 0 48px rgba(255,110,180,0.7), 0 0 100px rgba(168,85,247,0.5); }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 20px rgba(255,209,102,0.3); }
          50%     { box-shadow: 0 0 40px rgba(255,209,102,0.7); }
        }
        @keyframes blinkHint {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 0.9; }
        }
        .onboard-btn {
          background: linear-gradient(135deg, #ff6eb4, #a855f7 50%, #60a5fa);
          border: none;
          color: white;
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(15px, 2.5vw, 20px);
          font-weight: 700;
          padding: 20px 56px;
          border-radius: 60px;
          cursor: none;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          animation: pulseGlow 2.5s ease-in-out infinite;
          transition: transform 0.15s;
        }
        .onboard-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
          border-radius: 60px;
        }
        .onboard-btn:hover { transform: translateY(-4px) scale(1.04); }
      `}</style>

      {/* Zoom overlay circle */}
      <div ref={overlayRef} style={{
        position: 'fixed',
        inset: 0,
        margin: 'auto',
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ff6eb4, #a855f7, #2d0a5e)',
        zIndex: 300,
        display: 'none',
        pointerEvents: 'none',
        transformOrigin: 'center center',
      }} />

      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, #0d0120 0%, #2d0a5e 40%, #1a0050 70%, #0d0120 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 100, overflow: 'hidden',
      }}>
        <StarField />
        <FloatingEmojis />

        {/* Decorative ring glow */}
        <div style={{
          position: 'absolute', width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div ref={contentRef} style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 28,
          padding: '0 24px', textAlign: 'center',
        }}>
          {/* Badge */}
          <div style={{
            background: 'rgba(255,200,100,0.12)',
            border: '1px solid rgba(255,200,100,0.45)',
            color: '#ffd166',
            fontSize: 12, fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '10px 24px', borderRadius: 50,
            animation: 'badgePulse 2s ease-in-out infinite',
          }}>
            ✨ A Love Letter For You ✨
          </div>

          {/* Main text */}
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>From Joyce, with all her heart</div>

          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(44px, 10vw, 96px)',
            color: 'white',
            lineHeight: 1,
            textShadow: '0 0 60px rgba(200,120,255,0.8), 0 0 120px rgba(255,110,180,0.4)',
          }}>
            Happy Birthday<br />
            <span style={{
              background: 'linear-gradient(135deg, #ff6eb4, #c084fc, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Jo Joseph 🎂</span>
          </div>

          <div style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(14px, 2vw, 17px)',
            fontWeight: 300,
            maxWidth: 420,
            lineHeight: 1.75,
          }}>
            Something magical has been prepared just for you — a little corner of the internet filled with love 💜
          </div>

          {/* CTA Button */}
          <button ref={btnRef} className="onboard-btn" onClick={handleClick}>
            Open Your Surprise 🎁
          </button>

          <div style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: 12,
            animation: 'blinkHint 2s ease-in-out infinite',
          }}>
            tap to reveal the magic ✨
          </div>
        </div>
      </div>
    </>
  )
}
