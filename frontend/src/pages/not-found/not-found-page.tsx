import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="section container not-found"><p className="eyebrow">404</p><h1>That page has moved or does not exist.</h1><Link className="button" to="/">Return home</Link></section>
}
