import { DemoScopeButton } from '../demo-scope-dialog/demo-scope-dialog'
import { WordPressCtaButton } from '../wordpress-cta-button/wordpress-cta-button'
import { useDelayedVisibility } from '../../hooks/use-delayed-visibility'
import { useFadingGallery } from '../../hooks/use-fading-gallery'
import { useParallax } from '../../hooks/use-parallax'
import type { HeroBannerFields, WordPressMedia } from '../../lib/wordpress'

type HomeHeroProps = {
  fields: HeroBannerFields
  images: WordPressMedia[]
  ctaTarget: string | null
}

export function HomeHero({ fields, images, ctaTarget }: HomeHeroProps) {
  const activeImageIndex = useFadingGallery(images.length)
  const galleryRef = useParallax()
  const contentVisible = useDelayedVisibility(1_000)
  const content = fields.text_and_cta_content

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div ref={galleryRef} className="home-hero-gallery" aria-hidden="true">
        {images.map((image, index) => (
          <img
            key={image.id}
            className={index === activeImageIndex ? 'home-hero-image is-active' : 'home-hero-image'}
            src={image.source_url}
            alt=""
            width={image.media_details?.width}
            height={image.media_details?.height}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
      </div>
      <div
        className={contentVisible ? 'home-hero-overlay is-visible' : 'home-hero-overlay is-dismissed'}
        aria-hidden={!contentVisible || undefined}
        inert={!contentVisible}
      >
        <div className="home-hero-scrim" aria-hidden="true" />
        <div className="home-hero-content">
          <h1 id="home-hero-title" className="frontpage-seo-text">{content.supporting_seo_text}</h1>
          <span className="very-large-frontpage-title">{content.heading}</span>
          <h2>{content.sub_heading}</h2>
          <p>{content.lengthy_statement}</p>
          <div className="hero-actions">
            {ctaTarget && content.cta_label && <WordPressCtaButton label={content.cta_label} target={ctaTarget} />}
            <DemoScopeButton className="text-link text-link-inverse" destination="Our Design Process">Explore our process</DemoScopeButton>
          </div>
        </div>
      </div>
    </section>
  )
}
