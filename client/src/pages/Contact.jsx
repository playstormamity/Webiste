import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, CalendarDays, Instagram, Youtube, Linkedin, Sparkles, Send, Globe, Phone } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

function DiscordPill() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </span>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    email: '',
    interest: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const embed = {
      title: '🎮 New Contact Form Submission',
      color: 0x8b5cf6,
      fields: [
        { name: '👤 Name', value: formData.name || 'Not provided', inline: true },
        { name: '📞 Phone Number', value: formData.enrollment || 'Not provided', inline: true },
        { name: '📧 Email', value: formData.email || 'Not provided', inline: false },
        { name: '🎯 Interest', value: formData.interest || 'Not provided', inline: true },
        { name: '💬 Message', value: formData.message || 'Not provided', inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Playstorm Esports Club - Contact Form' },
    }

    try {
      const payload = { embeds: [embed] }

      const response = await fetch('/api/register-discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'contact',
          payload: payload
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', enrollment: '', email: '', interest: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12"
    >
      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-full">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Get in touch</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
              Reach Out <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Core Team</span>
            </h1>
          </CursorPhysicsDistortion>
        </div>
        
        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Have an inquiry, partnership proposal, or want to join the ranks? Send us a direct encrypted telemetry link below, and our commanders will establish contact.
        </p>
      </div>

      {/* 2. LOOKSMAXED FORM & TELEMETRY GRID */}
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
        
        {/* LEFT COLUMN: Premium Glow Form */}
        <GlowCard className="p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-200">
            <div className="grid gap-4 sm:grid-cols-2">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:bg-black/80 transition shadow-inner font-mono"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">WhatsApp / Phone</label>
                <input
                  type="text"
                  name="enrollment"
                  value={formData.enrollment}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:bg-black/80 transition shadow-inner font-mono"
                />
              </div>

            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">Encrypted Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@s.amity.edu"
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:bg-black/80 transition shadow-inner font-mono"
              />
            </div>

            {/* Interest Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">Inquiry Classification</label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                placeholder="Apply for team, Collaboration, Sponsoring fests, etc."
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:bg-black/80 transition shadow-inner font-mono"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">Communication Data Payload</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Provide a detailed overview of your request or background info…"
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-gray-600 focus:border-purple-500 focus:bg-black/80 transition shadow-inner font-mono resize-none"
              />
            </div>

            {/* Submit Status Popups */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-[11px] text-emerald-300 font-mono"
              >
                ✓ UPLINK SECURED: Telemetry successfully beamed to Core! We'll reply soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-[11px] text-red-300 font-mono"
              >
                ✗ UPLINK FAILED: Connection interrupted. Please re-establish sync or email directly.
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <MagneticElement>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={playTactileClick}
                  onMouseEnter={playDigitalHover}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 border border-white/15"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? 'Beaming Uplink...' : 'Establish Link'}
                </button>
              </MagneticElement>
            </div>

          </form>
        </GlowCard>

        {/* RIGHT COLUMN: 3D Tilt Card with Spacers */}
        <TiltCard className="h-fit relative z-20">
          <GlowCard className="p-6 rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-display text-xs uppercase tracking-[0.24em] text-purple-300 font-black mb-4 border-b border-white/10 pb-3">
              Quick Info
            </h3>

            <ul className="space-y-4">
              
              {/* Direct Mail */}
              <li className="flex gap-3 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex-shrink-0 group-hover:bg-purple-500/20 transition-all duration-300">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Mailbox Address</h4>
                  <p className="text-[11px] font-bold text-white font-mono mt-0.5">playstorm.amity@gmail.com</p>
                </div>
              </li>

              {/* HQ */}
              <li className="flex gap-3 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex-shrink-0 group-hover:bg-pink-500/20 transition-all duration-300">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Coordinates (HQ)</h4>
                  <p className="text-[11px] font-bold text-white font-mono mt-0.5">Amity University · Noida</p>
                </div>
              </li>

              {/* Duty */}
              <li className="flex gap-3 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-all duration-300">
                  <CalendarDays className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Duty Cycle</h4>
                  <p className="text-[11px] font-bold text-white font-mono mt-0.5">Post-Classes · Evenings & Weekends</p>
                </div>
              </li>

            </ul>

            {/* Social Grid */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="font-display text-[9px] uppercase tracking-[0.24em] text-purple-300 font-bold mb-4">
                Establish Comms
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                
                {/* Discord */}
                <MagneticElement>
                  <a 
                    href="https://discord.gg/eAqXkxgTF" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={playTactileClick}
                    onMouseEnter={playDigitalHover}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-2.5 text-xs text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-indigo-500/10 hover:border-purple-500/30 transition-all duration-300 w-full"
                  >
                    <DiscordPill />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Discord</span>
                  </a>
                </MagneticElement>

                {/* Instagram */}
                <MagneticElement>
                  <a 
                    href="https://www.instagram.com/playstorm.amity/" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={playTactileClick}
                    onMouseEnter={playDigitalHover}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-2.5 text-xs text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 hover:border-pink-500/30 transition-all duration-300 w-full"
                  >
                    <Instagram className="h-4 w-4 text-pink-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Instagram</span>
                  </a>
                </MagneticElement>

                {/* Youtube */}
                <MagneticElement>
                  <a 
                    href="https://www.youtube.com/@PlaystormAmity" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={playTactileClick}
                    onMouseEnter={playDigitalHover}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-2.5 text-xs text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:border-red-500/30 transition-all duration-300 w-full"
                  >
                    <Youtube className="h-4 w-4 text-red-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">YouTube</span>
                  </a>
                </MagneticElement>

                {/* Linkedin */}
                <MagneticElement>
                  <a 
                    href="https://www.linkedin.com/company/playstorm-amity-auup" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={playTactileClick}
                    onMouseEnter={playDigitalHover}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-2.5 text-xs text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:border-blue-500/30 transition-all duration-300 w-full"
                  >
                    <Linkedin className="h-4 w-4 text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">LinkedIn</span>
                  </a>
                </MagneticElement>

              </div>
            </div>

            {/* Glowing Tag */}
            <div className="mt-6 pt-4 border-t border-white/5 text-center flex flex-col items-center gap-1.5 select-none">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-pink-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">#PlaystormOnTop</span>
              <p className="text-[10px] text-gray-500 font-mono">
                Made for <span className="text-purple-400/80 font-bold">Playstorm Esports Club</span>
              </p>
            </div>

          </GlowCard>
        </TiltCard>

      </div>
    </motion.div>
  )
}