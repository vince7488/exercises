import { Clock3, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef, useState, type ComponentType, type FormEvent } from 'react'
import { ProjectGalleryStrip } from '../../components/project-gallery-strip/project-gallery-strip'
import { normalizeContactPageContent, type ContactPageContent } from '../../lib/contact-page'
import { getMediaByIds, getPageBySlug, getWordPressAdminAjaxUrl, type WordPressMedia } from '../../lib/wordpress'
import { submitWpForm } from '../../lib/wpforms'
import { NotFoundPage } from '../not-found/not-found-page'

type ContactPageState = {
  titleHtml: string
  content: ContactPageContent
  featuredImage: WordPressMedia | null
}

const contactIcons: ComponentType<{ 'aria-hidden': true; size: number; strokeWidth: number }>[] = [MapPin, Clock3, Phone]

// The Contact page maps WordPress-owned copy, details, form markup, and featured media into the source-faithful React layout.
export function ContactPage() {
  const [page, setPage] = useState<ContactPageState | null | undefined>(undefined)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadContactPage() {
      try {
        const wordpressPage = await getPageBySlug('contact')
        if (!wordpressPage) {
          if (!cancelled) setPage(null)
          return
        }

        const content = normalizeContactPageContent(wordpressPage.content.rendered, {
          pageId: wordpressPage.id,
          submitUrl: getWordPressAdminAjaxUrl(),
        })
        if (!content) throw new Error('The Contact page blocks could not be mapped.')

        const [featuredImage] = await getMediaByIds([wordpressPage.featured_media])
        if (!cancelled) {
          setPage({
            titleHtml: wordpressPage.title.rendered,
            content,
            featuredImage: featuredImage ?? null,
          })
        }
      } catch {
        if (!cancelled) setError(true)
      }
    }

    loadContactPage()
    return () => { cancelled = true }
  }, [])

  if (error) return <section className="section container"><h1>We could not load this page.</h1><p>Please try again shortly.</p></section>
  if (page === undefined) return <section className="section container"><p className="eyebrow">Loading</p></section>
  if (!page) return <NotFoundPage />

  return (
    <article className="contact-page">
      {page.featuredImage && (
        <figure className="contact-hero">
          <img
            src={page.featuredImage.source_url}
            alt={page.featuredImage.alt_text}
            width={page.featuredImage.media_details?.width}
            height={page.featuredImage.media_details?.height}
          />
        </figure>
      )}

      <section className="contact-information" aria-labelledby="contact-title">
        <div className="container contact-introduction">
          <h1 id="contact-title" dangerouslySetInnerHTML={{ __html: page.titleHtml }} />
          <div dangerouslySetInnerHTML={{ __html: page.content.introductionHtml }} />
        </div>

        <div className="container contact-detail-grid">
          {page.content.details.map((detail, index) => {
            const Icon = contactIcons[index] ?? MapPin
            return (
              <section className="contact-detail" key={detail.title} aria-labelledby={`contact-detail-${index}`}>
                <span className="contact-detail-icon"><Icon aria-hidden={true} size={44} strokeWidth={1.6} /></span>
                <h2 id={`contact-detail-${index}`}>{detail.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: detail.contentHtml }} />
              </section>
            )
          })}
        </div>
      </section>

      <section className="contact-form-zone" aria-label="Schedule a consultation">
        <ContactForm formHtml={page.content.formHtml} />
      </section>

      <ProjectGalleryStrip
        headingId="contact-gallery-title"
        images={[
          { src: '/assets/home/gallery-kitchen.jpg', alt: 'Soft green kitchen with a marble island' },
          { src: '/assets/home/gallery-bathroom.jpg', alt: 'Bright custom bathroom with a freestanding tub' },
          { src: '/assets/home/gallery-blue-kitchen.jpg', alt: 'Blue custom cabinetry with brass details' },
        ]}
      />
    </article>
  )
}

type ContactFormProps = {
  formHtml: string
}

type ContactFormFeedback = {
  kind: 'success' | 'error'
  message: string
} | null

// ContactForm progressively enhances the REST-rendered WPForms markup with AJAX submission and accessible feedback.
function ContactForm({ formHtml }: ContactFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<ContactFormFeedback>(null)

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return

    event.preventDefault()
    if (!form.reportValidity() || form.dataset.submitting === 'true') return

    clearWpFormsErrors(form)
    setFeedback(null)
    form.dataset.submitting = 'true'

    const submitButton = form.querySelector<HTMLButtonElement>('.wpforms-submit')
    const defaultButtonLabel = submitButton?.dataset.submitText || submitButton?.textContent || 'Send Message'
    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = submitButton.dataset.altText || 'Sending…'
    }

    try {
      const result = await submitWpForm(form)
      if (result.success) {
        form.reset()
        setFeedback({ kind: 'success', message: result.message })
      } else {
        showWpFormsFieldErrors(form, result.fieldErrors)
        setFeedback({ kind: 'error', message: result.message })
      }
    } catch (error) {
      console.error('WPForms submission failed.', error)
      setFeedback({
        kind: 'error',
        message: 'We could not send your request. Please try again or contact the showroom by phone.',
      })
    } finally {
      delete form.dataset.submitting
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = defaultButtonLabel
      }
    }
  }

  return (
    <div className="contact-form-card">
      <div ref={containerRef} onSubmit={handleSubmit} dangerouslySetInnerHTML={{ __html: formHtml }} />
      <p
        className={feedback ? `contact-form-feedback is-${feedback.kind}` : 'contact-form-feedback'}
        role={feedback?.kind === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {feedback?.message}
      </p>
    </div>
  )
}

function clearWpFormsErrors(form: HTMLFormElement) {
  form.querySelectorAll('.contact-form-field-error').forEach((error) => error.remove())
  form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'))
}

function showWpFormsFieldErrors(form: HTMLFormElement, errors: Record<string, string>) {
  Object.entries(errors).forEach(([fieldName, message], index) => {
    const field = form.elements.namedItem(fieldName)
    const element = field instanceof HTMLElement ? field : null
    if (!element) return

    const errorId = element.getAttribute('aria-errormessage') || `contact-form-error-${index}`
    const error = document.createElement('em')
    error.id = errorId
    error.className = 'contact-form-field-error'
    error.setAttribute('role', 'alert')
    error.textContent = message

    element.setAttribute('aria-invalid', 'true')
    element.setAttribute('aria-errormessage', errorId)
    element.insertAdjacentElement('afterend', error)
  })

  form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}
