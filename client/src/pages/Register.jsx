import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Sparkles, Send, Shield, Zap, Target } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const games = [
  { id: 'tekken', title: 'Tekken', subtitle: 'Live Registrations - LAN Faceoff', accent: 'from-red-500/20 to-rose-500/20', border: 'hover:border-red-400/60' },
  { id: 'fifa', title: 'FC25', subtitle: 'Live Registrations - Bring Your A-Game', accent: 'from-blue-500/20 to-cyan-500/20', border: 'hover:border-blue-400/60' },
  { id: 'minecraft', title: 'Minecraft PvP Arena', subtitle: 'Live Registrations - Java + Bedrock', accent: 'from-lime-500/15 to-green-500/15', border: 'hover:border-lime-400/60' },
  { id: 'bgmi_tdm', title: 'BGMI Battle Royale', subtitle: 'Live Registrations - Online (Discord + YouTube)', accent: 'from-orange-500/20 to-yellow-500/20', border: 'hover:border-orange-400/60' }
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
              <h3 className="font-display text-2xl text-white tracking-tight">Slot Locked successfully</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-mono">
                Prepare your squad for battle on <span className="text-white font-semibold">4-5 April</span>. Matches stream live on <span className="text-white font-semibold">Discord & YouTube</span>.
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

export default function Register() {
  const isClosed = false
  const activeGames = games.filter((game) => game.id === 'bgmi_tdm')
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle')
  const [gameTitle, setGameTitle] = useState('bgmi_tdm')

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

    if (gameTitle === 'bgmi_tdm') {
      const requiredFields = ['teamName', 'bgmiP1Ign', 'bgmiP1Name', 'bgmiP1Whatsapp', 'bgmiP1Type', 'bgmiPaid']
      const missingFields = requiredFields.filter(field => !formData[field])
      if (missingFields.length > 0) {
        alert(`Missing required fields: ${missingFields.join(', ')}`)
        setStatus('error')
        return
      }
    }

    let fields = []

    if (gameTitle === 'bgmi_tdm') {
      const formatBgmiPlayer = (num, ignKey, nameKey, phoneKey, typeKey) => {
        const ign = formData[ignKey] || '-'
        const name = formData[nameKey] || '-'
        const phone = formData[phoneKey] || '-'
        const type = formData[typeKey] || '-'
        return `IGN: ${ign} | Name: ${name}\nPhone: ${phone} | Type: ${type}`
      }
      fields = [
        { name: "📌 Event", value: "Weekly Wars: BGMI Clash", inline: false },
        { name: "🎯 Mode", value: "Battle Royale", inline: true },
        { name: "💻 Platform", value: "Online (Discord + YouTube)", inline: true },
        { name: "💸 Registration Fee", value: "Rs 200 per team (Paid)", inline: true },
        { name: "🛡️ Team Name", value: formData.teamName || '-', inline: false },
        { name: "👑 Captain (P1)", value: formatBgmiPlayer(1, "bgmiP1Ign", "bgmiP1Name", "bgmiP1Whatsapp", "bgmiP1Type"), inline: false },
      ]
    } else if (gameTitle === 'fifa') {
      fields = [
        { name: "📌 Event", value: "#Respawn - FIFA", inline: false },
        { name: "🎮 EA ID / Username", value: formData.fifaUsername, inline: true },
        { name: "🕹️ Platform", value: formData.fifaPlatform, inline: true },
        { name: "👤 Full Name", value: formData.fifaFullName, inline: true },
        { name: "🆔 Enrollment", value: formData.fifaEnrollment, inline: true },
        { name: "📞 Phone", value: formData.fifaPhone, inline: true },
      ]
    } else if (gameTitle === 'minecraft') {
      fields = [
        { name: "📌 Event", value: "#Respawn - Minecraft PvP Arena", inline: false },
        { name: "🎮 Edition", value: (formData.minecraftEdition || '-').toUpperCase(), inline: true },
        { name: "☕ Username", value: formData.minecraftUsername, inline: true },
        { name: "👤 Full Name", value: formData.fullName, inline: true },
        { name: "🆔 Enrollment", value: formData.enrollment, inline: true },
        { name: "📞 Phone", value: formData.minecraftPhone, inline: true },
      ]
    } else if (gameTitle === 'tekken') {
      fields = [
        { name: "📌 Event", value: "#Respawn - Tekken", inline: false },
        { name: "🥊 Player Tag", value: formData.tekkenUsername, inline: true },
        { name: "👤 Full Name", value: formData.tekkenFullName, inline: true },
        { name: "🆔 Enrollment", value: formData.tekkenEnrollment, inline: true },
        { name: "📞 Phone", value: formData.tekkenPhone, inline: true },
      ]
    }

    let payload = {}

    if (gameTitle === 'bgmi_tdm') {
      const formatBgmiPlayer = (num, ignKey, nameKey, phoneKey, typeKey) => {
        const ign = formData[ignKey] || '-'
        const name = formData[nameKey] || '-'
        const phone = formData[phoneKey] || '-'
        const type = formData[typeKey] || '-'
        return `IGN: ${ign} | Name: ${name}\nPhone: ${phone} | Type: ${type}`
      }
      const embed1 = {
        title: `📝 New Registration: Weekly Wars BGMI BR`,
        color: 0x9333ea,
        fields: fields,
        footer: { text: "Weekly Wars Registration System" },
        timestamp: new Date().toISOString()
      }
      const playerFields = [
        { name: "2️⃣ Player 2", value: formatBgmiPlayer(2, "bgmiP2Ign", "bgmiP2Name", "bgmiP2Whatsapp", "bgmiP2Type"), inline: false },
        { name: "3️⃣ Player 3", value: formatBgmiPlayer(3, "bgmiP3Ign", "bgmiP3Name", "bgmiP3Whatsapp", "bgmiP3Type"), inline: false },
        { name: "4️⃣ Player 4", value: formatBgmiPlayer(4, "bgmiP4Ign", "bgmiP4Name", "bgmiP4Whatsapp", "bgmiP4Type"), inline: false },
        { name: "5️⃣ Player 5 (Optional)", value: formatBgmiPlayer(5, "bgmiP5Ign", "bgmiP5Name", "bgmiP5Whatsapp", "bgmiP5Type"), inline: false },
      ]
      const embed2 = {
        title: `📋 Battle Royale Squad Members`,
        color: 0x9333ea,
        fields: playerFields,
        footer: { text: "Weekly Wars Registration System" },
        timestamp: new Date().toISOString()
      }
      payload = { embeds: [embed1, embed2] }
    } else {
      payload = {
        embeds: [{
          title: `📝 New Registration: ${gameTitle === 'fifa' ? 'FIFA' : gameTitle.toUpperCase()}`,
          color: 0x9333ea,
          fields: fields,
          footer: { text: "#Respawn Registration System" },
          timestamp: new Date().toISOString()
        }]
      }
    }

    const gameKey = gameTitle === 'fifa' ? 'valorant' : gameTitle === 'bgmi_tdm' ? 'bgmi' : gameTitle

    try {
      const response = await fetch('/api/register-discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: gameKey, payload })
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
          setGameTitle('bgmi_tdm')
          setFormData({})
        }} />
      )}

      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-[58%]">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Weekly Wars</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl uppercase">
              Tournament <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Registrations</span> ⚔️
            </h1>
          </CursorPhysicsDistortion>
        </div>
        
        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Lock your team slot for Weekly Wars: BGMI Battle Royale. Compete inside private custom lobbies streamed live on YouTube with real-time casting.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-black/50 to-pink-900/20 p-5 shadow-xl shadow-purple-900/20">
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-purple-200">
          <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1">Weekly Wars: BGMI Clash</span>
          <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1">4-5 April 2026</span>
          <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1">Online: Discord & YouTube</span>
        </div>
        <p className="mt-4 text-xs md:text-sm leading-relaxed text-gray-300 font-mono">
          Squad slots are currently live. The registration entry cost is <span className="text-pink-400 font-bold">₹200 per team</span>. Complete payment details are synchronized within your roster fields.
        </p>
      </div>

      {isClosed && (
        <GlowCard className="rounded-2xl border border-red-500/30 bg-red-900/20 p-6 text-center shadow-xl shadow-red-900/20">
          <h3 className="font-display text-2xl text-red-400 uppercase font-bold">Registrations Locked 🛑</h3>
          <p className="mt-2 text-xs text-gray-300 font-mono">
            All tournament slots are officially locked due to maximum participant capacity. Standby for bracket listings!
          </p>
        </GlowCard>
      )}

      {/* GAME SELECTION CARDS */}
      {!isClosed && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activeGames.map((game) => (
            <TiltCard key={game.id}>
              <GlowCard
                onClick={() => handleGameSelect(game.id)}
                onMouseEnter={playDigitalHover}
                className={`group relative rounded-2xl border px-4 py-3 text-left transition duration-300 cursor-pointer min-h-[110px] sm:px-5 sm:py-4 select-none w-full
                  ${gameTitle === game.id ? `border-purple-500/60 bg-gradient-to-br ${game.accent}` : `border-white/10 ${game.border}`}
                `}
              >
                <h3 className="font-display text-sm font-bold text-white uppercase">{game.title}</h3>
                <p className="mt-2 text-xs text-gray-300 font-mono leading-relaxed">{game.subtitle}</p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      )}

      {/* FORM SECTION */}
      {!isClosed && gameTitle && (
        <motion.form 
          onSubmit={handleSubmit} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* BGMI FORM */}
          {gameTitle === 'bgmi_tdm' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-orange-500/30 bg-orange-900/10 p-4 space-y-2">
                <h4 className="text-xs font-bold text-orange-400 uppercase font-mono tracking-widest flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Tournament Details</h4>
                <div className="space-y-1.5 text-xs text-gray-300 font-mono">
                  <p className="flex items-center gap-2"><span className="text-orange-400">✓</span> Event: Weekly Wars - BGMI BR</p>
                  <p className="flex items-center gap-2"><span className="text-orange-400">✓</span> Format: Battle Royale Format</p>
                  <p className="flex items-center gap-2"><span className="text-orange-400">✓</span> Team Size: 4 Players + 1 Sub</p>
                  <p className="flex items-center gap-2"><span className="text-orange-400">✓</span> Registration: ₹200 entry slot fee</p>
                </div>
              </div>

              <GlowCard className="rounded-xl border border-purple-500/30 bg-purple-900/10 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-300 font-mono">Payment Protocol</p>
                <p className="text-xs text-gray-300 mt-2 font-mono leading-relaxed">Transmit your ₹200 team slot transfer using verified links, then fill your squad credentials below.</p>
              </GlowCard>

              <Input name="teamName" label="Team Name" placeholder="Your team name" req onChange={handleChange} caps />
              
              <div className="space-y-4">
                <PlayerFields title="👑 Captain Details (Player 1)" ignName="bgmiP1Ign" fullNameName="bgmiP1Name" phoneName="bgmiP1Whatsapp" typeName="bgmiP1Type" onChange={handleChange} data={formData} playerNum={1} phoneRequired={true} />
                <PlayerFields title="👥 Player 2 Details" ignName="bgmiP2Ign" fullNameName="bgmiP2Name" phoneName="bgmiP2Whatsapp" typeName="bgmiP2Type" onChange={handleChange} data={formData} playerNum={2} />
                <PlayerFields title="👥 Player 3 Details" ignName="bgmiP3Ign" fullNameName="bgmiP3Name" phoneName="bgmiP3Whatsapp" typeName="bgmiP3Type" onChange={handleChange} data={formData} playerNum={3} />
                <PlayerFields title="👥 Player 4 Details" ignName="bgmiP4Ign" fullNameName="bgmiP4Name" phoneName="bgmiP4Whatsapp" typeName="bgmiP4Type" onChange={handleChange} data={formData} playerNum={4} />
                <PlayerFields title="👥 Player 5 Details (Optional)" ignName="bgmiP5Ign" fullNameName="bgmiP5Name" phoneName="bgmiP5Whatsapp" typeName="bgmiP5Type" onChange={handleChange} data={formData} playerNum={5} />
              </div>

              <label className="flex items-start gap-2.5 text-xs rounded-xl border border-emerald-500/30 bg-emerald-900/20 p-3.5 text-emerald-100 font-mono cursor-pointer">
                <input type="checkbox" name="bgmiPaid" required onChange={handleChange} className="mt-0.5" />
                <span>I confirm that I have sent ₹200 team slot fee payment to lock our bracket spot.</span>
              </label>
              
              <label className="flex items-start gap-2.5 text-xs rounded-xl border border-yellow-500/30 bg-yellow-900/20 p-3.5 text-yellow-100 font-mono cursor-pointer">
                <input type="checkbox" name="bgmiAck" required onChange={handleChange} className="mt-0.5" />
                <span>Disclaimer: I declare all squad details to be correct and agree to participate in matches scheduled on 4-5 April.</span>
              </label>
            </div>
          )}

          {/* FIFA FORM */}
          {gameTitle === 'fifa' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-blue-500/30 bg-blue-900/10 p-4 space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase font-mono">⚽ FC25 Event Details</h4>
                <div className="space-y-1.5 text-xs text-gray-300 font-mono">
                  <p className="flex items-center gap-2"><span className="text-blue-400">✓</span> Date: 12 March 2026</p>
                  <p className="flex items-center gap-2"><span className="text-blue-400">✓</span> Venue: Happiness Room F1-G03</p>
                  <p className="flex items-center gap-2"><span className="text-blue-400">✓</span> Format: 1v1 Knockout</p>
                </div>
              </div>
              <Input name="fifaUsername" label="EA ID / Username" placeholder="Your FC25 username" req onChange={handleChange} />
              <Input name="fifaPlatform" label="Platform" placeholder="e.g. PS5 / PC / Xbox" req onChange={handleChange} caps />
              <Input name="fifaFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="fifaEnrollment" label="Amity Enrollment ID" placeholder="Your enrollment number" req onChange={handleChange} />
              <Input name="fifaPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100 font-mono">
                <input type="checkbox" name="fifaAck" required onChange={handleChange} className="mt-0.5" />
                <span>I acknowledge that this is a LAN tournament on 12 March 2026 at Happiness Room F1-G03.</span>
              </label>
            </div>
          )}

          {/* MINECRAFT FORM */}
          {gameTitle === 'minecraft' && (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200/80 mb-2 block">
                  Minecraft Edition <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-mono">
                    <input type="radio" name="minecraftEdition" value="java" required onChange={handleChange} className="accent-purple-500" />
                    <span>Java Edition</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 font-mono">
                    <input type="radio" name="minecraftEdition" value="bedrock" required onChange={handleChange} className="accent-purple-500" />
                    <span>Bedrock Edition</span>
                  </label>
                </div>
              </div>
              <Input name="minecraftUsername" label="Minecraft Username" placeholder="Your in-game username" req onChange={handleChange} />
              <Input name="fullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="enrollment" label="Amity Enrollment ID" placeholder="Your enrollment number" req onChange={handleChange} />
              <Input name="minecraftPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
            </div>
          )}

          {/* TEKKEN FORM */}
          {gameTitle === 'tekken' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/10 p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono">⚔️ LAN Tournament Details</h4>
                <div className="space-y-1.5 text-xs text-gray-300 font-mono">
                  <p className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Date: 12 March 2026</p>
                  <p className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Venue: Happiness Room F1-G03</p>
                  <p className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Format: Double Elimination</p>
                </div>
              </div>
              <Input name="tekkenUsername" label="Player Tag" placeholder="Your in-game tag" req onChange={handleChange} caps />
              <Input name="tekkenFullName" label="Full Name" placeholder="" req onChange={handleChange} caps />
              <Input name="tekkenEnrollment" label="Amity Enrollment ID" placeholder="Your enrollment number" req onChange={handleChange} />
              <Input name="tekkenPhone" label="Phone Number" placeholder="WhatsApp number" type="tel" inputMode="numeric" req onChange={handleChange} />
              <label className="flex items-start gap-2 text-xs rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 text-yellow-100 font-mono">
                <input type="checkbox" name="tekkenAck" required onChange={handleChange} className="mt-0.5" />
                <span>I acknowledge that this is a LAN tournament on 12 March 2026.</span>
              </label>
            </div>
          )}

          {/* STATUS ACTIONS */}
          <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
            {status === 'submitting' && (
              <p className="text-center text-xs font-mono uppercase tracking-[0.18em] text-purple-300 animate-pulse">
                // TRANSMITTING YOUR TOURNAMENT PROFILE TO HQ...
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-xl border border-red-500/50 bg-[#1A0B10] px-4 py-2.5 text-center text-xs font-bold text-red-500 font-mono">
                ❌ REGISTRATION TRANSMISSION FAILED. REVIEW ENTRIES AND RESEND payload.
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
                  <Send className="w-3.5 h-3.5" /> {status === 'submitting' ? 'TRANSMITTING...' : 'REGISTER NOW'}
                </button>
              </MagneticElement>
              
              <MagneticElement className="flex-1">
                <button
                  type="button"
                  onClick={() => { playTactileClick(); setGameTitle(''); setFormData({}); setStatus('idle') }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:bg-white/10 transition-colors"
                >
                  ← BACK TO GAMES
                </button>
              </MagneticElement>
            </div>
          </div>
        </motion.form>
      )}
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

// Player Fields Helper
function PlayerFields({ title, ignName, fullNameName, phoneName, typeName, onChange, data, playerNum = 1, phoneRequired = false, requiredAll = false }) {
  const isCaptain = playerNum === 1
  const bgClass = isCaptain ? 'bg-purple-900/10 border-purple-500/20' : 'bg-purple-600/[0.03] border-purple-500/10'
  const isRequired = requiredAll ? true : playerNum === 1
  const typeRequired = requiredAll ? true : playerNum === 1

  return (
    <div className={`p-4 rounded-xl border ${bgClass} space-y-3`}>
      <h4 className="text-xs font-mono font-bold text-purple-300 uppercase">{title}</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name={fullNameName} label="Full Name" placeholder="" req={isRequired} onChange={onChange} caps />
        <Input name={ignName} label="IGN" placeholder="In-Game Name" req={isRequired} onChange={onChange} />
        <Input name={phoneName} label={`Player ${playerNum} Phone`} placeholder="WhatsApp Number" req={phoneRequired || isRequired || requiredAll} type="tel" inputMode="numeric" onChange={onChange} />
        <Input name={typeName} label="Player Type" placeholder="e.g. Assaulter / Sniper" req={typeRequired} onChange={onChange} caps />
      </div>
    </div>
  )
}