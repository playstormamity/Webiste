import { motion } from 'framer-motion'
import playstormLogo from '../assets/logo.png'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#05010b] via-[#080013] to-[#05010b] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1, 1.2, 1],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
            x: [-50, 50, -30, 30, -50],
            y: [0, 20, -20, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-700/50 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1, 1.3, 1],
            opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
            x: [0, -40, 40, -20, 0],
            y: [0, -30, 30, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-pink-500/40 blur-[140px]"
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
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4], rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-500/40 blur-3xl"
            style={{ width: '240px', height: '240px', margin: '-120px' }}
          />
          
          <motion.div
            animate={{ boxShadow: ['0 0 30px rgba(139, 92, 246, 0.4)', '0 0 50px rgba(236, 72, 153, 0.5)', '0 0 30px rgba(139, 92, 246, 0.4)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-xl border-2 border-purple-500/50 shadow-2xl"
          >
            <motion.img
              src={playstormLogo}
              alt="Loading"
              className="relative z-10 h-28 w-28 object-contain p-2"
              animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        <div className="text-center">
          <motion.h2
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% auto' }}
            className="font-display text-3xl font-bold sm:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 via-purple-300 to-purple-400 bg-clip-text text-transparent"
          >
            PLAYSTORM
          </motion.h2>
          <p className="mt-3 font-display text-sm uppercase tracking-[0.4em] text-purple-300">ESPORTS CLUB</p>
        </div>

        {/* Loading Bar */}
        <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-black/60 border border-purple-500/40 shadow-lg">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 via-purple-500 to-pink-500"
            style={{ backgroundSize: '200% 100%' }}
            animate={{ width: ['0%', '100%'], backgroundPosition: ['0%', '100%'] }}
            transition={{ width: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, backgroundPosition: { duration: 1, repeat: Infinity, ease: 'linear' } }}
          />
        </div>
        
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-display">Loading...</p>
      </div>
    </motion.div>
  )
}