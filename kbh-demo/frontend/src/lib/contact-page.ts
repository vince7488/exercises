export type ContactDetail = {
  title: string
  contentHtml: string
}

export type ContactPageContent = {
  introductionHtml: string
  details: ContactDetail[]
  formHtml: string
}

type ContactFormOptions = {
  pageId: number
  submitUrl: string
}

const contactFieldLabels: Record<string, string> = {
  'wpforms-12-field_2': 'Email Address',
  'wpforms-12-field_4': 'Phone Number',
  'wpforms-12-field_3': 'Message',
}

const contactFieldPlaceholders: Record<string, string> = {
  'wpforms-12-field_2': 'E.g. john@doe.com',
  'wpforms-12-field_5': 'E.g. Springfield',
  'wpforms-12-field_3': 'Enter your message…',
}

// Normalizes the published Contact blocks into the page sections used by React while leaving editorial copy in WordPress.
export function normalizeContactPageContent(html: string, formOptions: ContactFormOptions): ContactPageContent | null {
  if (typeof DOMParser === 'undefined') return null

  const document = new DOMParser().parseFromString(html, 'text/html')
  const introduction = document.body.querySelector<HTMLParagraphElement>('p.wp-block-paragraph')
  const detailHeadings = [...document.body.querySelectorAll<HTMLHeadingElement>('h3.wp-block-heading')]
  const form = document.body.querySelector<HTMLDivElement>('.wpforms-container')

  if (!introduction || detailHeadings.length < 3 || !form) return null

  const details = detailHeadings.slice(0, 3).map((heading) => ({
    title: heading.textContent?.trim() ?? '',
    contentHtml: heading.parentElement?.querySelector<HTMLParagraphElement>('p.wp-block-paragraph')?.innerHTML ?? '',
  }))

  prepareContactForm(form, formOptions)

  return {
    introductionHtml: introduction.innerHTML,
    details,
    formHtml: form.outerHTML,
  }
}

// Cleans the REST-delivered WPForms markup and supplies the source page's visible labels, placeholders, and browser hints.
function prepareContactForm(form: HTMLDivElement, options: ContactFormOptions) {
  form.querySelectorAll('script, style, noscript, #wpforms-error-noscript').forEach((element) => element.remove())

  const title = form.querySelector<HTMLElement>('.wpforms-title')
  title?.setAttribute('role', 'heading')
  title?.setAttribute('aria-level', '2')

  const formElement = form.querySelector<HTMLFormElement>('form')
  if (formElement) {
    formElement.action = options.submitUrl

    const action = document.createElement('input')
    action.type = 'hidden'
    action.name = 'action'
    action.value = 'wpforms_submit'
    formElement.append(action)

    const postId = document.createElement('input')
    postId.type = 'hidden'
    postId.name = 'wpforms[post_id]'
    postId.value = String(options.pageId)
    formElement.append(postId)
  }

  const nameLegend = form.querySelector<HTMLElement>('.wpforms-field-name legend')
  nameLegend?.classList.add('sr-only')

  const nameLabels = [...form.querySelectorAll<HTMLLabelElement>('.wpforms-field-name .wpforms-field-sublabel')]
  nameLabels.forEach((label, index) => {
    label.textContent = index === 0 ? 'First Name' : 'Last Name'
    label.className = 'wpforms-field-label contact-form-label'
    const required = document.createElement('span')
    required.className = 'wpforms-required-label'
    required.setAttribute('aria-hidden', 'true')
    required.textContent = '*'
    label.append(' ', required)
    label.parentElement?.prepend(label)
  })

  Object.entries(contactFieldLabels).forEach(([fieldId, labelText]) => {
    const label = form.querySelector<HTMLLabelElement>(`label[for="${fieldId}"]`)
    if (!label) return
    const required = label.querySelector('.wpforms-required-label')
    label.textContent = labelText
    if (required) label.append(' ', required)
  })

  Object.entries(contactFieldPlaceholders).forEach(([fieldId, placeholder]) => {
    form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${fieldId}`)?.setAttribute('placeholder', placeholder)
  })

  form.querySelector<HTMLInputElement>('#wpforms-12-field_1')?.setAttribute('autocomplete', 'given-name')
  form.querySelector<HTMLInputElement>('#wpforms-12-field_1-last')?.setAttribute('autocomplete', 'family-name')
  form.querySelector<HTMLInputElement>('#wpforms-12-field_2')?.setAttribute('autocomplete', 'email')
  form.querySelector<HTMLInputElement>('#wpforms-12-field_4')?.setAttribute('autocomplete', 'tel')
  form.querySelector<HTMLInputElement>('#wpforms-12-field_5')?.setAttribute('autocomplete', 'address-level2')
  form.querySelector<HTMLInputElement>('#wpforms-12-field_6')?.setAttribute('autocomplete', 'address-level1')
}
