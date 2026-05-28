import { useEffect, useRef } from 'react'
import meshBg from '../assets/mesh_bg.png'

/**
 * CircuitBoardBackground
 *
 * PCB-style circuit traces with glowing data pulses flowing along paths,
 * combined with faint matrix-style digital rain in the deep background.
 * Cursor creates an electromagnetic interference zone that lights up nearby traces.
 */
export function CircuitBoardBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const mouse = { x: -1000, y: -1000 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Apply DPR scaling
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
      generateCircuits()
      generateRainColumns()
    }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    // ─── CIRCUIT TRACE GENERATION ───────────────────────────────
    const gridSize = 40
    let circuits = []
    let nodes = []

    function generateCircuits() {
      circuits = []
      nodes = []
      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      // Generate circuit nodes at grid intersections (sparse)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.12) {
            nodes.push({
              x: c * gridSize,
              y: r * gridSize,
              radius: Math.random() < 0.3 ? 3 : 2,
              type: Math.random() < 0.2 ? 'chip' : Math.random() < 0.4 ? 'capacitor' : 'node',
              pulsePhase: Math.random() * Math.PI * 2
            })
          }
        }
      }

      // Generate circuit traces (paths between nearby nodes or along grid)
      const traceCount = Math.min(Math.floor((width * height) / 12000), 180)
      for (let i = 0; i < traceCount; i++) {
        const startX = Math.floor(Math.random() * cols) * gridSize
        const startY = Math.floor(Math.random() * rows) * gridSize
        const segments = []
        let cx = startX
        let cy = startY
        const segCount = 2 + Math.floor(Math.random() * 6)
        const color = Math.random() < 0.6 ? 'purple' : Math.random() < 0.5 ? 'pink' : 'cyan'

        for (let s = 0; s < segCount; s++) {
          const dir = Math.floor(Math.random() * 4)
          const len = (1 + Math.floor(Math.random() * 4)) * gridSize
          let nx = cx
          let ny = cy

          switch (dir) {
            case 0: nx = cx + len; break // right
            case 1: nx = cx - len; break // left
            case 2: ny = cy + len; break // down
            case 3: ny = cy - len; break // up
          }

          // Clamp to canvas
          nx = Math.max(0, Math.min(width, nx))
          ny = Math.max(0, Math.min(height, ny))

          if (nx !== cx || ny !== cy) {
            segments.push({ x1: cx, y1: cy, x2: nx, y2: ny })
            cx = nx
            cy = ny
          }
        }

        if (segments.length > 0) {
          circuits.push({
            segments,
            color,
            pulseOffset: Math.random() * 1000,
            pulseSpeed: 0.3 + Math.random() * 0.7,
            width: Math.random() < 0.15 ? 1.5 : 0.8
          })
        }
      }
    }

    // ─── DIGITAL RAIN (Matrix Characters) ──────────────────────
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\+=_-*&%$#@!'
    let rainColumns = []

    function generateRainColumns() {
      rainColumns = []
      const colWidth = 22
      const numCols = Math.ceil(width / colWidth)
      for (let i = 0; i < numCols; i++) {
        if (Math.random() < 0.35) { // Sparse columns
          rainColumns.push({
            x: i * colWidth + colWidth / 2,
            drops: Array.from({ length: 3 + Math.floor(Math.random() * 8) }, () => ({
              y: Math.random() * height,
              speed: 0.3 + Math.random() * 1.2,
              char: chars[Math.floor(Math.random() * chars.length)],
              opacity: 0.03 + Math.random() * 0.06,
              changeTimer: 0,
              changeInterval: 5 + Math.floor(Math.random() * 20)
            }))
          })
        }
      }
    }

    generateCircuits()
    generateRainColumns()

    // ─── DATA PULSE PARTICLES ──────────────────────────────────
    const pulses = []
    const maxPulses = 25
    let pulseTimer = 0

    function spawnPulse() {
      if (circuits.length === 0) return
      const circuit = circuits[Math.floor(Math.random() * circuits.length)]
      if (circuit.segments.length === 0) return
      pulses.push({
        circuit,
        segIndex: 0,
        progress: 0,
        speed: 1.5 + Math.random() * 3,
        color: circuit.color,
        intensity: 0.6 + Math.random() * 0.4
      })
    }

    // ─── DRAW LOOP ─────────────────────────────────────────────
    let time = 0

    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, width, height)

      // Base background
      ctx.fillStyle = '#060610'
      ctx.fillRect(0, 0, width, height)

      // ── DIGITAL RAIN LAYER (behind everything) ──
      ctx.save()
      for (const col of rainColumns) {
        for (const drop of col.drops) {
          drop.y += drop.speed
          drop.changeTimer++

          if (drop.changeTimer >= drop.changeInterval) {
            drop.char = chars[Math.floor(Math.random() * chars.length)]
            drop.changeTimer = 0
          }

          if (drop.y > height + 20) {
            drop.y = -20
            drop.speed = 0.3 + Math.random() * 1.2
          }

          // Cursor proximity boost
          const dx = mouse.x - col.x
          const dy = mouse.y - drop.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const cursorBoost = dist < 200 ? (200 - dist) / 200 * 0.12 : 0

          ctx.fillStyle = `rgba(168, 85, 247, ${drop.opacity + cursorBoost})`
          ctx.font = '12px monospace'
          ctx.textAlign = 'center'
          ctx.fillText(drop.char, col.x, drop.y)
        }
      }
      ctx.restore()

      // ── FAINT GRID LINES ──
      ctx.save()
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.018)'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.restore()

      // ── CIRCUIT TRACES ──
      for (const circuit of circuits) {
        for (const seg of circuit.segments) {
          // Calculate segment midpoint distance to mouse
          const mx = (seg.x1 + seg.x2) / 2
          const my = (seg.y1 + seg.y2) / 2
          const dx = mouse.x - mx
          const dy = mouse.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const proximity = dist < 250 ? (250 - dist) / 250 : 0

          let baseAlpha = 0.06 + proximity * 0.25
          let glowAlpha = proximity * 0.4

          // Color selection
          let r, g, b
          if (circuit.color === 'purple') { r = 168; g = 85; b = 247 }
          else if (circuit.color === 'pink') { r = 236; g = 72; b = 153 }
          else { r = 34; g = 211; b = 238 }

          // Draw glow layer
          if (glowAlpha > 0.01) {
            ctx.save()
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${glowAlpha * 0.4})`
            ctx.lineWidth = circuit.width + 4
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${glowAlpha * 0.6})`
            ctx.shadowBlur = 12
            ctx.beginPath()
            ctx.moveTo(seg.x1, seg.y1)
            ctx.lineTo(seg.x2, seg.y2)
            ctx.stroke()
            ctx.restore()
          }

          // Draw trace
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha})`
          ctx.lineWidth = circuit.width
          ctx.beginPath()
          ctx.moveTo(seg.x1, seg.y1)
          ctx.lineTo(seg.x2, seg.y2)
          ctx.stroke()

          // Draw corner dots at bends
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha * 1.5})`
          ctx.beginPath()
          ctx.arc(seg.x1, seg.y1, 1.2, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(seg.x2, seg.y2, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ── CIRCUIT NODES (Components) ──
      for (const node of nodes) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = dist < 200 ? (200 - dist) / 200 : 0
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5
        const alpha = 0.08 + proximity * 0.5 + pulse * 0.05

        if (node.type === 'chip') {
          // Draw small chip/IC rectangle
          const s = 6 + proximity * 3
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.strokeRect(node.x - s / 2, node.y - s / 2, s, s)

          // Pin dots
          const pins = [-s / 2, s / 2]
          for (const px of pins) {
            ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.6})`
            ctx.beginPath()
            ctx.arc(node.x + px, node.y - s / 2 - 2, 0.8, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.arc(node.x + px, node.y + s / 2 + 2, 0.8, 0, Math.PI * 2)
            ctx.fill()
          }
        } else if (node.type === 'capacitor') {
          // Small circle component
          ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3 + proximity * 2, 0, Math.PI * 2)
          ctx.stroke()
          ctx.fillStyle = `rgba(236, 72, 153, ${alpha * 0.3})`
          ctx.fill()
        } else {
          // Standard solder point / junction node
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + proximity * 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Glow ring on hover
          if (proximity > 0.1) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${proximity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.radius + 5 + proximity * 4, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      }

      // ── DATA PULSES (flowing energy) ──
      pulseTimer += 0.016
      if (pulseTimer > 0.12 && pulses.length < maxPulses) {
        spawnPulse()
        pulseTimer = 0
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const seg = p.circuit.segments[p.segIndex]
        if (!seg) { pulses.splice(i, 1); continue }

        p.progress += p.speed * 0.016

        const segLen = Math.sqrt(
          (seg.x2 - seg.x1) ** 2 + (seg.y2 - seg.y1) ** 2
        )
        const normalizedProgress = (p.progress * gridSize) / segLen

        if (normalizedProgress >= 1) {
          p.segIndex++
          p.progress = 0
          if (p.segIndex >= p.circuit.segments.length) {
            pulses.splice(i, 1)
            continue
          }
        } else {
          const px = seg.x1 + (seg.x2 - seg.x1) * normalizedProgress
          const py = seg.y1 + (seg.y2 - seg.y1) * normalizedProgress

          let r, g, b
          if (p.color === 'purple') { r = 168; g = 85; b = 247 }
          else if (p.color === 'pink') { r = 236; g = 72; b = 153 }
          else { r = 34; g = 211; b = 238 }

          // Glowing pulse dot
          ctx.save()
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`
          ctx.shadowBlur = 15
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.intensity})`
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Trail
          const trailLen = 0.08
          const tx = seg.x1 + (seg.x2 - seg.x1) * Math.max(0, normalizedProgress - trailLen)
          const ty = seg.y1 + (seg.y2 - seg.y1) * Math.max(0, normalizedProgress - trailLen)
          const grad = ctx.createLinearGradient(tx, ty, px, py)
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${p.intensity * 0.4})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(px, py)
          ctx.stroke()
        }
      }

      // ── CURSOR ELECTROMAGNETIC FIELD ──
      if (mouse.x !== -1000) {
        // Outer ring
        const ringRadius = 120 + Math.sin(time * 1.5) * 10
        ctx.strokeStyle = `rgba(168, 85, 247, 0.06)`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 8])
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Inner radial glow
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 200
        )
        mouseGlow.addColorStop(0, 'rgba(168, 85, 247, 0.04)')
        mouseGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.015)')
        mouseGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = mouseGlow
        ctx.fillRect(0, 0, width, height)

        // Tiny scanning line
        const scanY = mouse.y + Math.sin(time * 3) * 30
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(mouse.x - 100, scanY)
        ctx.lineTo(mouse.x + 100, scanY)
        ctx.stroke()
      }

      // ── VIGNETTE ──
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, Math.max(width, height) * 0.75
      )
      vignette.addColorStop(0, 'transparent')
      vignette.addColorStop(1, 'rgba(6, 6, 16, 0.88)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#060610]">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}

export function CosmicMeshNebulaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Set canvas sizes
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 }
    const scroll = { y: 0, ty: 0 }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX
      mouse.ty = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.tx = -1000
      mouse.ty = -1000
    }

    const handleScroll = () => {
      scroll.ty = window.scrollY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const isMobile = width < 768

    // ─── NEBULA PARTICLES (STARDUST) ───────────────────────────
    const numParticles = isMobile ? 50 : 120
    const particles = []
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() < 0.4 ? 'rgba(168, 85, 247,' : Math.random() < 0.7 ? 'rgba(236, 72, 153,' : 'rgba(34, 211, 238,',
        alpha: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        orbitRadius: Math.random() * 80 + 20
      })
    }

    // ─── NEBULA LIGHTS ──────────────────────────────────────────
    const nebulas = [
      { x: width * 0.25, y: height * 0.3, tx: width * 0.25, ty: height * 0.3, r: Math.max(width, height) * 0.45, color1: 'rgba(124, 58, 237, 0.09)', color2: 'rgba(0, 0, 0, 0)', phase: 0 },
      { x: width * 0.75, y: height * 0.7, tx: width * 0.75, ty: height * 0.7, r: Math.max(width, height) * 0.5, color1: 'rgba(219, 39, 119, 0.08)', color2: 'rgba(0, 0, 0, 0)', phase: Math.PI / 2 },
      { x: width * 0.5, y: height * 0.5, tx: width * 0.5, ty: height * 0.5, r: Math.max(width, height) * 0.4, color1: 'rgba(6, 182, 212, 0.05)', color2: 'rgba(0, 0, 0, 0)', phase: Math.PI }
    ]

    // ─── 3D MESH GRID ───────────────────────────────────────────
    const cols = isMobile ? 16 : 28
    const rows = isMobile ? 12 : 18

    let time = 0

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, width, height)

      // Base background is rendered in CSS using meshBg, so we leave canvas transparent

      // Easing values
      if (mouse.tx !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.tx
          mouse.y = mouse.ty
          mouse.lastX = mouse.tx
          mouse.lastY = mouse.ty
        }
        mouse.x += (mouse.tx - mouse.x) * 0.08
        mouse.y += (mouse.ty - mouse.y) * 0.08
        mouse.vx = mouse.x - mouse.lastX
        mouse.vy = mouse.y - mouse.lastY
        mouse.lastX = mouse.x
        mouse.lastY = mouse.y
      } else {
        mouse.x = -1000
        mouse.y = -1000
        mouse.vx = 0
        mouse.vy = 0
      }

      scroll.y += (scroll.ty - scroll.y) * 0.1

      // ─── 1. RENDER NEBULA GAS CLOUDS ───
      nebulas.forEach((n) => {
        n.phase += 0.002
        const offsetX = Math.sin(n.phase) * 50
        const offsetY = Math.cos(n.phase * 0.7) * 50
        const parallaxX = (mouse.x !== -1000 ? (mouse.x - width / 2) * -0.05 : 0)
        const parallaxY = scroll.y * 0.15

        const cx = n.tx + offsetX + parallaxX
        const cy = n.ty + offsetY + parallaxY

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r)
        grad.addColorStop(0, n.color1)
        grad.addColorStop(0.5, n.color1.replace(/[\d.]+\)/, '0.02)'))
        grad.addColorStop(1, n.color2)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
      })

      // ─── 2. RENDER WAVY 3D MESH GRID ───
      const meshXStep = width / (cols - 1)
      const meshYStep = height / (rows - 1)
      const points = []

      for (let r = 0; r < rows; r++) {
        points[r] = []
        for (let c = 0; c < cols; c++) {
          const origX = c * meshXStep
          const origY = r * meshYStep

          const waveHeight = 
            Math.sin(c * 0.25 + time * 3) * 16 + 
            Math.cos(r * 0.25 + time * 2) * 16 +
            Math.sin((c + r) * 0.12 + time * 4) * 8

          let finalX = origX
          let finalY = origY - scroll.y * 0.12

          if (mouse.x !== -1000) {
            const dx = finalX - mouse.x
            const dy = finalY - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 220) {
              const force = (220 - dist) / 220
              const angle = Math.atan2(dy, dx)
              const distFactor = Math.sin(force * Math.PI) * 25
              finalX += Math.cos(angle) * distFactor
              finalY += Math.sin(angle) * distFactor
            }
          }

          const zDepth = 200 + waveHeight
          const scale = 200 / zDepth

          const projX = (finalX - width / 2) * scale + width / 2
          const projY = (finalY - height / 2) * scale + height / 2 + (waveHeight * 0.6)

          points[r][c] = { x: projX, y: projY, z: waveHeight, opacity: scale * 0.7 }
        }
      }

      ctx.lineWidth = 0.6
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c]

          if (c < cols - 1) {
            const pRight = points[r][c + 1]
            const avgZ = (p.z + pRight.z) / 2
            const avgOpacity = (p.opacity + pRight.opacity) / 2
            
            let alpha = (0.02 + (avgZ + 20) / 80) * 0.08 * avgOpacity
            alpha = Math.max(0.005, Math.min(0.09, alpha))

            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pRight.x, pRight.y)
            ctx.stroke()
          }

          if (r < rows - 1) {
            const pBottom = points[r + 1][c]
            const avgZ = (p.z + pBottom.z) / 2
            const avgOpacity = (p.opacity + pBottom.opacity) / 2
            
            let alpha = (0.02 + (avgZ + 20) / 80) * 0.08 * avgOpacity
            alpha = Math.max(0.005, Math.min(0.09, alpha))

            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pBottom.x, pBottom.y)
            ctx.stroke()
          }
          
          if ((r + c) % 3 === 0) {
            const dotAlpha = Math.max(0.01, Math.min(0.2, (p.z + 20) / 100)) * p.opacity
            ctx.fillStyle = `rgba(168, 85, 247, ${dotAlpha})`
            ctx.beginPath()
            ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // ─── 3. RENDER QUANTUM STARDUST ───
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        let renderY = p.y - scroll.y * 0.08

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        let alphaMultiplier = 1
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x
          const dy = renderY - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 180) {
            const pullForce = (180 - dist) / 180
            
            if (dist < 80) {
              ctx.strokeStyle = `rgba(168, 85, 247, ${(80 - dist) / 80 * 0.04})`
              ctx.lineWidth = 0.3
              ctx.beginPath()
              ctx.moveTo(p.x, renderY)
              ctx.lineTo(mouse.x, mouse.y)
              ctx.stroke()
            }

            const angle = Math.atan2(dy, dx)
            const orbitAngle = angle + Math.PI / 2 + 0.1
            
            p.x -= Math.cos(angle) * pullForce * 0.65 - Math.cos(orbitAngle) * pullForce * 0.4
            p.y -= Math.sin(angle) * pullForce * 0.65 - Math.sin(orbitAngle) * pullForce * 0.4
            
            alphaMultiplier = 1 + pullForce * 2.5
          }
        }

        ctx.fillStyle = `${p.color}${p.alpha * alphaMultiplier})`
        ctx.beginPath()
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // ─── 4. CINEMATIC GRADIENT BORDERS ───
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      vignette.addColorStop(0, 'rgba(3, 2, 8, 0)')
      vignette.addColorStop(0.7, 'rgba(3, 2, 8, 0.4)')
      vignette.addColorStop(1, 'rgba(3, 2, 8, 0.94)')

      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      const headerMask = ctx.createLinearGradient(0, 0, 0, 80)
      headerMask.addColorStop(0, 'rgba(3, 2, 8, 0.9)')
      headerMask.addColorStop(1, 'rgba(3, 2, 8, 0)')
      ctx.fillStyle = headerMask
      ctx.fillRect(0, 0, width, 80)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#030208]"
      style={{
        backgroundImage: `url(${meshBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}
