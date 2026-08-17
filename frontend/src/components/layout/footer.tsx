import { Link } from 'react-router-dom'

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-inner">
      <p><strong>Kitchens by Herzenberg</strong><br />Made for the way you live.</p>
      <Link to="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
      <small>© {new Date().getFullYear()} Kitchens by Herzenberg</small>
    </div>
  </footer>
}
