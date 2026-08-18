const wordpressUrl = import.meta.env.VITE_WORDPRESS_URL?.replace(/\/$/, '')

export type WordPressRenderedText = {
  rendered: string
}

export type WordPressPageTarget = number | string | false | null

export type HeroBannerFields = {
  text_and_cta_content: {
    supporting_seo_text: string
    heading: string
    sub_heading: string
    lengthy_statement: string
    cta_label: string
    cta_target: WordPressPageTarget
  }
  hero_banner_gallery: number[]
}

export type HomePageAcf = {
  hero_banner: HeroBannerFields
}

export type WordPressPage<TAcf = Record<string, unknown>> = {
  id: number
  slug: string
  title: WordPressRenderedText
  content: WordPressRenderedText
  excerpt: WordPressRenderedText
  acf: TAcf
}

export type WordPressMedia = {
  id: number
  alt_text: string
  source_url: string
  media_details?: {
    width?: number
    height?: number
    sizes?: Record<string, {
      width: number
      height: number
      source_url: string
    }>
  }
}

function getApiUrl(path: string) {
  if (!wordpressUrl) throw new Error('VITE_WORDPRESS_URL is not configured.')
  return `${wordpressUrl}/wp-json/wp/v2${path}`
}

async function fetchWordPress<T>(path: string): Promise<T> {
  const response = await fetch(getApiUrl(path), { signal: AbortSignal.timeout(8_000) })
  if (!response.ok) throw new Error(`Unable to load WordPress content (${response.status}).`)
  return response.json() as Promise<T>
}

export async function getPageBySlug<TAcf = Record<string, unknown>>(slug: string): Promise<WordPressPage<TAcf> | null> {
  if (!wordpressUrl) return null
  const fields = 'id,slug,title,content,excerpt,acf'
  const pages = await fetchWordPress<WordPressPage<TAcf>[]>(`/pages?slug=${encodeURIComponent(slug)}&_fields=${fields}`)
  return pages[0] ?? null
}

export async function getPageById(id: number): Promise<WordPressPage | null> {
  if (!wordpressUrl) return null
  try {
    return await fetchWordPress<WordPressPage>(`/pages/${id}?_fields=id,slug,title,content,excerpt,acf`)
  } catch (error) {
    if (error instanceof Error && error.message.includes('(404)')) return null
    throw error
  }
}

export async function getMediaByIds(ids: number[]): Promise<WordPressMedia[]> {
  const uniqueIds = [...new Set(ids.filter(Number.isInteger))]
  if (!wordpressUrl || uniqueIds.length === 0) return []

  const fields = 'id,alt_text,source_url,media_details'
  const media = await fetchWordPress<WordPressMedia[]>(`/media?include=${uniqueIds.join(',')}&orderby=include&per_page=${uniqueIds.length}&_fields=${fields}`)
  const mediaById = new Map(media.map((item) => [item.id, item]))
  return uniqueIds.flatMap((id) => mediaById.get(id) ?? [])
}

const frontendRoutesByWordPressSlug: Record<string, string> = {
  'home-page': '/',
  contact: '/contact-us/',
  'privacy-policy': '/privacy-policy/',
  'accessibility-statement': '/accessibility-statement/',
}

export function mapWordPressContentUrls(html: string) {
  if (!wordpressUrl || typeof DOMParser === 'undefined') return html

  const document = new DOMParser().parseFromString(html, 'text/html')
  const wordpressOrigin = new URL(wordpressUrl).origin

  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (!href || href.startsWith('#')) return

    const linkUrl = new URL(href, wordpressUrl)
    if (linkUrl.origin !== wordpressOrigin) return

    const slug = linkUrl.pathname.split('/').filter(Boolean).at(-1)
    const frontendRoute = slug ? frontendRoutesByWordPressSlug[slug] : '/'
    if (frontendRoute) link.setAttribute('href', frontendRoute)
  })

  return document.body.innerHTML
}

export async function resolvePageTarget(target: WordPressPageTarget): Promise<string | null> {
  if (typeof target === 'number') {
    const page = await getPageById(target)
    return page ? (frontendRoutesByWordPressSlug[page.slug] ?? `/${page.slug}/`) : null
  }

  if (typeof target !== 'string' || target.trim() === '') return null

  try {
    const targetUrl = new URL(target, wordpressUrl)
    const wordpressOrigin = wordpressUrl ? new URL(wordpressUrl).origin : null
    if (wordpressOrigin && targetUrl.origin === wordpressOrigin) {
      const slug = targetUrl.pathname.split('/').filter(Boolean).at(-1)
      return slug ? (frontendRoutesByWordPressSlug[slug] ?? `/${slug}/`) : '/'
    }
    return targetUrl.toString()
  } catch {
    return target.startsWith('/') ? target : `/${target}`
  }
}
