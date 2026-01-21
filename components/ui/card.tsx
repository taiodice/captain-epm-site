'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ 
  children, 
  className = '', 
  hover = true,
  glow = false 
}: CardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-surface-light/60 to-surface/80
        backdrop-blur-xl border border-seafoam/10
        shadow-card
        ${glow ? 'shadow-glow-teal' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { 
        y: -4,
        borderColor: 'rgba(94, 234, 212, 0.2)',
        boxShadow: '0 12px 40px rgba(94, 234, 212, 0.15)'
      } : {}}
    >
      {children}
    </motion.div>
  )
}

export function GlassCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  )
}
