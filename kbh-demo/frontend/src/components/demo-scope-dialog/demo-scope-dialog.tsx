import { createContext, type PropsWithChildren, type ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

type DemoScopeContextValue = {
  openScopeDialog: (destination: string) => void
}

const DemoScopeContext = createContext<DemoScopeContextValue | null>(null)

// The provider centralizes one native dialog so every out-of-scope destination shares the same accessible behavior.
export function DemoScopeProvider({ children }: PropsWithChildren) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [destination, setDestination] = useState('This destination')
  const [open, setOpen] = useState(false)

  const openScopeDialog = (nextDestination: string) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setDestination(nextDestination)
    setOpen(true)
  }

  const closeDialog = () => setOpen(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      closeButtonRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDialog()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const handleClosed = () => {
    setOpen(false)
    returnFocusRef.current?.focus()
  }

  return (
    <DemoScopeContext.Provider value={{ openScopeDialog }}>
      {children}
      <dialog
        className="scope-dialog"
        ref={dialogRef}
        aria-labelledby="scope-dialog-title"
        aria-describedby="scope-dialog-description"
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
      >
        <button ref={closeButtonRef} className="scope-dialog-close" type="button" onClick={closeDialog} aria-label="Close dialog">
          <X aria-hidden="true" size={22} />
        </button>
        <p className="eyebrow">Assessment demo</p>
        <h2 id="scope-dialog-title">{destination} is outside this scope.</h2>
        <p id="scope-dialog-description">
          This prototype focuses on the homepage and consultation journey while applying the identified UX and accessibility recommendations. Speak with Vernard Mercader for clarifications.
        </p>
        <button className="button button-secondary" type="button" onClick={closeDialog}>Return to the homepage</button>
      </dialog>
    </DemoScopeContext.Provider>
  )
}

// This hook keeps dialog-triggering links consistent across the header, homepage, and footer.
export function useDemoScopeDialog() {
  const context = useContext(DemoScopeContext)
  if (!context) throw new Error('useDemoScopeDialog must be used within DemoScopeProvider')
  return context
}

type DemoScopeButtonProps = {
  children: ReactNode
  className?: string
  destination: string
  onOpen?: () => void
}

// A real button is used for in-page dialog actions instead of a dead or misleading link.
export function DemoScopeButton({ children, className, destination, onOpen }: DemoScopeButtonProps) {
  const { openScopeDialog } = useDemoScopeDialog()

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        onOpen?.()
        openScopeDialog(destination)
      }}
    >
      {children}
    </button>
  )
}
