/* Effets sonores générés par Web Audio API — aucun fichier audio requis */

/*
 * iOS Safari bloque l'AudioContext jusqu'à un geste utilisateur.
 * Pattern fiable : dès le premier touchstart sur l'appli, on crée le contexte,
 * on appelle resume() ET on joue un buffer silencieux d'1 sample.
 * Ce buffer force iOS à passer l'état à "running" avant que le vrai son soit déclenché.
 * Appelle initAudio() sur onTouchStart du div racine.
 */
let _ctx: AudioContext | null = null

export function initAudio() {
  if (_ctx && _ctx.state === 'running') return
  if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext()
  if (_ctx.state === 'suspended') _ctx.resume()
  // Buffer silencieux — nécessaire sur iOS pour vraiment déverrouiller le contexte
  const buf = _ctx.createBuffer(1, 1, 22050)
  const src = _ctx.createBufferSource()
  src.buffer = buf
  src.connect(_ctx.destination)
  src.start(0)
}

function getCtx(): AudioContext {
  if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext()
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}

const DELAY = 0.1  // laisse le temps au resume() de prendre effet

export function playTchouTchou() {
  const ctx = getCtx()

  const whistle = (start: number, freq: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(freq, start)
    osc.frequency.linearRampToValueAtTime(freq * 0.82, start + 0.2)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(0.38, start + 0.02)
    gain.gain.setValueAtTime(0.38, start + 0.14)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.26)
    osc.start(start)
    osc.stop(start + 0.28)
  }

  const t = ctx.currentTime + DELAY
  whistle(t, 640)
  whistle(t + 0.32, 600)
}

export function playILoveYou() {
  const ctx = getCtx()
  // Do5 – Mi5 – Sol5 : arpège chaleureux
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + DELAY + i * 0.16
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.3, t + 0.03)
    gain.gain.setValueAtTime(0.3, t + 0.14)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55)
    osc.start(t)
    osc.stop(t + 0.58)
  })
}

export function playGiftClick() {
  const ctx = getCtx()
  const t = ctx.currentTime + DELAY

  // Thump grave
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(130, t)
  osc1.frequency.exponentialRampToValueAtTime(45, t + 0.18)
  gain1.gain.setValueAtTime(0.55, t)
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(t)
  osc1.stop(t + 0.25)

  // Clic vif
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(900, t)
  osc2.frequency.exponentialRampToValueAtTime(300, t + 0.07)
  gain2.gain.setValueAtTime(0.22, t)
  gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(t)
  osc2.stop(t + 0.12)
}

export function playMagic() {
  const ctx = getCtx()
  const sparks = 12
  for (let i = 0; i < sparks; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + DELAY + i * 0.045
    const startFreq = 500 + i * 140
    osc.frequency.setValueAtTime(startFreq, t)
    osc.frequency.exponentialRampToValueAtTime(startFreq * 3.2, t + 0.28)
    gain.gain.setValueAtTime(0.14, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32)
    osc.start(t)
    osc.stop(t + 0.35)
  }
}
