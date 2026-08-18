import { type RefObject, useEffect } from 'react'

export function useCssHeightVariable(elementRef: RefObject<HTMLElement | null>, variableName: `--${string}`) {
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const updateHeight = () => {
      document.documentElement.style.setProperty(variableName, `${element.getBoundingClientRect().height}px`)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty(variableName)
    }
  }, [elementRef, variableName])
}
