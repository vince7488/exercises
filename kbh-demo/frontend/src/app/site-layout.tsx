import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '../components/layout/footer'
import { Header } from '../components/layout/header'

export function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
