import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './site-layout'
import { HomePage } from '../pages/home/home-page'
import { NotFoundPage } from '../pages/not-found/not-found-page'

// Phase one exposes only the static React homepage; scoped support routes will be added in later phases.
export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
