import { useState, useEffect, useRef } from 'react'
import './HomerBounce.css'

type HomerMode = 'homer' | 'tram'

export default function HomerBounce() {
  const [mode, setMode]       = useState<HomerMode>('homer')
  const [flipping, setFlipping] = useState(false)
  const [pos, setPos]         = useState({ x: 50, y: 65 })

  const posRef = useRef({ x: 50, y: 65 })
  const dirRef = useRef({ x: 1.0, y: 0.55 })

  useEffect(() => {
    let alive = true
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let frameId = 0
    let moving = false
    let isFlipping = false
    let lastRevert = 0

    /* Planifie un callback en tenant compte du démontage */
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { if (alive) fn() }, ms)
      timeouts.push(id)
    }

    /* Flip : squish → change image → unsquish */
    const flipTo = (target: HomerMode, done?: () => void) => {
      if (isFlipping) return
      isFlipping = true
      setFlipping(true)
      after(() => setMode(target), 500)          // change image au milieu (3e squish)
      after(() => {
        isFlipping = false
        setFlipping(false)
        done?.()
      }, 1000)
    }

    /* Boucle de déplacement */
    const move = () => {
      if (!moving || !alive) return

      posRef.current.x += dirRef.current.x * 0.22
      posRef.current.y += dirRef.current.y * 0.13

      // Rebondir sur les bords
      if (posRef.current.x <= 4)  dirRef.current.x =  Math.abs(dirRef.current.x)
      if (posRef.current.x >= 83) dirRef.current.x = -Math.abs(dirRef.current.x)
      if (posRef.current.y <= 4)  dirRef.current.y =  Math.abs(dirRef.current.y)
      if (posRef.current.y >= 84) dirRef.current.y = -Math.abs(dirRef.current.y)

      setPos({ x: posRef.current.x, y: posRef.current.y })

      // Toutes les 2 secondes : pause + retour en Homer
      if (Date.now() - lastRevert >= 2000) {
        moving = false
        flipTo('homer', () => {
          after(() => {
            // Légère variation de direction pour un déplacement naturel
            dirRef.current.x += Math.random() * 0.6 - 0.3
            dirRef.current.y += Math.random() * 0.4 - 0.2
            dirRef.current.x = Math.max(-1.5, Math.min(1.5, dirRef.current.x))
            dirRef.current.y = Math.max(-1.0, Math.min(1.0, dirRef.current.y))

            flipTo('tram', () => {
              moving = true
              lastRevert = Date.now()
              frameId = requestAnimationFrame(move)
            })
          }, 850)
        })
        return
      }

      frameId = requestAnimationFrame(move)
    }

    // Départ : 1,5 s après l'apparition de l'écran
    after(() => {
      flipTo('tram', () => {
        moving = true
        lastRevert = Date.now()
        frameId = requestAnimationFrame(move)
      })
    }, 1500)

    return () => {
      alive = false
      timeouts.forEach(clearTimeout)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div
      className={`homer-wrap${flipping ? ' homer-flip' : ''}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/${mode === 'tram' ? 'homero_tram' : 'homero'}.png`}
        alt="Homer"
        className="homer-img"
        draggable={false}
      />
    </div>
  )
}
