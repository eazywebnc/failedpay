'use client'
import { useEffect, useRef } from 'react'

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
}

export function AnimatedMeshBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()
    window.addEventListener('resize', resize)

    // Red/crimson danger → green recovery gradient story
    const orbs: Orb[] = [
      { x: 0.2, y: 0.2, vx: 0.0003, vy: 0.0002, r: 0.3, color: 'rgba(239,68,68,0.10)' },    // red-500 danger
      { x: 0.7, y: 0.3, vx: -0.0002, vy: 0.0003, r: 0.25, color: 'rgba(251,146,60,0.08)' },  // orange-400 warning
      { x: 0.5, y: 0.7, vx: 0.0001, vy: -0.0002, r: 0.35, color: 'rgba(16,185,129,0.10)' },  // emerald-500 recovery
      { x: 0.8, y: 0.8, vx: -0.0003, vy: -0.0001, r: 0.2, color: 'rgba(244,63,94,0.07)' },   // rose-500 alert
    ]

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -0.2 || orb.x > 1.2) orb.vx *= -1
        if (orb.y < -0.2 || orb.y > 1.2) orb.vy *= -1
        const cx = orb.x * canvas.width
        const cy = orb.y * canvas.height
        const radius = orb.r * Math.min(canvas.width, canvas.height)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, orb.color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
}
