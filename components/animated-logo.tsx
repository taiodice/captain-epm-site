'use client'

import { HTMLAttributes } from 'react'

export function AnimatedLogo({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`anim-chase flex items-center justify-center cursor-pointer ${className}`} {...props}>
      <style jsx global>{`
        /* ===== ANIMATION 17: Chase ===== */
        .anim-chase:hover svg {
          animation: chase-run 2s ease-in-out infinite;
        }
        
        .anim-chase:hover .wordmark {
          animation: chase-follow 2s ease-in-out infinite;
        }
        
        @keyframes chase-run {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(30px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-30px); }
        }
        
        @keyframes chase-follow {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(15px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-15px); }
        }
      `}</style>

      <div className="flex items-center gap-3">
        {/* SVG Logo */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 transition-transform"
        >
          <path d="M50 18 L50 55 L26 55 Z" fill="#5EEAD4" />
          <path d="M50 24 L50 52 L68 52 Z" fill="#5EEAD4" opacity="0.6" />
          <line x1="50" y1="16" x2="50" y2="62" stroke="#5EEAD4" strokeWidth="2.5" />
          <path d="M20 58 L28 68 L72 68 L80 58 Z" fill="#5EEAD4" />
          <ellipse cx="50" cy="70" rx="42" ry="4" fill="#5EEAD4" opacity="0.3" />
          <path d="M12 75 Q28 72 44 75 Q60 78 76 75" stroke="#5EEAD4" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>

        {/* Text Wordmark */}
        <span className="wordmark text-3xl font-bold tracking-tight text-slate-100 flex transition-transform">
          <span>Captain</span>
          <span className="text-teal-400">EPM</span>
        </span>
      </div>
    </div>
  )
}
