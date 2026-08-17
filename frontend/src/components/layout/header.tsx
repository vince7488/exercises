import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../config/navigation'

export function Header() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return <header className="site-header">
    <div className="container header-inner">
      <NavLink to="/" className="brand" onClick={closeMenu} aria-label="Kitchens by Herzenberg home">
        <span>Kitchens</span><small>by Herzenberg</small>
      </NavLink>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
        <span className="sr-only">Toggle navigation</span><span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {navigation.map(({ label, to }) => <NavLink key={to} to={to} onClick={closeMenu}>{label}</NavLink>)}
      </nav>
    </div>
  </header>
}
