import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RainbowIllustration({ size = 500 }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const arcs = svgRef.current.querySelectorAll('.arc')
    gsap.fromTo(arcs,
      { strokeDashoffset: 900, opacity: 0 },
      {
        strokeDashoffset: 0, opacity: 0.92,
        duration: 1.4, stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      }
    )
    // Clouds bounce in
    const clouds = svgRef.current.querySelectorAll('.cloud')
    gsap.fromTo(clouds,
      { scale: 0, opacity: 0, transformOrigin: 'center' },
      { scale: 1, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(2)', delay: 1.2 }
    )
    // Stars sparkle
    const stars = svgRef.current.querySelectorAll('.star')
    gsap.fromTo(stars,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(3)', delay: 1.8 }
    )
    gsap.to(stars, {
      scale: 1.3, opacity: 0.6,
      duration: 1.5, stagger: 0.2, ease: 'sine.inOut',
      yoyo: true, repeat: -1, delay: 2.4
    })
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: size, height: 'auto' }}>
      <defs>
        <path id="arc1" d="M 38 215 Q 260 5  482 215" />
        <path id="arc2" d="M 58 215 Q 260 28 462 215" />
        <path id="arc3" d="M 78 215 Q 260 50 442 215" />
        <path id="arc4" d="M 98 215 Q 260 72 422 215" />
        <path id="arc5" d="M 118 215 Q 260 94 402 215" />
        <path id="arc6" d="M 138 215 Q 260 116 382 215" />
        <path id="arc7" d="M 158 215 Q 260 136 362 215" />
      </defs>
      {/* Rainbow arcs */}
      {[
        { id: 'arc1', stroke: '#ff6eb4', sw: 22 },
        { id: 'arc2', stroke: '#fb923c', sw: 22 },
        { id: 'arc3', stroke: '#facc15', sw: 22 },
        { id: 'arc4', stroke: '#4ade80', sw: 22 },
        { id: 'arc5', stroke: '#60a5fa', sw: 22 },
        { id: 'arc6', stroke: '#818cf8', sw: 22 },
        { id: 'arc7', stroke: '#c084fc', sw: 22 },
      ].map(a => (
        <use key={a.id} href={`#${a.id}`} className="arc"
          fill="none" stroke={a.stroke} strokeWidth={a.sw}
          strokeLinecap="round"
          strokeDasharray="900" strokeDashoffset="900" />
      ))}

      {/* Left cloud */}
      <g className="cloud">
        <ellipse cx="62" cy="212" rx="44" ry="28" fill="white" opacity="0.97" />
        <ellipse cx="40" cy="206" rx="30" ry="22" fill="white" opacity="0.97" />
        <ellipse cx="84" cy="206" rx="32" ry="22" fill="white" opacity="0.97" />
        <ellipse cx="62" cy="198" rx="24" ry="20" fill="white" opacity="0.97" />
      </g>

      {/* Right cloud */}
      <g className="cloud">
        <ellipse cx="458" cy="212" rx="44" ry="28" fill="white" opacity="0.97" />
        <ellipse cx="436" cy="206" rx="30" ry="22" fill="white" opacity="0.97" />
        <ellipse cx="480" cy="206" rx="32" ry="22" fill="white" opacity="0.97" />
        <ellipse cx="458" cy="198" rx="24" ry="20" fill="white" opacity="0.97" />
      </g>

      {/* Stars */}
      <text className="star" x="260" y="45" textAnchor="middle" fontSize="24" opacity="0">⭐</text>
      <text className="star" x="160" y="80" textAnchor="middle" fontSize="17" opacity="0">✨</text>
      <text className="star" x="360" y="80" textAnchor="middle" fontSize="17" opacity="0">✨</text>
      <text className="star" x="100" y="130" textAnchor="middle" fontSize="14" opacity="0">💫</text>
      <text className="star" x="420" y="130" textAnchor="middle" fontSize="14" opacity="0">💫</text>
    </svg>
  )
}
