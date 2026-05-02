import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ConfettiLottie, CakeLottie } from './LottieAssets'

function Confetti() {
  const pieces = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    color: ['#ff6eb4','#a855f7','#60a5fa','#34d399','#fbbf24','#fb7185','#fff'][i % 7],
    left: Math.random() * 100,
    size: 6 + Math.random() * 10,
    dur: 5 + Math.random() * 6,
    delay: Math.random() * 6,
    isCircle: Math.random() > 0.5,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: 0,
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: p.isCircle ? '50%' : 3,
          animation: `confettiFall ${p.dur}s ${p.delay}s linear infinite`,
          opacity: 0,
        }} />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const nameRef = useRef(null)
  const subRef = useRef(null)
  const emojiRef = useRef(null)
  const cakeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl
      .fromTo(cakeRef.current, { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' })
      .fromTo(tagRef.current, { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
      .fromTo(titleRef.current, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.2')
      .fromTo(nameRef.current, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.25')
      .fromTo(subRef.current, { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .fromTo(emojiRef.current.children, { y: 20, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2.5)' }, '-=0.1')
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fce4ff 0%, #ede0ff 25%, #ffd6e8 60%, #ffecd2 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '60px 24px',
    }}>
      <Confetti />

      {/* Cake Lottie */}
      <div ref={cakeRef} style={{ marginBottom: 8 }}>
        <CakeLottie />
      </div>

      {/* Badge */}
      <div ref={tagRef} style={{
        background: 'white',
        borderRadius: 50, padding: '9px 24px',
        fontSize: 12, fontWeight: 700,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        color: '#a855f7',
        boxShadow: '0 4px 24px rgba(168,85,247,0.2)',
        marginBottom: 20,
      }}>
        🎂 Today is YOUR day 🎂
      </div>

      {/* Title */}
      <div ref={titleRef} style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(32px, 7vw, 72px)',
        color: '#2d0a5e',
        lineHeight: 1.1,
        marginBottom: 4,
      }}>
        Happy Birthday,
      </div>

      {/* Name */}
      <div ref={nameRef} style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(52px, 13vw, 130px)',
        background: 'linear-gradient(135deg, #ff6eb4 0%, #a855f7 50%, #60a5fa 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        marginBottom: 20,
        filter: 'drop-shadow(0 4px 24px rgba(168,85,247,0.3))',
      }}>
        Jo Joseph
      </div>

      {/* Sub */}
      <div ref={subRef} style={{
        fontSize: 'clamp(15px, 2.5vw, 21px)',
        color: '#7c3aed',
        fontWeight: 400,
        letterSpacing: 0.5,
        marginBottom: 32,
      }}>
        The most wonderful person in my whole world 💜
      </div>

      {/* Emojis */}
      <div ref={emojiRef} style={{
        display: 'flex', gap: 'clamp(10px, 2vw, 20px)',
        fontSize: 'clamp(26px, 5vw, 50px)',
      }}>
        {['🌈','💜','🎉','💖','✨','🌸','🦋'].map((e, i) => (
          <span key={i} style={{
            display: 'inline-block',
            animation: `bounceEmoji 2.2s ${i * 0.2}s ease-in-out infinite`,
          }}>{e}</span>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 28,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        color: 'rgba(100,50,150,0.55)', fontSize: 12,
        animation: 'blinkHint 2s ease-in-out infinite',
      }}>
        scroll for more love
        <div style={{
          width: 18, height: 18,
          borderRight: '2px solid rgba(100,50,150,0.4)',
          borderBottom: '2px solid rgba(100,50,150,0.4)',
          transform: 'rotate(45deg)',
          animation: 'scrollBounce 1.5s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes bounceEmoji {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(10deg); }
        }
        @keyframes blinkHint {
          0%,100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes scrollBounce {
          0%,100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(7px); }
        }
      `}</style>
    </section>
  )
}
