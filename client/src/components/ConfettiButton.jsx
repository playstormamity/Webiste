import { useState } from 'react'

// Confetti component for Gen Z vibes 🎉
export default function ConfettiButton({ children, onClick, className = "", ...props }) {
  const [confetti, setConfetti] = useState([])

  const createConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      velocity: Math.random() * 3 + 2,
      rotation: Math.random() * 360
    }))
    
    setConfetti(prev => [...prev, ...newConfetti])
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.find(nc => nc.id === c.id)))
    }, 1000)
    
    onClick?.(e)
  }

  return (
    <div className="relative inline-block">
      <button onClick={createConfetti} className={className} {...props}>
        {children}
      </button>
      
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="pointer-events-none absolute h-2 w-2 rounded-sm"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            animation: `confetti-fall 1s ease-out forwards`,
            transform: `rotate(${particle.rotation}deg)`,
            '--angle': `${particle.angle}deg`,
            '--velocity': `${particle.velocity}`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes confetti-fall {
          to {
            transform: 
              translate(
                calc(cos(var(--angle)) * var(--velocity) * 50px),
                calc(sin(var(--angle)) * var(--velocity) * 50px + 100px)
              )
              rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
