import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const BALLOON_COLORS = ['#ff6eb4','#a855f7','#60a5fa','#34d399','#fbbf24','#fb7185','#c084fc','#f97316']

export default function Balloons({ count = 8 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const balloons = containerRef.current.querySelectorAll('.balloon-body')
    balloons.forEach((b, i) => {
      gsap.to(b, {
        y: -18,
        rotation: i % 2 === 0 ? -8 : 8,
        duration: 2 + i * 0.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      })
    })
  }, [])

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 'clamp(10px, 2.5vw, 28px)',
      flexWrap: 'wrap',
      paddingBottom: 10,
    }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="balloon-body" style={{
            width: 'clamp(44px, 7vw, 72px)',
            height: 'clamp(56px, 9vw, 92px)',
            background: `radial-gradient(circle at 35% 30%, ${BALLOON_COLORS[i % BALLOON_COLORS.length]}ee, ${BALLOON_COLORS[i % BALLOON_COLORS.length]}88)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            position: 'relative',
            boxShadow: `inset -6px -8px 16px rgba(0,0,0,0.15), inset 4px 4px 12px rgba(255,255,255,0.35)`,
          }}>
            {/* Shine */}
            <div style={{
              position: 'absolute',
              top: '14%', left: '22%',
              width: '28%', height: '20%',
              background: 'rgba(255,255,255,0.55)',
              borderRadius: '50%',
              transform: 'rotate(-25deg)',
            }} />
            {/* Knot */}
            <div style={{
              position: 'absolute',
              bottom: -6, left: '50%',
              transform: 'translateX(-50%)',
              width: 8, height: 8,
              background: BALLOON_COLORS[i % BALLOON_COLORS.length],
              borderRadius: '50%',
            }} />
          </div>
          {/* String */}
          <svg width="2" height="clamp(40px,6vw,70px)">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4,3" />
          </svg>
        </div>
      ))}
    </div>
  )
}
