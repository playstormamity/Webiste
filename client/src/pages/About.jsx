import { motion } from 'framer-motion'
import { Target, Zap, Crown, Mail, Instagram, Calendar, MapPin, Shield, Gamepad2, Cpu, Trophy, Sparkles } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

export default function AboutPage() {
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
          <span>About the club</span>
        </div>

        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
              Welcome to <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Playstorm</span>
            </h1>
          </CursorPhysicsDistortion>
        </div>

        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Playstorm is more than just a gaming community it's an elite student-run powerhouse of strategy, creativity, and digital athletic dominance. Powered by pure passion, Playstorm is where pixels meet purpose.
        </p>
      </div>

      {/* 2. DYNAMIC LOOKSMAXED GRID */}
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">

        {/* LEFT COLUMN: Main Text & What We Do */}
        <div className="space-y-8">

          {/* Our Story Card */}
          <GlowCard className="p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-300" />
            <h3 className="font-display text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" /> Our Story
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Founded with the bold ethos that <span className="text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">"college gaming deserves a stage,"</span> Playstorm began as a student-driven initiative to catapult gaming into Amity’s premier cultural spotlight. Hosting over 14+ major campus tournaments with a rapidly expanding network of developers and professional players, we empower gamers to think smart, practice hard, and build the future of play.
            </p>
          </GlowCard>

          {/* What We Do Grid */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-purple-300 pl-1">
              What We Do
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Feature Box 1 */}
              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60 hover:bg-black/50 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Esports Events</h4>
                    <p className="text-[11px] text-gray-400 mt-1">Valorant face-offs and major scrim championships.</p>
                  </div>
                </div>
              </GlowCard>

              {/* Feature Box 2 */}
              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60 hover:bg-black/50 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">LAN Fests</h4>
                    <p className="text-[11px] text-gray-400 mt-1">Represent Playstorm at Amity's premier fests.</p>
                  </div>
                </div>
              </GlowCard>

              {/* Feature Box 3 */}
              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60 hover:bg-black/50 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Dev Workshops</h4>
                    <p className="text-[11px] text-gray-400 mt-1">Learn to build games in Unity & Unreal Engine.</p>
                  </div>
                </div>
              </GlowCard>

              {/* Feature Box 4 */}
              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60 hover:bg-black/50 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Gaming Nights</h4>
                    <p className="text-[11px] text-gray-400 mt-1">Chill out with fun multiplayer lobbies and games.</p>
                  </div>
                </div>
              </GlowCard>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Looksmaxed Info Card with 3D Tilt */}
        <TiltCard className="h-fit relative z-20">
          <GlowCard className="p-6 rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />

            <h3 className="font-display text-xs uppercase tracking-[0.24em] text-purple-300 font-black mb-4 border-b border-white/10 pb-3">
              Our Mission
            </h3>

            <ul className="space-y-3">
              <li className="flex gap-3 group">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex-shrink-0 group-hover:bg-purple-500/20 transition-all duration-300">
                  <Target className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ecosystem Build</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Connecting gamers, developers, and creators.</p>
                </div>
              </li>
              <li className="flex gap-3 group">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex-shrink-0 group-hover:bg-pink-500/20 transition-all duration-300">
                  <Target className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Bridge</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Create dedicated pathways into the gaming industry.</p>
                </div>
              </li>
              <li className="flex gap-3 group">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-all duration-300">
                  <Target className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Empower Skill</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Promoting technical design fusions & team play.</p>
                </div>
              </li>
            </ul>

            {/* Club Info Section */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
              <div className="font-display text-[9px] uppercase tracking-[0.24em] text-purple-300 font-bold">
                Club Directory
              </div>

              {/* President */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">President</div>
                  <div className="text-[11px] font-bold text-white font-mono">Mudita Dani</div>
                </div>
              </div>

              {/* Campus */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500/10 border border-white/10 text-gray-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Campus</div>
                  <div className="text-[11px] font-bold text-white font-mono">Amity Noida</div>
                </div>
              </div>

              {/* Email */}
              <MagneticElement>
                <a
                  href="mailto:playstorm.amity@gmail.com"
                  onClick={playTactileClick}
                  onMouseEnter={playDigitalHover}
                  className="flex items-center gap-3 group transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Contact Email</div>
                    <div className="text-[11px] font-bold text-purple-300 group-hover:text-purple-200 transition-colors font-mono">playstorm.amity@gmail.com</div>
                  </div>
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
                  className="flex items-center gap-3 group transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 transition-all duration-300">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Instagram</div>
                    <div className="text-[11px] font-bold text-pink-400 group-hover:text-pink-300 transition-colors font-mono">@playstorm.amity</div>
                  </div>
                </a>
              </MagneticElement>

              {/* Events Calendar */}
              <MagneticElement>
                <a
                  href="https://discord.gg/eAqXkxgTF"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTactileClick}
                  onMouseEnter={playDigitalHover}
                  className="flex items-center gap-3 group transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Events</div>
                    <div className="text-[11px] font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors font-mono">Events Calendar (Discord)</div>
                  </div>
                </a>
              </MagneticElement>

            </div>

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