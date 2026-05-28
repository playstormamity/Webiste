import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// --- -1. CUSTOM CURSOR ---
// Removed: Handled via native CSS in index.css to prevent "leaking" outside the window

// --- 0. CURSOR TRACKER BACKGROUND ---
export function CursorTrackerBackground() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    let rafId
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }
    let isVisible = true

    const onPointerMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!isVisible) {
        isVisible = true
        layer.style.opacity = '1'
      }
    }

    const onMouseLeave = () => {
      isVisible = false
      layer.style.opacity = '0'
    }

    const animate = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      layer.style.setProperty('--cursor-x', `${current.x}px`)
      layer.style.setProperty('--cursor-y', `${current.y}px`)
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onPointerMove)
    animate()

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onPointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[4] transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(145px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255,255,255,0.06), transparent 65%), radial-gradient(240px circle at calc(var(--cursor-x, 50%) - 8%) calc(var(--cursor-y, 50%) - 8%), rgba(255,255,255,0.02), transparent 72%)'
      }}
    />
  )
}

// --- 1. PARTICLE BACKGROUND (High-Fidelity Cyber-Tech Variant) ---
export function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const points = []
    const numPoints = Math.min(Math.floor((width * height) / 16000), 75)
    const connectionDistance = 140
    const cursor = { x: -1000, y: -1000, active: false }

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: 0,
        originY: 0,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
      })
    }

    // Set origin points
    points.forEach(p => {
      p.originX = p.x
      p.originY = p.y
    })

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handlePointerMove = (e) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
      cursor.active = true
    }

    const handlePointerLeave = () => {
      cursor.active = false
      cursor.x = -1000
      cursor.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Background ambient space glows
      ctx.fillStyle = '#060610'
      ctx.fillRect(0, 0, width, height)

      // Subtle cyber grid lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.02)'
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw and connect nodes
      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // Gentle floating velocity
        p.x += p.vx
        p.y += p.vy

        // Physics: Repel nodes slightly away from the mouse pointer
        if (cursor.active) {
          const dx = p.x - cursor.x
          const dy = p.y - cursor.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220) {
            const force = (220 - dist) / 220
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * 4.2
            p.y += Math.sin(angle) * force * 4.2
          }
        }

        // Return to normal screen bounds
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw node points
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(168, 85, 247, 0.15)'
        ctx.fill()

        // Connection logic
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {/* Heavy Vignette to keep focus on center content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#060610_95%)]" />
    </div>
  )
}

// --- 2. GLITCH TEXT ---
export function GlitchText({ text, className }) {
  return (
    <div className={`relative group inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none animate-pulse delay-75">
        {text}
      </span>
    </div>
  )
}

// --- 3. 3D TILT CARD ---
export function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const xPct = (clientX - left) / width - 0.5
    const yPct = (clientY - top) / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7])
  
  // Glare moves opposite to the tilt
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['100%', '-100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['100%', '-100%'])

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      {/* Glare Overlay */}
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)] w-[200%] h-[200%] -left-[50%] -top-[50%]"
          style={{ x: glareX, y: glareY }}
        />
      </motion.div>

      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="rounded-[inherit]">
        {children}
      </div>
    </motion.div>
  )
}

// --- 4. CINEMATIC FILM GRAIN ---
export function CinematicGrain() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-difference"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
      }}
    />
  )
}

// --- 5. SCROLL PROGRESS BAR ---
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 z-[9998] origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)]"
      style={{ scaleX }}
    />
  )
}

// --- 6. STAGGER REVEAL ---
export function StaggerReveal({ children, className = "", staggerDelay = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 25, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
      }}
    >
      {children}
    </motion.div>
  )
}

// --- 7. TYPED TEXT ---
export function TypedText({ text, className = "", speed = 40, delay = 500 }) {
  const [displayed, setDisplayed] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    let intervalId = null
    
    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          if (intervalId) clearInterval(intervalId)
          // Blink cursor a few times then hide
          setTimeout(() => setShowCursor(false), 2000)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className="animate-pulse text-purple-400 ml-0.5">|</span>}
    </span>
  )
}

// --- 8. BACK TO TOP BUTTON ---
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/50 bg-black/70 text-purple-400 backdrop-blur-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:bg-purple-500/20 hover:text-white transition-all duration-300"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  )
}

// --- 9. MAGNETIC ELEMENT ---
export function MagneticElement({ children, className = "", range = 35 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    if (distance < range) {
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- 10. REACTIVE GLOW CARD ---
export function GlowCard({ children, className = "", glowColor = "rgba(99, 102, 241, 0.15)", ...props }) {
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    if (props.onMouseMove) props.onMouseMove(e)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { setIsHovered(true); if (props.onMouseEnter) props.onMouseEnter(e); }}
      onMouseLeave={(e) => { setIsHovered(false); if (props.onMouseLeave) props.onMouseLeave(e); }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Glow effect tracking pointer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
      {/* Border overlay glow tracking pointer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 70%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      <div className="relative z-10 w-full h-full rounded-[inherit]">
        {children}
      </div>
    </div>
  )
}

// --- 11. DYNAMIC SYNTHESIZED SOUND EFFECTS ENGINE (No asset downloads required) ---
let audioCtx = null
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

if (typeof window !== 'undefined' && window.playstormAudioEnabled === undefined) {
  window.playstormAudioEnabled = localStorage.getItem('sfx_enabled') !== 'false'
}

export function playTactileClick() {
  // Sound disabled per user request
}

export function playDigitalHover() {
  // Sound disabled per user request
}

// --- 12. CURSOR PHYSICS DISTORTION FIELD ---
export function CursorPhysicsDistortion({ children, className = "" }) {
  const ref = useRef(null)
  
  const handlePointerMove = (e) => {
    const container = ref.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < 180) {
      const angle = Math.atan2(dy, dx)
      const force = (180 - dist) / 180
      const moveX = Math.cos(angle) * force * 12
      const moveY = Math.sin(angle) * force * 4
      container.style.transform = `translate(${moveX}px, ${moveY}px) skewX(${moveX * 0.75}deg)`
    } else {
      container.style.transform = 'none'
    }
  }
  
  const handlePointerLeave = () => {
    if (ref.current) ref.current.style.transform = 'none'
  }
  
  return (
    <div
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

// --- 13. SCROLL SECTION TELEMETRY ---
export function ScrollSectionTelemetry() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setPercent(Math.floor((window.scrollY / scrollHeight) * 100))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[99] hidden lg:flex flex-col items-center gap-4 select-none">
      <div className="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest rotate-90 translate-y-3">
        LOC_Y
      </div>
      <div className="w-1.5 h-32 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          style={{ height: `${percent}%` }}
        />
      </div>
      <div className="text-[10px] font-mono font-black text-purple-400">
        {percent.toString().padStart(3, '0')}%
      </div>
    </div>
  )
}