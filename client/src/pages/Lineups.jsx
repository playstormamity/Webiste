import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import arenaBgmi from '../assets/arena_bgmi1.webp'
import arenaValo from '../assets/arena_valo1.webp'
import arenaDota from '../assets/arena_dota1.webp'
import arenaMlbb from '../assets/arena_mlbb1.webp'
import arenaCs from '../assets/arena_cs1.webp'
import arenaFfm from '../assets/arena_ffm1.webp'
import arenaCodm from '../assets/arena_codm1.webp'

// Helper Component for Header
const PageHeader = () => (
  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 px-5 py-6 sm:px-8 sm:py-7 backdrop-blur-md">
    <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-600/40 blur-3xl" />
    <div className="absolute left-0 bottom-0 h-32 w-32 -translate-x-1/3 translate-y-1/3 rounded-full bg-pink-500/30 blur-3xl" />

    <div className="relative space-y-3">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">
        #Lineups · Competitive Games
      </p>
      <h2 className="font-display text-3xl sm:text-4xl text-white">
        Lineups Registration
      </h2>
      <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
        Apply for BGMI, Valorant, Dota 2, MLBB, Free Fire MAX, CS2 and CODM lineups. Shortlisted players will be contacted for tryouts and scrims.
      </p>
    </div>
  </div>
)

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const games = [
  { id: 'lineups_bgmi', title: 'Battlegrounds Mobile India', short: 'BGMI', bg: arenaBgmi },
  { id: 'lineups_valorant', title: 'VALORANT', short: 'VALORANT', bg: arenaValo },
  // Temporary: reuse BGMI / VALO visuals for now – to be replaced with per‑game art
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
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-purple-400" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl text-white tracking-tight">Lineups application received</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Thanks for registering. Your details have been sent to the Playstorm Lineups team for review.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* WhatsApp CTA */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 text-center">Stay in the loop</p>
              <a
                href="https://chat.whatsapp.com/I8kG0tt6DCc9yL5eyZgpEe"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Join WhatsApp Group</p>
                    <p className="text-[11px] text-gray-500">Updates & announcements</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <button
                onClick={onClose}
                className="w-full rounded-xl border border-white/8 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 hover:border-white/15 transition"
              >
                Close
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
      className="relative space-y-10 px-4 py-6 text-[#E8EEF4] sm:px-6 sm:py-8"
    >

      {/* SUCCESS MODAL */}
      {status === 'success' && (
        <SuccessModal onClose={() => {
          setStatus('idle')
          setGameTitle('')
          setFormData({})
        }} />
      )}

      {/* PAGE HEADER */}
      <div className="relative z-10">
        <PageHeader />
      </div>

      {/* INFO / CONTEXT ROW – softer, matches home */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-display uppercase tracking-[0.26em] text-purple-200">
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">#Lineups</span>
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Competitive Trials</span>
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Amity University Noida</span>
        </div>
        <p className="max-w-xl text-[12px] sm:text-sm text-gray-300">
          One clean form per game. Pick your title, drop your real details, and we&apos;ll reach out on WhatsApp / Discord if you match what the roster needs.
        </p>
      </div>

      {/* GAME SELECTION CARDS – minimal info, just game select */}
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            onClick={() => handleGameSelect(game.id)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex h-40 flex-col justify-between overflow-hidden rounded-3xl border px-4 py-4 text-left transition backdrop-blur-sm sm:h-44
              ${gameTitle === game.id
                ? 'border-purple-400 bg-black/60 shadow-2xl shadow-purple-900/40'
                : 'border-white/10 bg-black/50 hover:border-purple-400'}
            `}
          >
            {/* Background image for featured games */}
            {game.bg && (
              <div className="pointer-events-none absolute inset-0 -z-10">
                <img
                  src={game.bg}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-35 group-hover:opacity-45 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              </div>
            )}

            <div className="space-y-1 relative z-10">
              <h3 className="font-['Rajdhani',sans-serif] text-xl sm:text-2xl font-semibold leading-tight tracking-[0.14em] text-[#F9FAFB]">
                {game.short}
              </h3>
              <p className="text-[11px] font-['Share_Tech_Mono',monospace] uppercase tracking-[0.22em] text-purple-200/80">
                {game.title}
              </p>
            </div>

            {/* Border pulse on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 rounded-xl border border-purple-400/40 blur-[1px]" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* FORM SECTION */}
      {gameTitle && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-7 backdrop-blur-md shadow-2xl shadow-black/60"
        >

          {/* BGMI FORM */}
          {gameTitle === 'lineups_bgmi' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-orange-300">
                BGMI Lineups · Mobile Squad
              </h4>
              <Input name="bgmiIgn" label="BGMI IGN" placeholder="e.g. PlayerName" req onChange={handleChange} caps />
              <Input name="bgmiUid" label="UID" placeholder="Your in-game UID" req onChange={handleChange} />
              <Input name="bgmiFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="bgmiPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
              <Input name="bgmiEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
              <Input name="bgmiEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
              <Input name="bgmiDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
              <TextArea
                name="bgmiWhy"
                label="Why you want to be part of Lineups"
                placeholder="Tell us your mindset, goals, and what you bring to the roster."
                req
                onChange={handleChange}
              />
              <TextArea
                name="bgmiExperience"
                label="Experience (optional)"
                placeholder="Share past teams, tournaments, or clutch moments. Keep it concise but specific."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that the details entered are accurate and I am available for lineup training and matches.</span>
              </label>
            </div>
          )}

          {/* VALORANT FORM */}
          {gameTitle === 'lineups_valorant' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-red-300">
                Valorant Lineups · Tactical FPS
              </h4>
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
                label="Why you want to be part of Lineups"
                placeholder="What kind of role do you see yourself in and why this roster?"
                req
                onChange={handleChange}
              />
              <TextArea
                name="valoExperience"
                label="Experience (optional)"
                placeholder="Any previous teams, scrims, or notable performances you’re proud of."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I will follow training schedules and participate in matches when selected.</span>
              </label>
            </div>
          )}

          {/* DOTA 2 FORM */}
          {gameTitle === 'lineups_dota2' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-blue-300">
                Dota 2 Lineups · MOBA
              </h4>
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
                label="Why you want to be part of Lineups"
                placeholder="Share how you play around your team and what kind of player you are."
                req
                onChange={handleChange}
              />
              <TextArea
                name="dotaExperience"
                label="Experience (optional)"
                placeholder="Mention past stacks, captaining experience, or tournaments played."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I am available for lineup training and competitive matches.</span>
              </label>
            </div>
          )}

          {/* MLBB FORM */}
          {gameTitle === 'lineups_mlbb' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-emerald-300">
                MLBB Lineups · Mobile MOBA
              </h4>
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
                label="Why you want to be part of Lineups"
                placeholder="How do you like to play MLBB and why this lineup fits you?"
                req
                onChange={handleChange}
              />
              <TextArea
                name="mlbbExperience"
                label="Experience (optional)"
                placeholder="Short note on past ranks, squads, or tourneys you’ve played."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I am available for lineup training and competitive matches.</span>
              </label>
            </div>
          )}

          {/* FREE FIRE MAX FORM */}
          {gameTitle === 'lineups_freefire_max' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-purple-300">
                Free Fire MAX Lineups
              </h4>
              <Input name="ffFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="ffPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
              <Input name="ffEmail" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
              <Input name="ffEnrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
              <Input name="ffDeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
              <TextArea
                name="ffWhy"
                label="Why you want to be part of Lineups"
                placeholder="Tell us how you approach FF MAX and what kind of teammate you are."
                req
                onChange={handleChange}
              />
              <TextArea
                name="ffExperience"
                label="Experience (optional)"
                placeholder="Mention ranked grind, customs, or events you’ve played."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I am available for lineup training and competitive matches.</span>
              </label>
            </div>
          )}

          {/* CS2 FORM */}
          {gameTitle === 'lineups_cs2' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-lime-300">
                CS2 Lineups · Tactical FPS
              </h4>
              <Input name="cs2FullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="cs2Phone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
              <Input name="cs2Email" label="Email ID" placeholder="you@example.com" type="email" req onChange={handleChange} />
              <Input name="cs2Enrollment" label="Enrollment" placeholder="Your enrollment ID" req onChange={handleChange} />
              <Input name="cs2DeptYear" label="Department+Year" placeholder="e.g. CSE, 2nd Year" req onChange={handleChange} caps />
              <Input name="cs2Elo" label="ELO / Rank" placeholder="Your current ELO or rank" req onChange={handleChange} inputMode="numeric" />
              <TextArea
                name="cs2Why"
                label="Why you want to be part of Lineups"
                placeholder="What roles/maps are your comfort picks and why do you want this lineup?"
                req
                onChange={handleChange}
              />
              <TextArea
                name="cs2Experience"
                label="Experience (optional)"
                placeholder="LANs, Faceit, previous teams, or scrim history that shows your experience."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <Input name="cs2SteamUrl" label="Steam URL" placeholder="https://steamcommunity.com/id/..." type="url" req onChange={handleChange} />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I am available for lineup training and competitive matches.</span>
              </label>
            </div>
          )}

          {/* CODM FORM */}
          {gameTitle === 'lineups_codm' && (
            <div className="space-y-4">
              <h4 className="text-xs font-display font-semibold uppercase tracking-[0.22em] text-teal-300">
                CODM Lineups · Mobile FPS
              </h4>
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
                label="Why you want to be part of Lineups"
                placeholder="What role do you play in CODM and how do you like to support your squad?"
                req
                onChange={handleChange}
              />
              <TextArea
                name="codmExperience"
                label="Experience (optional)"
                placeholder="Mention ranks, scrims, or tournaments you’ve played."
                onChange={handleChange}
                hint="Optional, but helps staff understand your level."
              />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
                <input type="checkbox" name="lineupsAck" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I am available for lineup training and competitive matches.</span>
              </label>
            </div>
          )}

        {/* STATUS */}
        {status === 'submitting' && (
          <p className="text-center text-sm font-['Share_Tech_Mono',monospace] uppercase tracking-[0.18em] text-purple-300">
            // TRANSMITTING YOUR APPLICATION TO HQ...
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-lg border border-[#FF2D55]/50 bg-[#1A0B10] px-4 py-2 text-center text-sm font-bold text-[#FF2D55]">
            ❌ TRANSMISSION FAILED — PLEASE REVIEW YOUR FIELDS AND TRY AGAIN.
          </p>
        )}

        {/* SUBMIT */}
        <motion.button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded border border-purple-500 bg-[#120322] px-6 py-3 font-['Share_Tech_Mono',monospace] text-[12px] uppercase tracking-[0.24em] text-[#E8EEF4] transition hover:bg-purple-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'SENDING PAYLOAD...' : 'CONFIRM REGISTRATION'}
        </motion.button>

          {/* BACK */}
      <button
        type="button"
        onClick={() => { setGameTitle(''); setFormData({}); setStatus('idle') }}
        className="w-full rounded border border-purple-500/40 px-6 py-3 font-['Share_Tech_Mono',monospace] text-[11px] uppercase tracking-[0.22em] text-[#E8EEF4]/70 transition hover:border-purple-400 hover:text-[#E8EEF4]"
      >
        ← BACK TO GAME GRID
      </button>
        </motion.form>
      )}
    </motion.div>
  )
}

// Input Helper
function Input({ label, name, type = "text", placeholder, req = false, onChange, caps = false, pattern, maxLength, inputMode, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-['Share_Tech_Mono',monospace] uppercase tracking-[0.22em] text-purple-200">
        {label} {req && <span className="text-[#FF2D55]">*</span>}
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
        className={`w-full rounded-2xl border border-purple-500/30 bg-black/50 px-3 py-2.5 text-sm text-[#E8EEF4] outline-none transition focus:border-purple-300 focus:bg-black/70 ${caps ? 'uppercase' : ''}`}
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  )
}

// TextArea Helper
function TextArea({ label, name, placeholder, req = false, onChange, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-['Share_Tech_Mono',monospace] uppercase tracking-[0.22em] text-purple-200">
        {label} {req && <span className="text-[#FF2D55]">*</span>}
      </label>
      <textarea
        name={name}
        required={req}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-2xl border border-purple-500/30 bg-black/50 px-3 py-2.5 text-sm text-[#E8EEF4] outline-none transition min-h-[120px] resize-y focus:border-purple-300 focus:bg-black/70"
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  )
}

// Player Fields Helper
function PlayerFields({ title, ignName, fullNameName, phoneName, typeName, onChange, data, playerNum = 1, phoneRequired = false, requiredAll = false }) {
  const isCaptain = playerNum === 1
  const bgClass = isCaptain ? 'bg-white/10 border-purple-500/40 backdrop-blur-md' : 'bg-white/5 border-purple-500/25 backdrop-blur-md'
  const isRequired = requiredAll ? true : playerNum === 1
  const typeRequired = requiredAll ? true : playerNum === 1

  return (
    <div className={`p-4 rounded-xl border ${bgClass} space-y-3`}>
      <h4 className="text-xs font-bold text-purple-300 uppercase">{title}</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name={fullNameName} label="Full Name" placeholder="" req={isRequired} onChange={onChange} caps />
        <Input name={ignName} label="IGN" placeholder="In-Game Name" req={isRequired} onChange={onChange} />
        <Input name={phoneName} label={`Player ${playerNum} Phone`} placeholder="WhatsApp Number" req={phoneRequired || isRequired || requiredAll} type="tel" inputMode="numeric" onChange={onChange} />
        <Input name={typeName} label="Player Type" placeholder="e.g. Assaulter" req={typeRequired} onChange={onChange} caps />
      </div>
    </div>
  )
}