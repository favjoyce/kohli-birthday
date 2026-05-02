import { useState } from 'react'
import Onboarding from './components/Onboarding'
import BirthdayPage from './components/BirthdayPage'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [zooming, setZooming] = useState(false)

  const handleEnter = () => {
    setZooming(true)
    setTimeout(() => {
      setEntered(true)
    }, 1000)
  }

  return (
    <div>
      {!entered && <Onboarding onEnter={handleEnter} zooming={zooming} />}
      {entered && <BirthdayPage />}
    </div>
  )
}
