import { useEffect, useState } from 'react'

import { cn } from '../../lib/utils'

export function LayoutTextFlip({ text, words, className, interval = 2200 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!words?.length || words.length === 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [interval, words])

  const activeWord = words?.[index] ?? ''

  return (
    <span className={cn('layout-text-flip', className)}>
      <span className="layout-text-flip__text">{text}</span>
      <span className="layout-text-flip__word-box" aria-live="polite">
        <span key={activeWord} className="layout-text-flip__word">
          {activeWord}
        </span>
      </span>
    </span>
  )
}
