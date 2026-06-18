import { useState, useRef } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import BurstScreen from './components/BurstScreen'
import BirthdayScreen from './components/BirthdayScreen'
import './App.css'

type Screen = 'welcome' | 'burst' | 'birthday'

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleGiftOpen = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {})
    }
    setScreen('burst')
  }

  const handleBurstComplete = () => {
    setScreen('birthday')
  }

  return (
    <div className="app">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}sounds/music.mp3`} loop />
      {screen === 'welcome' && <WelcomeScreen onOpen={handleGiftOpen} />}
      {screen === 'burst' && <BurstScreen onComplete={handleBurstComplete} />}
      {screen === 'birthday' && <BirthdayScreen />}
    </div>
  )
}

export default App
