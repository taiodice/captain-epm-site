export function Logo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" stroke="url(#gradient)" strokeWidth="2" fill="none" />
      
      {/* Ship wheel spokes */}
      <g stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round">
        <line x1="24" y1="8" x2="24" y2="16" />
        <line x1="24" y1="32" x2="24" y2="40" />
        <line x1="8" y1="24" x2="16" y2="24" />
        <line x1="32" y1="24" x2="40" y2="24" />
        <line x1="12.7" y1="12.7" x2="18.4" y2="18.4" />
        <line x1="29.6" y1="29.6" x2="35.3" y2="35.3" />
        <line x1="12.7" y1="35.3" x2="18.4" y2="29.6" />
        <line x1="29.6" y1="18.4" x2="35.3" y2="12.7" />
      </g>
      
      {/* Center circle */}
      <circle cx="24" cy="24" r="6" fill="url(#gradient)" />
      
      {/* Inner ring */}
      <circle cx="24" cy="24" r="12" stroke="url(#gradient)" strokeWidth="1.5" fill="none" />
      
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div 
      className="rounded-xl bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center shadow-glow-teal"
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size * 0.6, height: size * 0.6 }}
      >
        <circle cx="12" cy="12" r="3" fill="#0A1628" />
        <circle cx="12" cy="12" r="8" stroke="#0A1628" strokeWidth="1.5" fill="none" />
        <g stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </g>
      </svg>
    </div>
  )
}
