import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

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
          'radial-gradient(145px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(196,181,253,0.2), transparent 65%), radial-gradient(240px circle at calc(var(--cursor-x, 50%) - 8%) calc(var(--cursor-y, 50%) - 8%), rgba(139,92,246,0.08), transparent 72%)'
      }}
    />
  )
}

// --- 1. PARTICLE BACKGROUND ---
export function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 10)
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 132, 252, ${p.opacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener('resize', onResize)
    resize()
    createParticles()
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[5] pointer-events-none" />
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
export function TiltCard({ children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

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

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  )
}