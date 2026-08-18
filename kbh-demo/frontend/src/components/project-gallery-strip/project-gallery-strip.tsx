import { ArrowRight } from 'lucide-react'
import { DemoScopeButton } from '../demo-scope-dialog/demo-scope-dialog'

export type ProjectGalleryImage = {
  src: string
  alt: string
}

type ProjectGalleryStripProps = {
  images: ProjectGalleryImage[]
  headingId: string
}

// Shared gallery preview keeps the homepage and Contact page callout behavior and presentation in one component.
export function ProjectGalleryStrip({ images, headingId }: ProjectGalleryStripProps) {
  return (
    <section
      className={`gallery-strip gallery-strip--${images.length + 1}-panels`}
      aria-labelledby={headingId}
    >
      {images.map((image) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          width="1000"
          height="1000"
          loading="lazy"
        />
      ))}
      <DemoScopeButton className="gallery-callout" destination="Project Gallery">
        <span className="gallery-kicker">View our</span>
        <span id={headingId} className="gallery-title" role="heading" aria-level={2}>Project Gallery</span>
        <span className="gallery-action">Explore the gallery <ArrowRight aria-hidden="true" size={20} /></span>
      </DemoScopeButton>
    </section>
  )
}
