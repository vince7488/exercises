import { HeroContent } from '../hero-content/hero-content'
import { useDelayedVisibility } from '../../hooks/use-delayed-visibility'
import { useFadingGallery } from '../../hooks/use-fading-gallery'
import { useParallax } from '../../hooks/use-parallax'
import type { HeroBannerFields, WordPressMedia } from '../../lib/wordpress'

type HomeHeroProps = {
  fields: HeroBannerFields
  images: WordPressMedia[]
  ctaTarget: string | null
  transferred: boolean
}

export function HomeHero({ fields, images, ctaTarget, transferred }: HomeHeroProps) {
  const activeImageIndex = useFadingGallery(images.length)
  const galleryRef = useParallax()
  const contentVisible = useDelayedVisibility(1_000)
  const content = fields.text_and_cta_content
  const overlayClassName = [
    'home-hero-overlay',
    contentVisible ? 'is-visible' : 'is-dismissed',
    transferred ? 'is-transferred' : '',
  ].filter(Boolean).join(' ')

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
        className={overlayClassName}
        aria-hidden={!contentVisible || transferred || undefined}
        inert={!contentVisible || transferred}
      >
        <div className="home-hero-scrim" aria-hidden="true" />
        <HeroContent
          className="home-hero-content"
          content={content}
          ctaTarget={ctaTarget}
          headingId="home-hero-title"
          inverseSecondaryAction
        />
      </div>
    </section>
  )
}
