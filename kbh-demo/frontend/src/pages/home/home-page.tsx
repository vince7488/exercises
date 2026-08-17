import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DemoScopeButton } from '../../components/demo-scope-dialog/demo-scope-dialog'
import { designers, homeServices } from '../../data/home-content'

// The static phase-one homepage reproduces the source sequence while applying the scoped UX and accessibility remediation.
export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <img className="home-hero-image" src="/assets/home/hero-kitchen.jpg" alt="" width="1281" height="819" fetchPriority="high" />
        <div className="home-hero-scrim" aria-hidden="true" />
        <div className="container home-hero-content">
          <p className="eyebrow">Western Massachusetts & Connecticut</p>
          <h1 id="home-hero-title">Creative. Experienced. Dedicated.</h1>
          <p className="home-hero-lede">Luxury kitchen, bathroom, and residential remodeling designed around the way you live.</p>
          <p>Kitchens & Baths by Herzenberg has been transforming homes since 1949 with expert designers, dependable service, and a commitment to beautiful work.</p>
          <div className="hero-actions">
            <Link className="button" to="/contact-us/">Request a Consultation <ArrowRight aria-hidden="true" size={18} /></Link>
            <DemoScopeButton className="text-link text-link-inverse" destination="Our Design Process">Explore our process</DemoScopeButton>
          </div>
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-title">
        <div className="container services-intro">
          <p className="eyebrow">Designed for your whole home</p>
          <h2 id="services-title">Our Services</h2>
          <p>From kitchens and baths to foyers, custom cabinetry, laundry rooms, study areas, home offices, and more, our design team brings your vision to life.</p>
        </div>
        <div className="services-canvas">
          <div className="container service-grid">
            {homeServices.map((service) => (
              <article className="service-card" key={service.title}>
                <img src={service.image} alt={service.imageAlt} width="370" height="257" loading="lazy" />
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <DemoScopeButton className="text-link" destination={service.title}>Learn more <ArrowRight aria-hidden="true" size={17} /></DemoScopeButton>
                </div>
              </article>
            ))}
          </div>
          <DemoScopeButton className="button button-secondary" destination="All Services">View All Services</DemoScopeButton>
        </div>
      </section>

      <section className="feature-section feature-philosophy" aria-labelledby="philosophy-title">
        <div className="container feature-grid">
          <div className="feature-copy">
            <p className="eyebrow">From concept to completion</p>
            <h2 id="philosophy-title">Our Design Philosophy</h2>
            <p>Your home is your sanctuary, and we want the renovation process to feel as considered as the finished room. Your dedicated designer works with you from the first idea through installation, communicating directly with your contractor or builder for one connected experience.</p>
            <DemoScopeButton className="button button-secondary" destination="Our Design Philosophy">Learn More</DemoScopeButton>
          </div>
          <img src="/assets/home/quality-products.jpg" alt="Airy contemporary kitchen and dining space" width="812" height="823" loading="lazy" />
        </div>
      </section>

      <section className="feature-section feature-quality" aria-labelledby="quality-title">
        <div className="container feature-grid feature-grid-reverse">
          <img src="/assets/home/design-philosophy.jpg" alt="Custom white cabinetry with detailed storage and brass hardware" width="813" height="823" loading="lazy" />
          <div className="feature-copy">
            <p className="eyebrow">Built to last</p>
            <h2 id="quality-title">Quality Products, Expert Installation</h2>
            <p>We partner with leading makers including Wood-Mode Custom Cabinetry, Signature Custom Cabinetry, Cabico, Sub-Zero, Wolf, and more to source high-quality products made for a lasting, timeless result.</p>
            <DemoScopeButton className="button button-secondary" destination="Our Process">Learn More</DemoScopeButton>
          </div>
        </div>
      </section>

      <section className="gallery-strip" aria-labelledby="gallery-title">
        <img src="/assets/home/gallery-kitchen.jpg" alt="Soft green kitchen with a marble island" width="1000" height="1000" loading="lazy" />
        <img src="/assets/home/gallery-bathroom.jpg" alt="Luxury bathroom and custom wet bar" width="1000" height="1000" loading="lazy" />
        <DemoScopeButton className="gallery-callout" destination="Project Gallery">
          <span className="gallery-kicker">View our</span>
          <span id="gallery-title" className="gallery-title" role="heading" aria-level={2}>Project Gallery</span>
          <span className="gallery-action">Explore the gallery <ArrowRight aria-hidden="true" size={20} /></span>
        </DemoScopeButton>
      </section>

      <section className="designers-section" aria-labelledby="designers-title">
        <div className="container">
          <p className="eyebrow">Personal expertise</p>
          <h2 id="designers-title">Meet the Designers</h2>
          <div className="designer-grid">
            {designers.map((designer) => (
              <article className="designer-card" key={designer.name}>
                <img src={designer.image} alt={`Portrait of ${designer.name}`} width="1000" height="1000" loading="lazy" />
                <h3>{designer.name}</h3>
                <p>{designer.role}</p>
                <DemoScopeButton className="text-link" destination={`${designer.name}'s biography`}>Read full bio <ArrowRight aria-hidden="true" size={16} /></DemoScopeButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="consultation-section" aria-labelledby="consultation-title">
        <img src="/assets/home/consultation-kitchen.jpg" alt="" width="2143" height="1398" loading="lazy" />
        <div className="consultation-overlay" aria-hidden="true" />
        <div className="container consultation-content">
          <p className="eyebrow">Your project starts with a conversation</p>
          <h2 id="consultation-title">Ready to Get Started?</h2>
          <p>Tell us about your home, goals, and timing. Our team will follow up to arrange a design consultation and explain what to expect next.</p>
          <Link className="button button-light" to="/contact-us/">Book a Design Consultation <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>
    </>
  )
}
