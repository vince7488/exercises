import { useEffect, useState } from 'react'

export function useScrollThresholdOnce(threshold: number) {
  const [reached, setReached] = useState(false)

  useEffect(() => {
    if (reached) return

    const checkThreshold = () => {
      if (window.scrollY >= threshold) setReached(true)
    }

    checkThreshold()
    window.addEventListener('scroll', checkThreshold, { passive: true })
    return () => window.removeEventListener('scroll', checkThreshold)
  }, [reached, threshold])

  return reached
}
