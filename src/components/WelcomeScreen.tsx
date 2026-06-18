import { useState } from 'react'
import './WelcomeScreen.css'

const BASE = import.meta.env.BASE_URL
const GIFT_IMAGES = [
  `${BASE}images/etat1.png`,
  `${BASE}images/etat2.png`,
  `${BASE}images/etat3.png`,
]

interface Props {
  onOpen: () => void
}

export default function WelcomeScreen({ onOpen }: Props) {
  const [clickCount, setClickCount] = useState(0)
  const [shakeKey, setShakeKey] = useState(0)
  const [shakeLevel, setShakeLevel] = useState(0)
  const [busy, setBusy] = useState(false)

  const handleClick = () => {
    if (busy) return

    if (clickCount >= 2) {
      onOpen()
      return
    }

    const newCount = clickCount + 1
    setBusy(true)
    setClickCount(newCount)
    setShakeLevel(newCount)
    setShakeKey(k => k + 1)

    setTimeout(() => {
      setBusy(false)
      setShakeLevel(0)
    }, 650)
  }

  return (
    <div className="welcome-screen">
      <div className="bg-glow" />
      <div className="welcome-content">
        <p className="welcome-hint">Appuie sur le cadeau...</p>

        <button
          type="button"
          className="gift-button"
          onClick={handleClick}
          aria-label="Ouvrir le cadeau"
        >
          <img
            key={shakeKey}
            src={GIFT_IMAGES[clickCount]}
            alt="Cadeau"
            className={`gift-image${shakeLevel === 1 ? ' shake-light' : ''}${shakeLevel === 2 ? ' shake-heavy' : ''}`}
            draggable={false}
          />
        </button>

        <div className="click-dots" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span key={i} className={`dot${i < clickCount ? ' dot-done' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
