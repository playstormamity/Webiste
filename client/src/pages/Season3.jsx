import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Trophy, Swords, Target, Gamepad2, Crown, Zap, Clock, Sparkles } from 'lucide-react'
import { TiltCard, GlowCard } from '../components/VisualEffects'
import { createPortal } from 'react-dom'

// --- GAME CONFIG ---
const games = [
  { id: 's3_valorant', title: 'Valorant', mode: '5v5', format: 'Single Elim · BO1 (Semi/Final BO3)', fee: '₹100/person (₹500/team)', prize: '₹25K / ₹15K / ₹10K', accent: 'from-red-500/20 to-rose-500/20', border: 'hover:border-red-400/60', color: 'red', isTeam: true, teamSize: 5, subHead: 'Bhavansh Kaushik' },
  { id: 's3_bgmi', title: 'BGMI', mode: 'Squad (4)', format: 'Points-based · 3-4 Classic', fee: '₹100/person (₹400/team)', prize: '₹16K / ₹12K / ₹8K', accent: 'from-orange-500/20 to-yellow-500/20', border: 'hover:border-orange-400/60', color: 'orange', isTeam: true, teamSize: 4, subHead: 'Rithwik Sahni' },
  { id: 's3_clashroyale', title: 'Clash Royale', mode: '1v1', format: 'Single Elim · BO3 (Final BO5)', fee: '₹100/person', prize: '₹3K / ₹2K / ₹1K', accent: 'from-blue-500/20 to-cyan-500/20', border: 'hover:border-blue-400/60', color: 'blue', isTeam: false },
  { id: 's3_tekken', title: 'Tekken 8', mode: '1v1', format: 'Double Elim · BO3 (Final BO5)', fee: '₹100/person', prize: '₹3K / ₹2K / ₹1K', accent: 'from-emerald-500/20 to-teal-500/20', border: 'hover:border-emerald-400/60', color: 'emerald', isTeam: false, subHead: 'Leishangthem Jorish' },
  { id: 's3_fc26', title: 'FC 26', mode: '1v1', format: 'Double Elim · BO1 (Final BO3)', fee: '₹100/person', prize: '₹3K / ₹2K / ₹1K', accent: 'from-lime-500/20 to-green-500/20', border: 'hover:border-lime-400/60', color: 'lime', isTeam: false }
]

// --- INPUT HELPER ---
function Input({ label, name, type = 'text', placeholder, req, onChange, caps, inputMode }) {
  return (
    <div className="space-y-1.5 group/input">
      <label className="text-[11px] font-bold uppercase tracking-wider text-purple-200/80 transition-colors group-focus-within/input:text-purple-400">
        {label} {req && <span className="text-pink-500">*</span>}
      </label>
      <div className="relative">
        <input type={type} name={name} required={req} placeholder={placeholder} inputMode={inputMode}
          onChange={(e) => { if (caps) e.target.value = e.target.value.toUpperCase(); onChange(e) }}
          className={`w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500 focus:bg-black/80 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] ${caps ? 'uppercase' : ''}`}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-300 rounded-b-lg" />
      </div>
    </div>
  )
}

// --- PLAYER FIELDS BLOCK ---
function PlayerBlock({ title, prefix, onChange, required = false, gameId }) {
  const isValo = gameId === 's3_valorant'
  const isBgmi = gameId === 's3_bgmi'

  return (
    <div className={`p-5 rounded-2xl border-l-4 transition-all duration-300 bg-black/60 border-y border-r ${required ? 'border-l-purple-500 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : 'border-l-gray-700 border-white/5'} space-y-4`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-purple-300 uppercase tracking-widest">{title}</h4>
        {required && (
          <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-purple-300">Required</span>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name={`${prefix}Name`} label="Full Name" placeholder="" req={required} onChange={onChange} caps />
        {isValo ? (
          <Input name={`${prefix}Ign`} label="Riot ID" placeholder="Name#Tag" req={required} onChange={onChange} />
        ) : (
          <Input name={`${prefix}Ign`} label="IGN" placeholder="In-Game Name" req={required} onChange={onChange} />
        )}
        <Input name={`${prefix}Phone`} label="WhatsApp" placeholder="Phone number" type="tel" inputMode="numeric" req={required} onChange={onChange} />
        <Input name={`${prefix}College`} label="College" placeholder="College name" req={required} onChange={onChange} caps />
        <Input name={`${prefix}Discord`} label="Discord Username" placeholder="@username" req={required} onChange={onChange} />
        {isBgmi && (
          <Input name={`${prefix}Uid`} label="BGMI UID" placeholder="Character ID" req={required} onChange={onChange} />
        )}
      </div>
    </div>
  )
}

// --- SUCCESS MODAL ---
function SuccessModal({ onClose, gameName }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition z-10">
          <X className="w-4 h-4" />
        </button>
        <div className="relative p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-purple-400" strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl text-white">You're Registered! 🔥</h3>
            <p className="text-sm text-gray-400">Your <span className="text-white font-semibold">{gameName}</span> slot for Season 3 is locked. Stay tuned for match schedules on Discord.</p>
          </div>
          <div className="h-px bg-white/5" />
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 text-center">Stay connected</p>
            <a href="https://discord.gg/playstorm" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Join Discord Server</p>
                  <p className="text-[11px] text-gray-500">Matches, brackets & updates</p>
                </div>
              </div>
            </a>
            <button onClick={onClose} className="w-full rounded-xl border border-white/8 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition">Close</button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

// --- MAIN PAGE ---
export default function Season3() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle')

  const registrationOpen = true // Toggle to false to lock registrations

  const gameConfig = games.find(g => g.id === selectedGame)

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleGameSelect = (id) => {
    setSelectedGame(id)
    setFormData({})
    setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    const gc = gameConfig
    let fields = [
      { name: '📌 Tournament', value: `Season 3 — ${gc.title}`, inline: false },
      { name: '🎮 Mode', value: gc.mode, inline: true },
      { name: '🏆 Format', value: gc.format, inline: true },
      { name: '💸 Fee', value: gc.fee, inline: true }
    ]

    if (gc.isTeam) {
      fields.push({ name: '🛡️ Team Name', value: formData.teamName || '-', inline: false })
      const size = gc.id === 's3_valorant' ? 5 : 4
      for (let i = 1; i <= size; i++) {
        const p = `p${i}`
        let playerDetails = `${formData[`${p}Name`] || '-'} | IGN: ${formData[`${p}Ign`] || '-'}`
        if (gc.id === 's3_bgmi') {
          playerDetails += ` | UID: ${formData[`${p}Uid`] || '-'}`
        }
        playerDetails += `\nPhone: ${formData[`${p}Phone`] || '-'} | College: ${formData[`${p}College`] || '-'}\nDiscord: ${formData[`${p}Discord`] || '-'}`
        fields.push({ name: `${i === 1 ? '👑 Captain' : `👥 Player ${i}`}`, value: playerDetails, inline: false })
      }
      if (gc.id === 's3_bgmi' && formData.p5Name) {
        let p5Details = `${formData.p5Name} | IGN: ${formData.p5Ign || '-'} | UID: ${formData.p5Uid || '-'}\nPhone: ${formData.p5Phone || '-'} | College: ${formData.p5College || '-'}\nDiscord: ${formData.p5Discord || '-'}`
        fields.push({ name: `👥 Player 5 (Sub)`, value: p5Details, inline: false })
      }
    } else {
      fields.push(
        { name: '👤 Name', value: formData.soloName || '-', inline: true },
        { name: '🎮 IGN', value: formData.soloIgn || '-', inline: true },
        { name: '📞 Phone', value: formData.soloPhone || '-', inline: true },
        { name: '🏫 College', value: formData.soloCollege || '-', inline: true },
        { name: '👾 Discord', value: formData.soloDiscord || '-', inline: true }
      )
    }

    const payload = {
      embeds: [{
        title: `📝 Season 3 Registration: ${gc.title}`,
        color: 0x9333ea,
        fields,
        footer: { text: 'PlayStorm Season 3 Registration' },
        timestamp: new Date().toISOString()
      }]
    }

    try {
      const res = await fetch('/api/register-discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: gc.id, payload })
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setFormData({})
    } catch {
      alert('Registration failed. Please try again.')
      setStatus('error')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-16 pb-12 relative">

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {status === 'success' && <SuccessModal gameName={gameConfig?.title} onClose={() => { setStatus('idle'); setSelectedGame(null); setFormData({}) }} />}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative text-center space-y-6 pt-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-5">
          {registrationOpen ? (
            <div className="inline-block rounded border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="relative inline-flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Registrations Open
            </div>
          ) : (
            <div className="inline-block rounded border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-yellow-300">
              <Clock className="w-3 h-3 inline mr-1" /> Registration Dates: TBA
            </div>
          )}
          <div className="inline-block ml-2 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
            May 2026 · Online Tournament
          </div>
          <h1 className="font-display text-7xl sm:text-9xl font-black uppercase leading-[0.85] text-white tracking-tighter">
            Play<span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500">Storm</span> <span className="block text-7xl sm:text-9xl text-white">Season 3</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Multi-title online esports showdown. 5 games. ₹1,10,000 prize pool. Open to all college students.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl border border-purple-500/30 bg-purple-500/10 px-6 py-4 text-center shadow-[0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-display text-3xl font-extrabold text-white">₹1.1L</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300 mt-1">Prize Pool</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-display text-3xl font-extrabold text-white">5</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mt-1">Game Titles</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-display text-3xl font-extrabold text-white">₹100</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mt-1">Per Person</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRIZE POOL SECTION */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">Prize Pool</h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map(g => (
            <TiltCard key={g.id}>
              <GlowCard className="h-full">
                <div className={`rounded-2xl border border-white/10 bg-black/60 p-5 h-full transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-white">{g.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{g.mode}</span>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center"><span className="text-yellow-400 flex items-center gap-1.5">🥇 <span className="font-medium text-gray-300">1st Place</span></span><span className="text-white font-extrabold">{g.prize.split('/')[0].trim()}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-400 flex items-center gap-1.5">🥈 <span className="font-medium text-gray-300">2nd Place</span></span><span className="text-gray-300 font-bold">{g.prize.split('/')[1].trim()}</span></div>
                    <div className="flex justify-between items-center"><span className="text-amber-600 flex items-center gap-1.5">🥉 <span className="font-medium text-gray-300">3rd Place</span></span><span className="text-gray-400 font-semibold">{g.prize.split('/')[2].trim()}</span></div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[10px] uppercase tracking-[0.15em] text-purple-400 font-bold">{g.format}</div>
                </div>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* GAME SELECTOR */}
      <section id="register">
        <div className="space-y-3 mb-8">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">Register Now</p>
          <h2 className="font-display text-2xl text-white sm:text-3xl">Pick Your Game 🎮</h2>
          <p className="max-w-2xl text-sm text-gray-300">Select a title below to view details and register.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(g => (
            <TiltCard key={g.id}>
              <GlowCard
                onClick={() => handleGameSelect(g.id)}
                className={`group relative w-full h-full rounded-xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer ${selectedGame === g.id ? `border-purple-500/60 bg-gradient-to-br ${g.accent}` : `border-white/10 bg-black/60 backdrop-blur-md ${g.border}`}`}
              >
                <h3 className="font-display text-base font-bold text-white">{g.title}</h3>
                <p className="mt-1 text-xs text-gray-400">{g.mode} · {g.format.split('·')[0].trim()}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-300">{g.prize.split('/')[0].trim()}</span>
                  <span className="text-[10px] text-gray-500">{g.fee}</span>
                </div>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* TBA BANNER */}
      {selectedGame && !registrationOpen && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-yellow-500/30 bg-yellow-900/10 p-8 text-center space-y-4">
          <Clock className="w-10 h-10 text-yellow-400 mx-auto" />
          <h3 className="font-display text-2xl text-white">Registrations Opening Soon</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Registration dates for <span className="text-white font-semibold">{gameConfig?.title}</span> are TBA.
            Follow us on Discord & Instagram for announcements.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a href="https://discord.gg/playstorm" target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#5865F2] hover:bg-[#5865F2]/20 transition">
              Join Discord
            </a>
            <a href="https://instagram.com/playstorm.amity" target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-pink-400 hover:bg-pink-500/20 transition">
              Follow Instagram
            </a>
          </div>
          <button onClick={() => { setSelectedGame(null) }}
            className="text-xs text-gray-500 hover:text-white transition mt-2">← Back to games</button>
        </motion.div>
      )}

      {/* REGISTRATION FORM (only when registrationOpen = true) */}
      <AnimatePresence mode="wait">
        {selectedGame && gameConfig && registrationOpen && (
          <motion.form key={selectedGame} onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-6 rounded-xl border border-white/10 bg-black/60 p-6">

            {/* Game Info Banner */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-900/10 p-4 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase">🎯 {gameConfig.title} — Season 3</h4>
              <div className="space-y-1.5 text-xs text-gray-300">
                <p className="flex items-center gap-2"><span className="text-purple-400">✓</span> Mode: {gameConfig.mode}</p>
                <p className="flex items-center gap-2"><span className="text-purple-400">✓</span> Format: {gameConfig.format}</p>
                <p className="flex items-center gap-2"><span className="text-purple-400">✓</span> Prize Pool: {gameConfig.prize}</p>
                <p className="flex items-center gap-2"><span className="text-purple-400">✓</span> Entry Fee: {gameConfig.fee}</p>
                <p className="flex items-center gap-2"><span className="text-purple-400">✓</span> Platform: Online (Discord)</p>
              </div>
            </div>

            {/* TEAM FORM */}
            {gameConfig.isTeam && (
              <div className="space-y-4">
                <Input name="teamName" label="Team Name" placeholder="Your team name" req onChange={handleChange} caps />
                {Array.from({ length: gameConfig.teamSize }, (_, i) => (
                  <PlayerBlock key={i} title={i === 0 ? '👑 Captain' : `👥 Player ${i + 1}`} prefix={`p${i + 1}`} onChange={handleChange} required={i === 0} gameId={gameConfig.id} />
                ))}
                {gameConfig.id === 's3_bgmi' && (
                  <PlayerBlock title="👥 Player 5 (Optional)" prefix="p5" onChange={handleChange} required={false} gameId={gameConfig.id} />
                )}
              </div>
            )}

            {/* SOLO FORM */}
            {!gameConfig.isTeam && (
              <div className="space-y-4">
                <Input name="soloName" label="Full Name" placeholder="" req onChange={handleChange} caps />
                <Input name="soloIgn" label="In-Game Name / Tag" placeholder="Your IGN" req onChange={handleChange} />
                <Input name="soloPhone" label="WhatsApp Number" placeholder="Phone number" type="tel" inputMode="numeric" req onChange={handleChange} />
                <Input name="soloCollege" label="College Name" placeholder="Your college" req onChange={handleChange} caps />
                <Input name="soloDiscord" label="Discord Username" placeholder="@username" req onChange={handleChange} />
              </div>
            )}

            {/* Confirmations */}
            <label className="flex items-start gap-2 text-xs rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-3 text-emerald-100">
              <input type="checkbox" name="paid" required onChange={handleChange} className="mt-0.5" />
              <span>I have paid the registration fee of {gameConfig.fee}.</span>
            </label>
            <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100">
              <input type="checkbox" name="ack" required onChange={handleChange} className="mt-0.5" />
              <span>I confirm all details are correct and I agree to the tournament rules. I understand this is an online event conducted via Discord.</span>
            </label>

            {/* Status */}
            {status === 'submitting' && <p className="text-center text-sm text-purple-300 animate-pulse">Submitting your registration...</p>}
            {status === 'error' && <p className="rounded-lg bg-red-500/20 px-4 py-2 text-center text-sm font-bold text-red-300 border border-red-500/30">❌ Failed. Please try again.</p>}

            {/* Submit */}
            <motion.button type="submit" disabled={status === 'submitting'}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-bold uppercase tracking-widest text-white transition disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'submitting' ? 'Submitting...' : `Register for ${gameConfig.title}`}
            </motion.button>

            <button type="button" onClick={() => { setSelectedGame(null); setFormData({}); setStatus('idle') }}
              className="w-full rounded-lg border border-white/10 px-6 py-3 font-bold uppercase text-gray-300 hover:text-white transition text-sm">
              ← Back to Game Selection
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* EVENT HEAD */}
      <section className="text-center border-t border-white/10 pt-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Event Head</p>
        <p className="text-white font-bold text-lg">Kavya Sejwal</p>
        <p className="text-gray-500 text-xs mt-1">PlayStorm Esports Club · Amity University</p>
      </section>

    </motion.div>
  )
}
