export type WpFormsSubmissionResult = {
  success: boolean
  message: string
  fieldErrors: Record<string, string>
}

type WpFormsAjaxResponse = {
  success?: boolean
  data?: {
    confirmation?: string
    errors?: {
      general?: Record<string, string>
      field?: Record<string, string | Record<string, string>>
    }
  }
}

function normalizeFieldErrors(errors: Record<string, string | Record<string, string>>) {
  const normalized: Record<string, string> = {}

  Object.entries(errors).forEach(([fieldName, message]) => {
    if (typeof message === 'string') {
      normalized[fieldName] = htmlToText(message)
      return
    }

    const compoundFieldName = fieldName.replace(/\[[^\]]+\]$/, '')
    Object.entries(message).forEach(([part, partMessage]) => {
      normalized[`${compoundFieldName}[${part}]`] = htmlToText(partMessage)
    })
  })

  return normalized
}

function htmlToText(value: string) {
  if (typeof DOMParser === 'undefined') return value
  return new DOMParser().parseFromString(value, 'text/html').body.textContent?.trim() ?? ''
}

function getSubmissionUrl(form: HTMLFormElement) {
  const action = form.getAttribute('action')
  if (!action) throw new Error('The WordPress form submission URL is missing.')
  return new URL(action, window.location.href).toString()
}

// Submits the published WPForms payload to its native AJAX processor and normalizes its response for React.
export async function submitWpForm(form: HTMLFormElement): Promise<WpFormsSubmissionResult> {
  const formData = new FormData(form)
  const token = form.dataset.token

  formData.set('action', 'wpforms_submit')
  if (token) formData.set('wpforms[token]', token)
  formData.set('page_title', document.title)
  formData.set('page_url', window.location.href)

  // WPForms requires a hidden field named `action`, which shadows HTMLFormElement.action.
  // Read the attribute directly so the request goes to WordPress instead of the React route.
  const response = await fetch(getSubmissionUrl(form), {
    method: 'POST',
    body: formData,
    credentials: 'omit',
  })

  if (!response.ok) throw new Error(`WordPress rejected the form submission (${response.status}).`)

  const responseText = await response.text()
  let payload: WpFormsAjaxResponse
  try {
    payload = JSON.parse(responseText) as WpFormsAjaxResponse
  } catch {
    throw new Error(`WordPress returned an invalid form response (${response.status}).`)
  }
  if (payload.success) {
    return {
      success: true,
      message: htmlToText(payload.data?.confirmation ?? '') || 'Thank you. Your consultation request has been sent.',
      fieldErrors: {},
    }
  }

  const generalErrors = Object.values(payload.data?.errors?.general ?? {}).map(htmlToText).filter(Boolean)
  return {
    success: false,
    message: generalErrors.join(' ') || 'Please correct the highlighted fields and try again.',
    fieldErrors: normalizeFieldErrors(payload.data?.errors?.field ?? {}),
  }
}
