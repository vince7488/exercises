const wordpressUrl = import.meta.env.VITE_WORDPRESS_URL?.replace(/\/$/, '')

export type WordPressPage = { id: number; slug: string; title: { rendered: string }; content: { rendered: string }; excerpt: { rendered: string } }

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  if (!wordpressUrl) return null
  const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,content,excerpt`, { signal: AbortSignal.timeout(8_000) })
  if (!response.ok) throw new Error('Unable to load page content.')
  const pages = await response.json() as WordPressPage[]
  return pages[0] ?? null
}
