import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

// The footer retains the showroom and direct-contact details while keeping demo-owned legal routes explicit.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/assets/home/kbh-logo-white.png" alt="Kitchens and Baths by Herzenberg" width="810" height="858" />
          <p>Creative. Experienced. Dedicated.</p>
        </div>
        <div className="footer-column">
          <MapPin aria-hidden="true" />
          <div>
            <h2>Visit Our Showroom</h2>
            <p><a href="https://maps.app.goo.gl/QdPTuYEgcFrmFRUM9" target="_blank" rel="noreferrer">1 South End Bridge Circle<br />Agawam, MA 01001</a></p>
            <p>Mon–Fri: 9am–5pm<br />Other times available by appointment</p>
          </div>
        </div>
        <div className="footer-column">
          <Phone aria-hidden="true" />
          <div>
            <h2>Contact Us</h2>
            <p><a href="tel:4137862133">(413) 786-2133</a></p>
            <p className="footer-email"><Mail aria-hidden="true" size={18} /><a href="mailto:design@kitchensbyherzenberg.com">design@kitchensbyherzenberg.com</a></p>
            <div className="social-links" aria-label="Social media">
              <a href="https://www.facebook.com/herkitchen01" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.instagram.com/kitchensbyherzenberg/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.pinterest.ca/kitchensbathsbyherzenberg/_saved/" target="_blank" rel="noreferrer">Pinterest</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <p><Link to="/privacy-policy/">Privacy Policy</Link><span aria-hidden="true"> | </span><Link to="/accessibility-statement/">Accessibility Statement</Link></p>
          <p>Assessment demo · Not the production website</p>
          <p>© {new Date().getFullYear()} Kitchens & Baths by Herzenberg</p>
        </div>
      </div>
    </footer>
  )
}
