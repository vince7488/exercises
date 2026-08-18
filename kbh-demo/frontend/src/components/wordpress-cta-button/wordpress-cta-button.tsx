import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type WordPressCtaButtonProps = {
  label: string
  target: string
}

export function WordPressCtaButton({ label, target }: WordPressCtaButtonProps) {
  const external = /^https?:\/\//i.test(target)

  if (external) {
    return <a className="button" href={target}>{label} <ArrowRight aria-hidden="true" size={18} /></a>
  }

  return <Link className="button" to={target}>{label} <ArrowRight aria-hidden="true" size={18} /></Link>
}
