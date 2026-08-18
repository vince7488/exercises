# Kitchens by Herzenberg frontend

A standalone React frontend for the Kitchens by Herzenberg headless WordPress installation.

This is a part of a demonstration for Envision Marketing.

## Start locally

1. Copy `.env.example` to `.env.local` and set `VITE_WORDPRESS_URL` to the public base URL of WordPress.
2. Run `yarn install --immutable`.
3. Run `yarn dev`.

## Build for the GoDaddy subdirectory

The GoDaddy build mode deploys the React app beneath `/kbh-demo/` and expects WordPress at `/kbh-demo/wp/` on the same origin.

1. Copy `.env.godaddy.example` to `.env.godaddy` and verify the public WordPress URL.
2. Run `yarn install --immutable`.
3. Run `yarn build:godaddy`.
4. Optionally run `yarn preview:godaddy` and open the `/kbh-demo/` path printed by Vite.
5. Upload the **contents** of `dist/` to the GoDaddy document-root directory for `https://test.vernard.net/kbh-demo/`.

The generated `dist/.htaccess` sends unknown frontend paths to React while leaving real files and directories—including the nested `wp/`
installation—untouched. Confirm that the hidden `.htaccess` file is included by the upload tool.

The intended remote layout is:

```text
public_html/
└── kbh-demo/
    ├── .htaccess
    ├── index.html
    ├── assets/
    └── wp/
        ├── wp-admin/
        ├── wp-content/
        └── wp-includes/
```

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
