/* Effets sonores générés par Web Audio API — aucun fichier audio requis */

/* Contexte audio partagé — résout le blocage iOS Safari */
let _ctx: AudioContext | null = null

async function getCtx(): Promise<AudioContext> {
  if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext()
  if (_ctx.state === 'suspended') await _ctx.resume()
  return _ctx
}

export async function playTchouTchou() {
  const ctx = await getCtx()

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

  whistle(ctx.currentTime, 640)
  whistle(ctx.currentTime + 0.32, 600)
}

export async function playILoveYou() {
  const ctx = await getCtx()
  // Do5 – Mi5 – Sol5 : arpège chaleureux
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + i * 0.16
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.3, t + 0.03)
    gain.gain.setValueAtTime(0.3, t + 0.14)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55)
    osc.start(t)
    osc.stop(t + 0.58)
  })
}

export async function playGiftClick() {
  const ctx = await getCtx()
  const t = ctx.currentTime

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

export async function playMagic() {
  const ctx = await getCtx()
  const sparks = 12
  for (let i = 0; i < sparks; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + i * 0.045
    const startFreq = 500 + i * 140
    osc.frequency.setValueAtTime(startFreq, t)
    osc.frequency.exponentialRampToValueAtTime(startFreq * 3.2, t + 0.28)
    gain.gain.setValueAtTime(0.14, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32)
    osc.start(t)
    osc.stop(t + 0.35)
  }
}
