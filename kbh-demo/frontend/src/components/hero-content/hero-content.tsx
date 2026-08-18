import { DemoScopeButton } from '../demo-scope-dialog/demo-scope-dialog'
import { WordPressCtaButton } from '../wordpress-cta-button/wordpress-cta-button'
import type { HeroBannerFields } from '../../lib/wordpress'

type HeroContentProps = {
  className: string
  content: HeroBannerFields['text_and_cta_content']
  ctaTarget: string | null
  headingId: string
  inverseSecondaryAction?: boolean
}

export function HeroContent({ className, content, ctaTarget, headingId, inverseSecondaryAction = false }: HeroContentProps) {
  const secondaryActionClass = inverseSecondaryAction ? 'text-link text-link-inverse' : 'text-link'

  return (
    <div className={`hero-copy ${className}`}>
      <h1 id={headingId} className="frontpage-seo-text">{content.supporting_seo_text}</h1>
      <span className="very-large-frontpage-title">{content.heading}</span>
      <h2>{content.sub_heading}</h2>
      <p>{content.lengthy_statement}</p>
      <div className="hero-actions">
        {ctaTarget && content.cta_label && <WordPressCtaButton label={content.cta_label} target={ctaTarget} />}
        <DemoScopeButton className={secondaryActionClass} destination="Our Design Process">Explore our process</DemoScopeButton>
      </div>
    </div>
  )
}
