import { useEffect, useRef } from 'react'

export function useParallax(speed = 0.2, maximumOffset = 80) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animationFrameId = 0

    const updateOffset = () => {
      animationFrameId = 0
      const section = element.parentElement
      if (!section) return

      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const offset = Math.max(-maximumOffset, Math.min(maximumOffset, -rect.top * speed))
      element.style.setProperty('--hero-parallax-offset', `${offset}px`)
    }

    const requestUpdate = () => {
      if (!animationFrameId) animationFrameId = window.requestAnimationFrame(updateOffset)
    }

    updateOffset()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
    }
  }, [maximumOffset, speed])

  return elementRef
}
