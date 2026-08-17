import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './site-layout'
import { HomePage } from '../pages/home/home-page'
import { WordPressPage } from '../pages/wordpress-page/wordpress-page'
import { NotFoundPage } from '../pages/not-found/not-found-page'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':slug', element: <WordPressPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
