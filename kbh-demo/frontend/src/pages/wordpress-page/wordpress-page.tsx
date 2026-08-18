import { useEffect, useMemo, useState } from 'react'
import { getPageBySlug, mapWordPressContentUrls, type WordPressPage as Page } from '../../lib/wordpress'
import { NotFoundPage } from '../not-found/not-found-page'

type WordPressPageProps = {
  slug: string
}

export function WordPressPage({ slug }: WordPressPageProps) {
  const [page, setPage] = useState<Page | null | undefined>(undefined)
  const [error, setError] = useState(false)
  const mappedContent = useMemo(() => page ? mapWordPressContentUrls(page.content.rendered) : '', [page])

  useEffect(() => { setPage(undefined); setError(false); getPageBySlug(slug).then(setPage).catch(() => setError(true)) }, [slug])
  if (error) return <section className="section container"><h1>We could not load this page.</h1><p>Please try again shortly.</p></section>
  if (page === undefined) return <section className="section container"><p className="eyebrow">Loading</p></section>
  if (!page) return <NotFoundPage />
  return <article className="section container content-page">
    <p className="eyebrow">Kitchens by Herzenberg</p>
    <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
    <div className="wordpress-content" dangerouslySetInnerHTML={{ __html: mappedContent }} />
  </article>
}
