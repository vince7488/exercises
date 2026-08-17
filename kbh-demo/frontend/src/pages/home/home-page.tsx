import { Link } from 'react-router-dom'

export function HomePage() {
  return <>
    <section className="hero">
      <div className="container hero-content">
        <p className="eyebrow">Designed around you</p>
        <h1>Kitchens with a sense of home.</h1>
        <p className="hero-copy">We bring thoughtful planning, fine materials, and enduring craftsmanship together to make rooms you will love living in.</p>
        <div className="hero-actions"><Link className="button" to="/our-work">Explore our work</Link><Link className="text-link" to="/contact">Begin your project <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
    <section className="intro section container">
      <p className="eyebrow">The Herzenberg way</p>
      <div className="split-heading"><h2>A personal process from first sketch to final detail.</h2><p>Every kitchen begins with listening. We take the time to understand your home, your routines, and what makes a space feel unmistakably yours.</p></div>
      <Link className="text-link" to="/our-approach">How we work <span aria-hidden="true">→</span></Link>
    </section>
  </>
}
