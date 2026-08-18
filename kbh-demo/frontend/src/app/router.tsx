import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './site-layout'
import { HomePage } from '../pages/home/home-page'
import { NotFoundPage } from '../pages/not-found/not-found-page'
import { WordPressPage } from '../pages/wordpress-page/wordpress-page'

// Public routes map explicitly to their published WordPress Page slugs.
export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'contact-us', element: <WordPressPage slug="contact" /> },
      { path: 'privacy-policy', element: <WordPressPage slug="privacy-policy" /> },
      { path: 'accessibility-statement', element: <WordPressPage slug="accessibility-statement" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
