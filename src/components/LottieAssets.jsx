import { Player } from '@lottiefiles/react-lottie-player'

// Free public Lottie URLs from LottieFiles CDN
export function ConfettiLottie({ style }) {
  return (
    <Player
      autoplay
      loop
      src="https://assets2.lottiefiles.com/packages/lf20_u4yrau84.json"
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}

export function HeartLottie({ style }) {
  return (
    <Player
      autoplay
      loop
      src="https://assets9.lottiefiles.com/packages/lf20_jK5Pzt.json"
      style={{ width: 120, height: 120, ...style }}
    />
  )
}

export function StarLottie({ style }) {
  return (
    <Player
      autoplay
      loop
      src="https://assets4.lottiefiles.com/packages/lf20_touohxv0.json"
      style={{ width: 80, height: 80, ...style }}
    />
  )
}

export function CakeLottie({ style }) {
  return (
    <Player
      autoplay
      loop
      src="https://assets3.lottiefiles.com/packages/lf20_obhph3sh.json"
      style={{ width: 200, height: 200, ...style }}
    />
  )
}
