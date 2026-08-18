import { useEffect, useRef, useState } from 'react'
import { MapPin, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '../brand-logo/brand-logo'
import { DemoScopeButton } from '../demo-scope-dialog/demo-scope-dialog'
import { navigation, type NavigationItem } from '../../config/navigation'

type NavigationLinkProps = {
  item: NavigationItem
  onSelect: () => void
}

type HeaderNavigationProps = {
  compact?: boolean
  menuId: string
  onClose: () => void
  onToggle: () => void
  open: boolean
}

// Each navigation item keeps true routes and in-page demo disclosures semantically distinct.
function NavigationLink({ item, onSelect }: NavigationLinkProps) {
  if (item.kind === 'route') {
    return <NavLink className="nav-link" to={item.to} onClick={onSelect}>{item.label}</NavLink>
  }

  return <DemoScopeButton className="nav-link" destination={item.label} onOpen={onSelect}>{item.label}</DemoScopeButton>
}

// The shared navigation keeps both headers semantically aligned; its mounted-but-inert drawer permits CSS motion without exposing closed links.
function HeaderNavigation({ compact = false, menuId, onClose, onToggle, open }: HeaderNavigationProps) {
  const leftNavigation = navigation.slice(0, 3)
  const rightNavigation = navigation.slice(3)
  const innerClassName = compact ? 'container header-inner header-inner-compact' : 'container header-inner'

  return (
    <>
      <div className={innerClassName}>
        <nav className="desktop-nav desktop-nav-left" aria-label="Primary navigation">
          {leftNavigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={onClose} />)}
        </nav>
        <Link to="/" className="brand" onClick={onClose} aria-label="Kitchens and Baths by Herzenberg home">
          <BrandLogo variant={compact ? 'minimized' : 'full'} />
          {!compact && <span className="brand-wordmark">Kitchens &amp; Baths by Herzenberg</span>}
        </Link>
        <nav className="desktop-nav desktop-nav-right" aria-label="More navigation">
          {rightNavigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={onClose} />)}
        </nav>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls={menuId} onClick={onToggle}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close navigation' : 'Open navigation'}</span>
        </button>
      </div>
      <nav
        id={menuId}
        className={open ? 'mobile-nav is-open' : 'mobile-nav'}
        aria-hidden={!open || undefined}
        aria-label="Mobile navigation"
        inert={!open}
      >
        <div className="container mobile-nav-inner">
          {navigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={onClose} />)}
        </div>
      </nav>
    </>
  )
}

// The large header scrolls in normal flow; an observed 185px marker activates the independent sticky compact navigation.
export function Header() {
  const [originalMenuOpen, setOriginalMenuOpen] = useState(false)
  const [compactMenuOpen, setCompactMenuOpen] = useState(false)
  const [compactVisible, setCompactVisible] = useState(false)
  const compactThresholdRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!originalMenuOpen && !compactMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOriginalMenuOpen(false)
        setCompactMenuOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [compactMenuOpen, originalMenuOpen])

  useEffect(() => {
    const threshold = compactThresholdRef.current
    if (!threshold) return

    const observer = new IntersectionObserver(([entry]) => {
      setCompactVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })

    observer.observe(threshold)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (compactVisible) {
      setOriginalMenuOpen(false)
    } else {
      setCompactMenuOpen(false)
    }
  }, [compactVisible])

  return (
    <>
      <header className="site-header site-header-original header-state--top" aria-hidden={compactVisible || undefined} inert={compactVisible}>
        <div className="contact-bar">
          <div className="container contact-bar-inner">
            <a href="https://maps.app.goo.gl/QdPTuYEgcFrmFRUM9" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" size={17} /> Agawam, MA
            </a>
            <a href="tel:4137862133"><Phone aria-hidden="true" size={17} /> (413) 786-2133</a>
          </div>
        </div>
        <HeaderNavigation
          menuId="mobile-navigation-original"
          onClose={() => setOriginalMenuOpen(false)}
          onToggle={() => setOriginalMenuOpen((current) => !current)}
          open={originalMenuOpen}
        />
        <span ref={compactThresholdRef} className="compact-header-threshold" aria-hidden="true" />
      </header>

      <header
        className={compactVisible ? 'site-header compact-header header-state--scrolled is-visible' : 'site-header compact-header header-state--scrolled'}
        aria-hidden={!compactVisible || undefined}
        inert={!compactVisible}
      >
        <HeaderNavigation
          compact
          menuId="mobile-navigation-compact"
          onClose={() => setCompactMenuOpen(false)}
          onToggle={() => setCompactMenuOpen((current) => !current)}
          open={compactMenuOpen}
        />
      </header>
    </>
  )
}
