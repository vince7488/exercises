import { useEffect, useState } from 'react'

export function useDelayedVisibility(delayMs: number) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setVisible(true), delayMs)
    return () => window.clearTimeout(timeoutId)
  }, [delayMs])

  return visible
}
