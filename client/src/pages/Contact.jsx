import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, CalendarDays, Instagram, Youtube, Linkedin } from 'lucide-react'

// --- HELPER COMPONENTS ---

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
      <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-gray-200 sm:text-base">{description}</p>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-purple-200">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">{label}</p>
        <p className="text-xs text-gray-100">{value}</p>
      </div>
    </div>
  )
}

function DiscordPill() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </span>
  )
}

function SocialPill({ icon, label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400 transition"
    >
      <span className="text-purple-200">{icon}</span>
      {label}
    </button>
  )
}

// --- MAIN COMPONENT ---

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

    // Using the webhook from your code snippet
    const webhookUrl = 'https://discord.com/api/webhooks/1454357101295046771/sEQ_2hIGFtnhHlxkNoNaT-umvSewMfx7eukFITcmqx_MeHCAiGzbqZkLQIefp9D-_tn8'

    const embed = {
      title: '🎮 New Contact Form Submission',
      color: 0x8b5cf6,
      fields: [
        { name: '👤 Name', value: formData.name || 'Not provided', inline: true },
        { name: '🎓 Enrollment/Program', value: formData.enrollment || 'Not provided', inline: true },
        { name: '📧 Email', value: formData.email || 'Not provided', inline: false },
        { name: '🎯 Interest', value: formData.interest || 'Not provided', inline: true },
        { name: '💬 Message', value: formData.message || 'Not provided', inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Playstorm Esports Club - Contact Form' },
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
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
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="Contact"
        title="Reach out to the Playstorm core team."
        description="Fill out the form below and we'll get back to you as soon as possible."
      />

      <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-purple-500/40 bg-black/40 p-5 text-sm text-gray-200">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-200">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-200">Phone Number</label>
              <input
                type="text"
                name="enrollment"
                value={formData.enrollment}
                onChange={handleChange}
                placeholder="e.g. Whatsapp Number"
                required
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="playstorm@s.amity.edu"
              required
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-200">What are you interested in?</label>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Apply for team, collaboration, partnership, business enquiry, etc."
              required
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-200">Tell us a bit more</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your background, experience, or your specific inquiry…"
              required
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-3 text-xs text-emerald-200"
            >
              ✓ Form submitted successfully! We'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-3 text-xs text-red-200"
            >
              ✗ Something went wrong. Please try again or contact us directly.
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="space-y-5 text-xs text-gray-200">
          <div className="rounded-2xl border border-purple-500/40 bg-black/40 p-4">
            <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">
              Quick info
            </h3>
            <div className="mt-3 space-y-2">
              <InfoRow icon={<Mail className="h-3.5 w-3.5" />} label="Email" value="playstorm.amity@gmail.com" />
              <InfoRow
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="On-campus"
                value="Amity University · Noida"
              />
              <InfoRow
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Office hours"
                value="Post-classes · Evenings & weekends."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">
              Socials
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://discord.playstorm-amity.club/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400 transition"
              >
                <DiscordPill />
                Discord server
              </a>
              <a
                href="https://www.instagram.com/playstorm.amity/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400 transition"
              >
                <span className="text-purple-200"><Instagram className="h-3.5 w-3.5" /></span>
                instagram
              </a>
              <a
                href="https://www.youtube.com/@PlaystormAmity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400 transition"
              >
                <span className="text-purple-200"><Youtube className="h-3.5 w-3.5" /></span>
                youtube
              </a>
              <a
                href="https://www.linkedin.com/company/playstorm-amity-auup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400 transition"
              >
                <span className="text-purple-200"><Linkedin className="h-3.5 w-3.5" /></span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}