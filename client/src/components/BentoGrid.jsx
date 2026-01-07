import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Bento Grid - asymmetric, trendy AF
export default function BentoGrid({ children, className = "" }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 ${className}`}>
      {children}
    </div>
  )
}

export function BentoCard({ 
  children, 
  className = "", 
  span = "md:col-span-2",
  to,
  highlight = false,
  ...props 
}) {
  const baseClasses = `group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:from-white/10 ${
    highlight 
      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
      : 'border-white/10 hover:border-purple-500/30'
  } ${span} ${className}`

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full p-6"
    >
      {children}
    </motion.div>
  )

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <div className={baseClasses} {...props}>
      {content}
    </div>
  )
}

// Pre-configured bento sizes
export function BentoSmall({ children, ...props }) {
  return <BentoCard span="md:col-span-2" {...props}>{children}</BentoCard>
}

export function BentoMedium({ children, ...props }) {
  return <BentoCard span="md:col-span-3" {...props}>{children}</BentoCard>
}

export function BentoLarge({ children, ...props }) {
  return <BentoCard span="md:col-span-4" {...props}>{children}</BentoCard>
}

export function BentoFull({ children, ...props }) {
  return <BentoCard span="md:col-span-6" {...props}>{children}</BentoCard>
}
