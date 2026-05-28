import { motion } from 'framer-motion'
import playstormLogo from '../assets/logo.png'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#090914] via-[#050508] to-[#090914] overflow-hidden"
    >
      {/* Background Interactive Tech Patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle Tech Laser Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        {/* Ambient Indigo & Royal Blue Glow Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1, 1.1, 1],
            opacity: [0.35, 0.55, 0.45, 0.5, 0.35],
            x: [-40, 40, -20, 20, -40],
            y: [0, 15, -15, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-10 h-[400px] w-[400px] rounded-full bg-indigo-800/30 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1, 1.15, 1],
            opacity: [0.25, 0.45, 0.35, 0.4, 0.25],
            x: [0, -30, 30, -10, 0],
            y: [0, -25, 25, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-blue-900/25 blur-[150px]"
        />
        {/* Center glowing backdrop behind logo */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          {/* Glowing Circles behind logo */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-white/10 to-indigo-500/20 blur-3xl"
            style={{ width: '240px', height: '240px', margin: '-120px' }}
          />
          
          {/* Main Card with silver outline and white/indigo shadow */}
          <motion.div
            animate={{ boxShadow: ['0 0 30px rgba(99, 102, 241, 0.15)', '0 0 50px rgba(255, 255, 255, 0.1)', '0 0 30px rgba(99, 102, 241, 0.15)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            {/* Shimmer line inside the card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />

            <motion.img
              src={playstormLogo}
              alt="Loading"
              className="relative z-10 h-28 w-28 object-contain p-2"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-1">
          <motion.h2
            animate={{ backgroundPosition: ['0%', '200%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% auto' }}
            className="font-display text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-widest drop-shadow-md"
          >
            PLAYSTORM
          </motion.h2>
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.45em] text-gray-400">ESPORTS CLUB</p>
        </div>

        {/* Premium Loading Bar */}
        <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-black/60 border border-white/10 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 via-blue-400 to-indigo-600"
            style={{ backgroundSize: '200% 100%' }}
            animate={{ width: ['0%', '100%'], backgroundPosition: ['0%', '200%'] }}
            transition={{ width: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }, backgroundPosition: { duration: 1.5, repeat: Infinity, ease: 'linear' } }}
          />
        </div>
        
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 font-display animate-pulse">Initializing Client...</p>
      </div>
    </motion.div>
  )
}