import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Sparkles, Send, Shield, Zap, Target } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

import arenaBgmi from '../assets/arena_bgmi1.webp'
import arenaValo from '../assets/arena_valo1.webp'
import arenaDota from '../assets/arena_dota1.webp'
import arenaMlbb from '../assets/arena_mlbb1.webp'
import arenaCs from '../assets/arena_cs1.webp'
import arenaFfm from '../assets/arena_ffm1.webp'
import arenaCodm from '../assets/arena_codm1.webp'

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const games = [
  { id: 'lineups_bgmi', title: 'Battlegrounds Mobile India', short: 'BGMI', bg: arenaBgmi },
  { id: 'lineups_valorant', title: 'VALORANT', short: 'VALORANT', bg: arenaValo },
  { id: 'lineups_dota2', title: 'Dota 2', short: 'DOTA 2', bg: arenaDota },
  { id: 'lineups_mlbb', title: 'Mobile Legends: Bang Bang', short: 'MLBB', bg: arenaMlbb },
  { id: 'lineups_freefire_max', title: 'Free Fire MAX', short: 'FREE FIRE MAX', bg: arenaFfm },
  { id: 'lineups_cs2', title: 'Counter‑Strike 2', short: 'CS2', bg: arenaCs },
  { id: 'lineups_codm', title: 'Call of Duty: Mobile', short: 'CODM', bg: arenaCodm },
]

// --- SUCCESS MODAL ---
function SuccessModal({ onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60"
        >
          {/* Top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

          {/* Ambient glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-60 rounded-full bg-purple-600/20 blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative p-8 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-7 h-7 text-purple-400" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl text-white tracking-tight">Lineups application received</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-mono">
                Thanks for registering. Your details have been sent to the Playstorm Lineups team for tryout scheduling.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* WhatsApp CTA */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center font-mono">Stay in communication</p>
              
              <MagneticElement>
                <a
                  href="https://chat.whatsapp.com/I8kG0tt6DCc9yL5eyZgpEe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  onMouseEnter={playDigitalHover}
                  className="group flex items-center justify-between w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Join WhatsApp Group</p>
                      <p className="text-[11px] text-gray-500 font-mono">Updates & announcements</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </MagneticElement>

              <button
                onClick={onClose}
                className="w-full rounded-xl border border-white/8 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 hover:border-white/15 transition font-mono"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default function Lineups() {
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle')
  const [gameTitle, setGameTitle] = useState('')

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: newValue })
  }

  const handleGameSelect = (id) => {
    playTactileClick()
    setGameTitle(id)
    setFormData({})
    setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    if (!formData.lineupsAck) {
      alert('Please tick the disclaimer to submit your lineups application.')
      setStatus('error')
      return
    }

    const v = (key, fallback = '-') => {
      const raw = formData[key]
      if (raw === undefined || raw === null) return fallback
      const s = String(raw).trim()
      return s.length ? s : fallback
    }

    const embedFields = []
    let gameLabel = ''

    if (gameTitle === 'lineups_bgmi') {
      gameLabel = 'BGMI'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '🕹️ IGN', value: v('bgmiIgn'), inline: true },
        { name: '🆔 UID', value: v('bgmiUid'), inline: true },
        { name: '👤 Full Name', value: v('bgmiFullName'), inline: true },
        { name: '📞 Phone Number', value: v('bgmiPhone'), inline: true },
        { name: '📧 Email ID', value: v('bgmiEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('bgmiEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('bgmiDeptYear'), inline: false },
        { name: '🤔 Why Lineups', value: v('bgmiWhy'), inline: false },
        { name: '🧠 Experience', value: v('bgmiExperience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_valorant') {
      gameLabel = 'Valorant'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '🕹️ PLAYER IGN+Tag', value: v('valoIgnTag'), inline: true },
        { name: '🎯 PLAYER RANK', value: v('valoRank'), inline: true },
        { name: '💬 Discord UserID', value: v('valoDiscordUserId'), inline: true },
        { name: '🧩 Roles', value: v('valoRoles'), inline: true },
        { name: '👤 Full Name', value: v('valoFullName'), inline: true },
        { name: '📞 Phone Number', value: v('valoPhone'), inline: true },
        { name: '📧 Email ID', value: v('valoEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('valoEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('valoDeptYear'), inline: true },
        { name: '🔗 Valo Tracker Link', value: v('valoTracker'), inline: false },
        { name: '🧠 Experience (optional)', value: v('valoExperience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_dota2') {
      gameLabel = 'Dota 2'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '🕹️ IGN', value: v('dotaIgn'), inline: true },
        { name: '🆔 UID', value: v('dotaUid'), inline: true },
        { name: '🎯 PLAYER RANK', value: v('dotaRank'), inline: true },
        { name: '👤 Full Name', value: v('dotaFullName'), inline: true },
        { name: '📞 Phone Number', value: v('dotaPhone'), inline: true },
        { name: '📧 Email ID', value: v('dotaEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('dotaEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('dotaDeptYear'), inline: true },
        { name: '🧠 Experience (optional)', value: v('dotaExperience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_mlbb') {
      gameLabel = 'MLBB'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '🕹️ IGN', value: v('mlbbIgn'), inline: true },
        { name: '🆔 UID', value: v('mlbbUid'), inline: true },
        { name: '🎯 PLAYER RANK', value: v('mlbbRank'), inline: true },
        { name: '👤 Full Name', value: v('mlbbFullName'), inline: true },
        { name: '📞 Phone Number', value: v('mlbbPhone'), inline: true },
        { name: '📧 Email ID', value: v('mlbbEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('mlbbEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('mlbbDeptYear'), inline: true },
        { name: '🧠 Experience (optional)', value: v('mlbbExperience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_freefire_max') {
      gameLabel = 'Free Fire MAX'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '👤 Full Name', value: v('ffFullName'), inline: true },
        { name: '📞 Phone Number', value: v('ffPhone'), inline: true },
        { name: '📧 Email ID', value: v('ffEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('ffEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('ffDeptYear'), inline: true },
        { name: '🧠 Experience (optional)', value: v('ffExperience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_cs2') {
      gameLabel = 'CS2'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '👤 Full Name', value: v('cs2FullName'), inline: true },
        { name: '📞 Phone Number', value: v('cs2Phone'), inline: true },
        { name: '📧 Email ID', value: v('cs2Email'), inline: true },
        { name: '🎓 Enrollment', value: v('cs2Enrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('cs2DeptYear'), inline: true },
        { name: '🎯 ELO / Rank', value: v('cs2Elo'), inline: true },
        { name: '🔗 Steam URL', value: v('cs2SteamUrl'), inline: false },
        { name: '🧠 Any experience?', value: v('cs2Experience', '(Not provided)'), inline: false },
      )
    } else if (gameTitle === 'lineups_codm') {
      gameLabel = 'CODM'
      embedFields.push(
        { name: '🎮 Game', value: gameLabel, inline: true },
        { name: '🕹️ IGN', value: v('codmIgn'), inline: true },
        { name: '🆔 UID', value: v('codmUid'), inline: true },
        { name: '👤 Full Name', value: v('codmFullName'), inline: true },
        { name: '📞 Phone Number', value: v('codmPhone'), inline: true },
        { name: '📧 Email ID', value: v('codmEmail'), inline: true },
        { name: '🎓 Enrollment', value: v('codmEnrollment'), inline: true },
        { name: '🏫 Department+Year', value: v('codmDeptYear'), inline: true },
        { name: '🧠 Experience (optional)', value: v('codmExperience', '(Not provided)'), inline: false },
      )
    } else {
      alert('Please select a game.')
      setStatus('error')
      return
    }

    const payload = {
      embeds: [
        {
          title: `📝 New Lineups Registration: ${gameLabel}`,
          color: 0x9333ea,
          fields: embedFields,
          footer: { text: '#Lineups Registration System' },
          timestamp: new Date().toISOString(),
        },
      ],
    }

    try {
      const response = await fetch('/api/register-discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: gameTitle, payload })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Server rejected request')
      }

      setStatus('success')
      setFormData({})
    } catch (err) {
      console.error('Submission error:', err)
      alert(`Registration failed: ${err.message}`)
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12 pb-12"
    >

      {/* SUCCESS MODAL */}
      {status === 'success' && (
        <SuccessModal onClose={() => {
          setStatus('idle')
          setGameTitle('')
          setFormData({})
        }} />
      )}

      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-[58%]">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Competitive Tryouts</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl uppercase">
              Lineups <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Registration</span> ⚔️
            </h1>
          </CursorPhysicsDistortion>
        </div>
        
        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Apply for the competitive BGMI, Valorant, Dota 2, MLBB, Free Fire MAX, CS2, or CODM rosters. Shortlisted players will proceed to live campus tryouts and collegiate scrims.
        </p>
      </div>

      {/* INFO / CONTEXT ROW */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-b border-white/5 py-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300">
          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1">#Lineups</span>
          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1">Competitive Trials</span>
          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1">Amity Noida</span>
        </div>
        <p className="max-w-xl text-xs md:text-sm text-gray-400 leading-relaxed font-mono">
          Pick your primary game title below, enter your active competitive details, and submit to transmit your tryout profile directly to our Department Leads.
        </p>
      </div>

      {/* GAME SELECTION CARDS – Warp in 3D TiltCards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game, index) => (
          <TiltCard key={game.id}>
            <GlowCard
              onClick={() => handleGameSelect(game.id)}
              onMouseEnter={playDigitalHover}
              className={`group relative flex h-40 flex-col justify-between overflow-hidden rounded-2xl border px-4 py-4 text-left transition duration-300 cursor-pointer w-full select-none
                ${gameTitle === game.id
                  ? 'border-purple-400 bg-black/60 shadow-2xl shadow-purple-900/40'
                  : 'border-white/10 bg-black/50 hover:border-purple-400'}
              `}
            >
              {/* Background image for games */}
              {game.bg && (
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <img
                    src={game.bg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-25 group-hover:opacity-40 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>
              )}

              <div className="space-y-1 relative z-10">
                <h3 className="font-['Rajdhani',sans-serif] text-xl sm:text-2xl font-bold leading-tight tracking-[0.14em] text-[#F9FAFB] uppercase">
                  {game.short}
                </h3>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200/80">
                  {game.title}
                </p>
              </div>

              {/* Pulsing neon badge status */}
              <div className="relative z-10 flex items-center gap-1.5 self-start rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[9px] uppercase tracking-widest text-purple-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" /> open
              </div>
            </GlowCard>
          </TiltCard>
        ))}
      </div>

      {/* FORM SECTION */}
      <AnimatePresence>
        {gameTitle && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/60 relative overflow-hidden"
          >
            {/* Ambient form backgrounds */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* BGMI FORM */}
            {gameTitle === 'lineups_bgmi' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-orange-300">
                    BGMI Lineups · Mobile Squad Tryout Form
                  </h4>
                </div>
                <Input name="bgmiIgn" label="BGMI IGN" placeholder="e.g. PlayerName" req onChange={handleChange} caps />
                <Input name="bgmiUid" label="UID" placeholder="Your in-game UID" req onChange={handleChange} />
                <Input name="bgmiFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="bgmiPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="bgmiEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="bgmiEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="bgmiDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <TextArea
                  name="bgmiWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="Tell us your competitive mindset, goals, and what you bring to the roster."
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="bgmiExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Share past teams, tournaments, scrim accomplishments, or clutch moments."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-xl border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that the details entered are accurate and I am available for lineup trials and matches.</span>
                </label>
              </div>
            )}

            {/* VALORANT FORM */}
            {gameTitle === 'lineups_valorant' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-red-300">
                    Valorant Lineups · Tactical FPS Tryout Form
                  </h4>
                </div>
                <Input name="valoIgnTag" label="PLAYER IGN+Tag" placeholder="e.g. Player#1234" req onChange={handleChange} caps />
                <Input name="valoRank" label="PLAYER RANK (Current / Peak)" placeholder="Current: ... | Peak: ..." req onChange={handleChange} />
                <Input name="valoDiscordUserId" label="DISCORD UserID" placeholder="e.g. 1234567890" req onChange={handleChange} />
                <Input name="valoRoles" label="Roles" placeholder="e.g. Duelist / Initiator / Controller" req onChange={handleChange} caps />
                <Input name="valoFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="valoPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="valoEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="valoEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="valoDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <Input name="valoTracker" label="Valo Tracker Link" placeholder="https://tracker.gg/valorant/..." type="url" req onChange={handleChange} />
                <TextArea
                  name="valoWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="What kind of competitive role do you see yourself in, and why Playstorm?"
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="valoExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Any previous teams, tournament accomplishments, or custom scrim performance."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-xl border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I will follow tryout training schedules and participate in matches when selected.</span>
                </label>
              </div>
            )}

            {/* DOTA 2 FORM */}
            {gameTitle === 'lineups_dota2' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-blue-300">
                    Dota 2 Lineups · MOBA Tryout Form
                  </h4>
                </div>
                <Input name="dotaIgn" label="IGN" placeholder="e.g. PlayerName" req onChange={handleChange} caps />
                <Input name="dotaUid" label="UID" placeholder="Your in-game UID" req onChange={handleChange} />
                <Input name="dotaRank" label="PLAYER RANK" placeholder="Current rank / peak rank" req onChange={handleChange} />
                <Input name="dotaFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="dotaPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="dotaEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="dotaEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="dotaDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <TextArea
                  name="dotaWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="Share how you play around your stack and what you bring to drafting."
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="dotaExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Mention past stacks, captaining experience, or tournaments played."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I am available for lineup tryouts and competitive matches.</span>
                </label>
              </div>
            )}

            {/* MLBB FORM */}
            {gameTitle === 'lineups_mlbb' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-emerald-300">
                    MLBB Lineups · Mobile MOBA Tryout Form
                  </h4>
                </div>
                <Input name="mlbbIgn" label="IGN" placeholder="e.g. PlayerName" req onChange={handleChange} caps />
                <Input name="mlbbUid" label="UID" placeholder="Your in-game UID" req onChange={handleChange} />
                <Input name="mlbbRank" label="PLAYER RANK" placeholder="Current rank / peak rank" req onChange={handleChange} />
                <Input name="mlbbFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="mlbbPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="mlbbEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="mlbbEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="mlbbDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <TextArea
                  name="mlbbWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="How do you approach your MLBB lane and teamfights?"
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="mlbbExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Short note on past ranks, squads, or custom tournament runs."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I am available for lineup tryouts and competitive matches.</span>
                </label>
              </div>
            )}

            {/* FREE FIRE MAX FORM */}
            {gameTitle === 'lineups_freefire_max' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-purple-300">
                    Free Fire MAX Lineups Tryout Form
                  </h4>
                </div>
                <Input name="ffFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="ffPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="ffEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="ffEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="ffDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <TextArea
                  name="ffWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="Tell us how you approach FF MAX strategy and close-quarters combat."
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="ffExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Mention high-tier ranked grind, custom rooms, or events you’ve clutched."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I am available for lineup tryouts and competitive matches.</span>
                </label>
              </div>
            )}

            {/* CS2 FORM */}
            {gameTitle === 'lineups_cs2' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-lime-300">
                    CS2 Lineups · Tactical FPS Tryout Form
                  </h4>
                </div>
                <Input name="cs2FullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="cs2Phone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="cs2Email" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="cs2Enrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="cs2DeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <Input name="cs2Elo" label="ELO / Rank" placeholder="Your current ELO or rank" req onChange={handleChange} inputMode="numeric" />
                <TextArea
                  name="cs2Why"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="What roles/maps are your comfort picks and how do you handle pressure rounds?"
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="cs2Experience"
                  label="Competitive Experience (optional)"
                  placeholder="Mention LAN runs, Faceit stacks, or previous team setups."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <Input name="cs2SteamUrl" label="Steam URL" placeholder="https://steamcommunity.com/id/..." type="url" req onChange={handleChange} />
                <label className="flex items-start gap-2.5 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I am available for lineup tryouts and competitive matches.</span>
                </label>
              </div>
            )}

            {/* CODM FORM */}
            {gameTitle === 'lineups_codm' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                  <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-teal-300">
                    CODM Lineups · Mobile FPS Tryout Form
                  </h4>
                </div>
                <Input name="codmIgn" label="IGN" placeholder="e.g. PlayerName" req onChange={handleChange} caps />
                <Input name="codmUid" label="UID" placeholder="Your in-game UID" req onChange={handleChange} />
                <Input name="codmRank" label="RANK (Current / Peak)" placeholder="e.g. Legendary / Grandmaster" req onChange={handleChange} />
                <Input name="codmFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="codmPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="codmEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
                <Input name="codmEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
                <Input name="codmDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
                <TextArea
                  name="codmWhy"
                  label="Why you want to join Playstorm Lineups"
                  placeholder="What primary role do you play in CODM and how do you coordinate with your squad?"
                  req
                  onChange={handleChange}
                />
                <TextArea
                  name="codmExperience"
                  label="Competitive Experience (optional)"
                  placeholder="Mention ranks, team scrims, or tournament history."
                  onChange={handleChange}
                  hint="Optional, but highly helpful for trial scouts."
                />
                <label className="flex items-start gap-2.5 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono">
                  <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                  <span>I confirm that I am available for lineup tryouts and competitive matches.</span>
                </label>
              </div>
            )}

            {/* STATUS ACTIONS */}
            <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
              {status === 'submitting' && (
                <p className="text-center text-xs font-mono uppercase tracking-[0.18em] text-purple-300 animate-pulse">
                  // TRANSMITTING YOUR COMPETITIVE APPLICATION TO PLAYSTORM HQ...
                </p>
              )}
              {status === 'error' && (
                <p className="rounded-xl border border-red-500/50 bg-[#1A0B10] px-4 py-2.5 text-center text-xs font-bold text-red-500 font-mono">
                  ❌ APPLICATION TRANSMISSION FAILED. CORRECT FIELDS AND RESEND PAYLOAD.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <MagneticElement className="flex-1">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    onClick={playTactileClick}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/20 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10"
                  >
                    <Send className="w-3.5 h-3.5" /> {status === 'submitting' ? 'TRANSMITTING...' : 'SEND PROFILE'}
                  </button>
                </MagneticElement>
                
                <MagneticElement className="flex-1">
                  <button
                    type="button"
                    onClick={() => { playTactileClick(); setGameTitle(''); setFormData({}); setStatus('idle') }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    ← BACK TO GRID
                  </button>
                </MagneticElement>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Input Helper
function Input({ label, name, type = "text", placeholder, req = false, onChange, caps = false, pattern, maxLength, inputMode, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200">
        {label} {req && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={req}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => {
          if (caps) e.target.value = e.target.value.toUpperCase()
          onChange(e)
        }}
        className={`w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white outline-none transition focus:border-purple-500 focus:bg-black/80 font-mono ${caps ? 'uppercase' : ''}`}
      />
      {hint && <p className="text-[10px] text-gray-500 font-mono mt-1">{hint}</p>}
    </div>
  )
}

// TextArea Helper
function TextArea({ label, name, placeholder, req = false, onChange, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200">
        {label} {req && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        required={req}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white outline-none transition min-h-[110px] resize-y focus:border-purple-500 focus:bg-black/80 font-mono"
      />
      {hint && <p className="text-[10px] text-gray-500 font-mono mt-1">{hint}</p>}
    </div>
  )
}