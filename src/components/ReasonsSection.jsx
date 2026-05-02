import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RainbowIllustration from './RainbowIllustration'
import { StarLottie } from './LottieAssets'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  { emoji: '🌈', title: 'You are my rainbow', text: 'You bring color and light into every single grey day of my life' },
  { emoji: '💫', title: 'Your kindness', text: 'The way you love people is the most beautiful thing I have ever seen' },
  { emoji: '🌸', title: 'Your smile', text: 'One smile from you and my whole world becomes absolutely perfect' },
  { emoji: '🌙', title: 'You understand me', text: 'You see me — really see me — and choose to love me anyway' },
  { emoji: '🦋', title: 'Your free spirit', text: 'Your beautiful, wild soul is what I fell in love with first' },
  { emoji: '⭐', title: 'Your strength', text: 'You carry yourself with such grace, even through the hardest days' },
  { emoji: '🌺', title: 'Your laughter', text: 'Your laugh is literally my favourite sound in the whole universe' },
  { emoji: '💝', title: 'Simply you', text: 'Every little thing about you — I would not change a single thing' },
]

export default function ReasonsSection() {
  const gridRef = useRef(null)
  const headRef = useRef(null)
  const rainbowRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(rainbowRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: rainbowRef.current, start: 'top 85%' } }
    )
    const cards = gridRef.current.querySelectorAll('.reason-card')
    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.88 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.65, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      }
    )

    // Hover wobble
    cards.forEach(card => {
      card.addEventListener('mouseenter', () =>
        gsap.to(card, { y: -8, scale: 1.04, duration: 0.3, ease: 'back.out(2)' })
      )
      card.addEventListener('mouseleave', () =>
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
      )
    })
  }, [])

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
      background: 'linear-gradient(160deg, #fff0f9, #f3e8ff, #e8f4ff)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: '#a855f7', marginBottom: 12,
          }}>
            🌈 reasons i love you
          </div>
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(30px, 6vw, 60px)',
            color: '#2d0a5e',
          }}>
            Why You're My Everything
          </div>
        </div>

        {/* Rainbow illustration */}
        <div ref={rainbowRef} style={{
          display: 'flex', justifyContent: 'center',
          marginBottom: 60, padding: '0 20px',
        }}>
          <RainbowIllustration size={520} />
        </div>

        {/* Reason cards grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 20,
        }}>
          {REASONS.map((r, i) => (
            <div key={i} className="reason-card" style={{
              background: 'white',
              borderRadius: 22,
              padding: 'clamp(20px, 3vw, 30px) 20px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              border: '1px solid rgba(255,255,255,0.8)',
              cursor: 'default',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Card glow on top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, #ff6eb4, #a855f7, #60a5fa)`,
                borderRadius: '22px 22px 0 0',
              }} />

              <div style={{ fontSize: 'clamp(30px, 5vw, 46px)', marginBottom: 12, display: 'block' }}>
                {r.emoji}
              </div>

              {i === 0 && (
                <div style={{ position: 'absolute', top: 8, right: 8, opacity: 0.7 }}>
                  <StarLottie style={{ width: 32, height: 32 }} />
                </div>
              )}

              <div style={{
                fontWeight: 700, color: '#2d0a5e',
                fontSize: 'clamp(13px, 1.8vw, 15px)',
                marginBottom: 8,
              }}>
                {r.title}
              </div>
              <div style={{
                color: '#7c5a9a',
                fontSize: 'clamp(12px, 1.5vw, 13px)',
                lineHeight: 1.65,
                fontWeight: 400,
              }}>
                {r.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
