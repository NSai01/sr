import { useEffect, useRef } from 'react'

import { cn } from '../../lib/utils'

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized

  const red = Number.parseInt(value.slice(0, 2), 16)
  const green = Number.parseInt(value.slice(2, 4), 16)
  const blue = Number.parseInt(value.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function CanvasText({
  text,
  className,
  canvasClassName,
  colors = ['#e7d7bd', '#d6c3a5', '#c7af8b', '#8e7a61'],
  animationDuration = 10,
}) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    let width = 0
    let height = 0
    let startTime = 0

    const resize = () => {
      const nextWidth = canvas.clientWidth
      const nextHeight = canvas.clientHeight
      const ratio = window.devicePixelRatio || 1

      width = nextWidth
      height = nextHeight
      canvas.width = Math.max(1, Math.floor(nextWidth * ratio))
      canvas.height = Math.max(1, Math.floor(nextHeight * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = (time) => {
      if (!startTime) {
        startTime = time
      }

      const elapsed = (time - startTime) / 1000
      const speed = elapsed / Math.max(animationDuration, 0.01)

      context.clearRect(0, 0, width, height)

      const base = context.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, hexToRgba(colors[0], 0.2))
      base.addColorStop(0.5, hexToRgba(colors[1] ?? colors[0], 0.4))
      base.addColorStop(1, hexToRgba(colors[2] ?? colors[1] ?? colors[0], 0.22))
      context.fillStyle = base
      context.fillRect(0, 0, width, height)

      for (let index = 0; index < 12; index += 1) {
        const offset = ((speed * 120) + index * 26) % (width + height + 120)
        context.strokeStyle = hexToRgba(colors[index % colors.length], 0.32)
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(offset - height, 0)
        context.lineTo(offset, height)
        context.stroke()
      }

      frameRef.current = window.requestAnimationFrame(draw)
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    frameRef.current = window.requestAnimationFrame(draw)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [animationDuration, colors])

  return (
    <span className={cn('canvas-text', className)}>
      <span className={cn('canvas-text__surface', canvasClassName)} aria-hidden="true">
        <canvas ref={canvasRef} className="canvas-text__canvas" />
      </span>
      <span className="canvas-text__label">{text}</span>
    </span>
  )
}
