import { useEffect, useState } from 'react'
import { MapPin, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '../brand-logo/brand-logo'
import { DemoScopeButton } from '../demo-scope-dialog/demo-scope-dialog'
import { navigation, type NavigationItem } from '../../config/navigation'

type NavigationLinkProps = {
  item: NavigationItem
  onSelect: () => void
}

// Each navigation item keeps true routes and in-page demo disclosures semantically distinct.
function NavigationLink({ item, onSelect }: NavigationLinkProps) {
  if (item.kind === 'route') {
    return <NavLink className="nav-link" to={item.to} onClick={onSelect}>{item.label}</NavLink>
  }

  return <DemoScopeButton className="nav-link" destination={item.label} onOpen={onSelect}>{item.label}</DemoScopeButton>
}

// The responsive header preserves the source's centered identity while exposing a keyboard-operable mobile menu.
export function Header() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  const leftNavigation = navigation.slice(0, 3)
  const rightNavigation = navigation.slice(3)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header">
      <div className="contact-bar">
        <div className="container contact-bar-inner">
          <a href="https://maps.app.goo.gl/QdPTuYEgcFrmFRUM9" target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" size={17} /> Agawam, MA
          </a>
          <a href="tel:4137862133"><Phone aria-hidden="true" size={17} /> (413) 786-2133</a>
        </div>
      </div>
      <div className="container header-inner">
        <nav className="desktop-nav desktop-nav-left" aria-label="Primary navigation">
          {leftNavigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={closeMenu} />)}
        </nav>
        <Link to="/" className="brand" onClick={closeMenu} aria-label="Kitchens and Baths by Herzenberg home">
          <BrandLogo variant="full" />
        </Link>
        <nav className="desktop-nav desktop-nav-right" aria-label="More navigation">
          {rightNavigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={closeMenu} />)}
        </nav>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close navigation' : 'Open navigation'}</span>
        </button>
      </div>
      <nav id="mobile-navigation" className={open ? 'mobile-nav is-open' : 'mobile-nav'} aria-label="Mobile navigation" hidden={!open}>
        <div className="container mobile-nav-inner">
          {navigation.map((item) => <NavigationLink key={item.label} item={item} onSelect={closeMenu} />)}
        </div>
      </nav>
    </header>
  )
}
