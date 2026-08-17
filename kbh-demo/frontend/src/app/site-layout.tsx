import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '../components/layout/footer'
import { Header } from '../components/layout/header'
import { DemoScopeProvider } from '../components/demo-scope-dialog/demo-scope-dialog'

// The shared layout owns global navigation, footer content, and the single reusable demo-scope dialog.
export function SiteLayout() {
  return (
    <DemoScopeProvider>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content"><Outlet /></main>
        <Footer />
        <ScrollRestoration />
      </div>
    </DemoScopeProvider>
  )
}
