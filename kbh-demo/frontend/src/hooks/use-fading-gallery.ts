import { useEffect, useState } from 'react'

export function useFadingGallery(imageCount: number, intervalMs = 6_000) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
    if (imageCount < 2) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % imageCount)
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [imageCount, intervalMs])

  return activeIndex
}
