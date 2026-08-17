# Kitchens by Herzenberg frontend

A standalone React frontend for the headless WordPress installation in `../wp-kitchensbyherzenberg`.

This is a part of a demonstration for Envision Marketing.

## Start locally

1. Copy `.env.example` to `.env.local` and set `VITE_WORDPRESS_URL` to the public base URL of WordPress.
2. Run `npm install`.
3. Run `npm run dev`.

## WordPress page contract

The navigation intentionally maps each route to a WordPress **Page** with the same slug:

| Frontend route  | WordPress page slug |
| --------------- | ------------------- |
| `/our-work`     | `our-work`          |
| `/our-approach` | `our-approach`      |
| `/about-us`     | `about-us`          |
| `/contact`      | `contact`           |

Page titles and content are fetched from the public WordPress REST API. Create and publish the Contact page in WordPress with the
`contact` slug; no frontend deployment is needed for its content to appear.

## Structure

- `src/app` — router and site-wide layout
- `src/components` — reusable interface components
- `src/config` — navigation and other static configuration
- `src/lib` — API clients and shared utilities
- `src/pages` — route-level UI
- `src/styles` — global styling and design tokens
