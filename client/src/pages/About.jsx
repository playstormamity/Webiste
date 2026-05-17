import { motion } from 'framer-motion'
import { Target, Zap, Crown, Mail, Instagram, Calendar, MapPin } from 'lucide-react'

// Shared PageHeader Component
function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
      <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-gray-200 sm:text-base">{description}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="About the club"
        title="Welcome to Playstorm ⚡🎯"
        description="Playstorm is more than just a gaming community it's a powerhouse of strategy, creativity, and collaboration. Powered by passion and run by students, Playstorm is where pixels meet purpose!"
      />

      <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
        {/* LEFT COLUMN: Main Text & Story */}
        <div className="space-y-6 text-sm text-gray-200">
          <p>
            Whether you’re into esports, casual gaming, or game development, this is your ultimate hub to learn, play, compete, and grow.
          </p>

          <h3 className="font-display text-lg text-white pt-2">Our Story</h3>
          <p>
            Founded with the belief that <span className="text-purple-300">"college gaming deserves a stage,"</span> Playstorm began as a student-driven initiative to bring serious gaming into Amity’s cultural spotlight. With over 14+ successful gaming events hosted and a rapidly growing player base, Playstorm is now a staple for anyone who wants to game smart and dream big.
          </p>

          <h3 className="font-display text-lg text-white pt-2">What We Do</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Zap className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <span><strong>Esports & Competitive Events:</strong> From Valorant face-offs to FIFA leagues, compete with the best in organized tournaments and scrims.</span>
            </li>
            <li className="flex gap-3">
              <Zap className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <span><strong>Community Gaming Nights:</strong> Chill out with fun multiplayer sessions, quirky theme nights, and party games.</span>
            </li>
            <li className="flex gap-3">
              <Zap className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <span><strong>Game Dev Workshops:</strong> Learn the art of building games with Unity, Unreal Engine, and more.</span>
            </li>
            <li className="flex gap-3">
              <Zap className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <span><strong>LAN Events & Fests:</strong> Represent Playstorm at Amity’s biggest fests and showcase your game IQ and team spirit.</span>
            </li>
          </ul>
        </div>

        {/* RIGHT COLUMN: The "Info Box" (Original Design) */}
        <div className="space-y-4 rounded-2xl border border-purple-500/40 bg-black/40 p-5 text-xs text-gray-200 h-fit">
          <h3 className="font-display text-xs uppercase tracking-[0.22em] text-purple-200">
            Our Mission
          </h3>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <Target className="mt-0.5 h-3.5 w-3.5 text-purple-400" />
              <span><strong>Build an Ecosystem:</strong> Connect gamers, coders, creators, and fans.</span>
            </li>
            <li className="flex gap-2">
              <Target className="mt-0.5 h-3.5 w-3.5 text-purple-400" />
              <span><strong>Bridge Campus ↔ Industry:</strong> Create pathways for careers in game design & esports.</span>
            </li>
            <li className="flex gap-2">
              <Target className="mt-0.5 h-3.5 w-3.5 text-purple-400" />
              <span><strong>Empower Skill:</strong> Promote team play and technical know-how.</span>
            </li>
          </ul>

          <div className="mt-4 space-y-3 pt-4 border-t border-white/10">
            <div className="font-display text-[10px] uppercase tracking-[0.24em] text-purple-200 mb-2">
              Club Info
            </div>

            <div className="flex items-center gap-2">
              <Crown className="h-3.5 w-3.5 text-yellow-400" />
              <span>President: Mudita Dani</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span>Amity University Noida</span>
            </div>
            <a href="mailto:playstorm.amity@gmail.com" className="flex items-center gap-2 hover:text-white transition">
              <Mail className="h-3.5 w-3.5 text-purple-400" />
              <span>playstorm.amity@gmail.com</span>
            </a>
            <a href="https://www.instagram.com/playstorm.amity/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
              <Instagram className="h-3.5 w-3.5 text-pink-400" />
              <span>@playstorm.amity</span>
            </a>
            <a href="https://discord.gg/eAqXkxgTF" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>Events Calendar (Discord)</span>
            </a>
          </div>

          <div className="pt-2 text-center flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">#PlaystormOnTop</span>
            <p className="border-t border-white/5 pt-3 mt-1 text-[11px] text-gray-400">
              Made with 💜 for <span className="text-purple-400 font-medium">Playstorm Esports Club</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}