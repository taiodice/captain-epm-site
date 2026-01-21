'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function FloatingElement({ 
  children, 
  delay = 0,
  duration = 6,
  className = '' 
}: { 
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

export function GradientOrb({ 
  size = 400, 
  color = 'ocean',
  className = ''
}: { 
  size?: number
  color?: 'ocean' | 'seafoam' | 'coral'
  className?: string
}) {
  const colors = {
    ocean: 'from-ocean/30 to-transparent',
    seafoam: 'from-seafoam/20 to-transparent',
    coral: 'from-coral/20 to-transparent'
  }

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colors[color]} blur-3xl pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}
