import { useEffect, useRef } from 'react'
import HomerBounce from './HomerBounce'
import './BirthdayScreen.css'

export default function BirthdayScreen() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div className="birthday-screen">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}sounds/guitare.ogg`} loop />
      <div className="bg-sparkle" />

      {/* Titre + image Solane */}
      <div className="birthday-content">
        {/* ✏️ Modifiez le texte ici */}
        <h1 className="birthday-title">Joyeux Anniversaire !</h1>
        <div className="solane-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}images/solane.png`}
            alt="Solane"
            className="solane-img"
            draggable={false}
          />
        </div>
      </div>

      {/* Homer qui se balade partout */}
      <HomerBounce />
    </div>
  )
}
