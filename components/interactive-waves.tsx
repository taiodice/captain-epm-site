'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Point {
  x: number
  y: number
}

export function InteractiveWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Smooth mouse movement
    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.08)
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.08)

    // Clear canvas
    ctx.fillStyle = '#0A1628'
    ctx.fillRect(0, 0, width, height)

    const time = Date.now() * 0.001
    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y

    // Wave configuration
    const waves = [
      { y: height * 0.65, amplitude: 50, frequency: 0.008, speed: 0.8, color: 'rgba(94, 234, 212, 0.15)' },
      { y: height * 0.70, amplitude: 40, frequency: 0.010, speed: 1.0, color: 'rgba(94, 234, 212, 0.20)' },
      { y: height * 0.75, amplitude: 60, frequency: 0.006, speed: 0.6, color: 'rgba(45, 212, 191, 0.25)' },
      { y: height * 0.80, amplitude: 35, frequency: 0.012, speed: 1.2, color: 'rgba(153, 246, 228, 0.18)' },
      { y: height * 0.85, amplitude: 45, frequency: 0.009, speed: 0.9, color: 'rgba(94, 234, 212, 0.22)' },
    ]

    waves.forEach((wave) => {
      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x <= width; x += 3) {
        // Base wave
        let y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude

        // Mouse influence - create ripple effect
        const dx = x - mouseX
        const dy = wave.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 300

        if (distance < maxDistance) {
          const influence = (1 - distance / maxDistance) * 80
          const ripple = Math.sin(distance * 0.03 - time * 3) * influence
          y += ripple
        }

        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.fill()
    })

    // Draw flowing lines on top for extra depth
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(94, 234, 212, ${0.1 + i * 0.05})`
      ctx.lineWidth = 1.5

      const baseY = height * (0.55 + i * 0.12)

      for (let x = 0; x <= width; x += 2) {
        let y = baseY + Math.sin(x * 0.005 + time * (0.5 + i * 0.2) + i) * (30 + i * 10)
        y += Math.sin(x * 0.01 + time * 0.8) * 15

        // Mouse ripple on lines too
        const dx = x - mouseX
        const dy = baseY - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 250

        if (distance < maxDistance) {
          const influence = (1 - distance / maxDistance) * 40
          y += Math.sin(distance * 0.04 - time * 4) * influence
        }

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Subtle glow at mouse position
    if (mouseX > 0 && mouseY > 0) {
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200)
      gradient.addColorStop(0, 'rgba(94, 234, 212, 0.08)')
      gradient.addColorStop(1, 'rgba(94, 234, 212, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    animationRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    // Initialize mouse position to center
    targetMouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#0A1628' }}
    />
  )
}
