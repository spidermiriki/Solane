import { useEffect } from 'react'
import './BurstScreen.css'

interface Props {
  onComplete: () => void
}

export default function BurstScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="burst-screen">
      <div className="burst-rays" />
      <div className="burst-ring ring-1" />
      <div className="burst-ring ring-2" />
      <div className="burst-ring ring-3" />
      <div className="burst-core" />
    </div>
  )
}
