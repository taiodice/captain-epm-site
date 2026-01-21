'use client'

import { motion } from 'framer-motion'

interface WaveDividerProps {
  flip?: boolean
  className?: string
}

export function WaveDivider({ flip = false, className = '' }: WaveDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <motion.svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        initial={{ x: 0 }}
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
          fill="url(#wave-gradient)"
          fillOpacity="0.3"
        />
        <path
          d="M0 80C240 40 480 120 720 80C960 40 1200 120 1440 80V120H0V80Z"
          fill="url(#wave-gradient)"
          fillOpacity="0.5"
        />
        <path
          d="M0 100C240 70 480 130 720 100C960 70 1200 130 1440 100V120H0V100Z"
          fill="url(#wave-gradient)"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D9488" />
            <stop offset="0.5" stopColor="#5EEAD4" />
            <stop offset="1" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}

export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <WaveDivider />
      </motion.div>
    </div>
  )
}
