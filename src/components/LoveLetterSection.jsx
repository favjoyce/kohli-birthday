import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeartLottie } from './LottieAssets'

gsap.registerPlugin(ScrollTrigger)

export default function LoveLetterSection() {
  const cardRef = useRef(null)
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
      }
    )
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' }
      }
    )
  }, [])

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
      background: 'white',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Soft background blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,110,180,0.08), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: '#ff6eb4', marginBottom: 12,
          }}>
            ✉️ a love letter
          </div>
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(32px, 6vw, 62px)',
            color: '#2d0a5e',
          }}>
            From My Heart to Yours
          </div>
        </div>

        {/* Card */}
        <div ref={cardRef} style={{
          background: 'linear-gradient(145deg, #fff9fe, #fce4ff)',
          border: '1px solid rgba(168,85,247,0.18)',
          borderRadius: 28,
          padding: 'clamp(32px, 6vw, 64px)',
          position: 'relative',
          boxShadow: '0 20px 70px rgba(168,85,247,0.1), 0 4px 20px rgba(255,110,180,0.07)',
        }}>
          {/* Big quote mark */}
          <div style={{
            position: 'absolute', top: -18, left: 36,
            fontFamily: "'Dancing Script', cursive",
            fontSize: 140, color: '#f0d0ff',
            lineHeight: 1, pointerEvents: 'none',
            userSelect: 'none',
          }}>"</div>

          {/* Heart Lottie top-right */}
          <div style={{ position: 'absolute', top: 16, right: 16, opacity: 0.9 }}>
            <HeartLottie style={{ width: 80, height: 80 }} />
          </div>

          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: '#4a1480',
            lineHeight: 2,
            position: 'relative', zIndex: 1,
          }}>
            My dearest <span style={{ color: '#ff6eb4', fontWeight: 700 }}>Jo</span>,<br /><br />

            On this beautiful day that the universe decided to bring you into existence —
            I want you to know that you are the{' '}
            <span style={{ color: '#ff6eb4', fontWeight: 700 }}>greatest gift</span>{' '}
            that has ever happened to me. Every single day with you feels like a dream I never want to wake up from.<br /><br />

            You make me laugh when I need it most, you hold me when I fall, and you love me in ways
            I didn't even know I deserved. Your heart is the{' '}
            <span style={{ color: '#a855f7', fontWeight: 700 }}>kindest, warmest place</span>{' '}
            I have ever known — and I am endlessly lucky to call you mine.<br /><br />

            Loving you is the easiest, most natural thing in the world.
            You are my <span style={{ color: '#ff6eb4', fontWeight: 700 }}>rainbow after every storm</span>,
            my reason to smile, my favourite person in the entire universe.
            I love everything about you — your laugh, your eyes, your spirit, your beautiful soul.<br /><br />

            Today I celebrate <span style={{ color: '#a855f7', fontWeight: 700 }}>YOU</span>.
            May this birthday bring you all the joy, all the magic, and all the love you so freely give to the world.
            You deserve the entire{' '}
            <span style={{ color: '#ff6eb4', fontWeight: 700 }}>sky full of stars</span>,
            and I will spend every day trying to give it to you. 💜
          </div>

          <div style={{
            marginTop: 36, textAlign: 'right',
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#a855f7',
          }}>
            Forever yours,<br />
            <span style={{ color: '#ff6eb4' }}>Joyce 💕</span>
          </div>
        </div>
      </div>
    </section>
  )
}
