# Kitchens by Herzenberg frontend

A standalone React frontend for the Kitchens by Herzenberg headless WordPress installation.

This is a part of a demonstration for Envision Marketing.

## Start locally

1. Copy `.env.example` to `.env.local` and set `VITE_WORDPRESS_URL` to the public base URL of WordPress.
2. Run `npm install`.
3. Run `npm run dev`.

## WordPress page contract

The navigation intentionally maps each route to a WordPress **Page** with the same slug:

| Frontend route              | WordPress page slug       |
| --------------------------- | ------------------------- |
| `/`                         | `home-page`               |
| `/contact-us/`              | `contact`                 |
| `/privacy-policy/`          | `privacy-policy`          |
| `/accessibility-statement/` | `accessibility-statement` |

Page titles and content are fetched from the public WordPress REST API. The homepage hero additionally maps the `hero_banner` ACF group, resolves its gallery image IDs through the Media endpoint, and resolves its CTA page ID to the matching frontend route.

## Structure

- `src/app` — router and site-wide layout
- `src/components` — reusable interface components
- `src/config` — navigation and other static configuration
- `src/lib` — API clients and shared utilities
- `src/pages` — route-level UI
- `src/styles` — global styling and design tokens
