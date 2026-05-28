import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Sparkles } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <TiltCard>
        <GlowCard className="p-10 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md space-y-6 max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>Out of Bounds</span>
          </div>

          <div className="space-y-4">
            <CursorPhysicsDistortion>
              <h1 className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent font-display tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(168,85,247,0.35)]">
                404
              </h1>
            </CursorPhysicsDistortion>
            
            <h2 className="text-lg font-bold text-white uppercase tracking-[0.18em]">
              Lost in the Storm? ⚔️
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto font-mono">
              The sector page you are trying to access has either offline-desynced or drifted out of server reach.
            </p>
          </div>

          <div className="pt-2">
            <MagneticElement>
              <Link 
                to="/" 
                onClick={playTactileClick}
                onMouseEnter={playDigitalHover}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg border border-white/10 hover:brightness-110"
              >
                <Home className="w-3.5 h-3.5" /> Return Home
              </Link>
            </MagneticElement>
          </div>
        </GlowCard>
      </TiltCard>
    </motion.div>
  )
}