
# Kitchens & Baths by Herzenberg — Headless WordPress Demo

## About this project

This project is an independent candidate-assessment demonstration created for [Envision Marketing Group](https://envision-marketing.com/).

It rebuilds selected experiences from the website Envision Marketing created for [Kitchens & Baths by Herzenberg](https://kitchensbyherzenberg.com/). The demonstration applies recommendations identified through a rapid UX and accessibility evaluation of the original website.

This is not a complete copy of the production website. The project focuses on the primary conversion journey:

1. Understand the company’s remodeling and design services.
2. Confirm its geographic service area.
3. Request a design consultation.

The implemented route scope is limited to:

- Homepage
- Contact and consultation page
- Privacy Policy
- Accessibility Statement

Links to other areas of the original website open an accessible demo-scope dialog explaining that the destination is outside the assessment’s scope.

> This is an independent technical demonstration. It is not the official Kitchens & Baths by Herzenberg website, a production replacement, or a claim of legal or accessibility certification.

## Project goals

The project demonstrates the ability to:

- Translate a UX evaluation into concrete design and development improvements.
- Build a WordPress-editable React frontend using a headless architecture.
- Model structured page content with Advanced Custom Fields Pro.
- Integrate WordPress content through its REST API.
- Build accessible, responsive React components without a UI framework.
- Maintain a clear contract between WordPress, TypeScript, React, and SCSS.
- Improve the primary consultation conversion journey without recreating the entire source website.

---

## Local development requirements

Install the following before running the project:

- Node.js
- Corepack
- Yarn 4
- PHP
- MySQL or MariaDB
- Apache
- WordPress
- A licensed copy of ACF Pro

WordPress core, local configuration, uploads, generated files, and third-party plugins may be excluded from Git. Do not commit:

- `wp-config.php`;
- database credentials;
- ACF Pro license information;
- uploads;
- local environment files; or
- generated dependency directories.

## Frontend setup

Open a terminal in the frontend directory:

```bash
cd kbh-demo/frontend
```

Enable the project-pinned Yarn release:

```bash
corepack enable
```

Install the exact dependencies recorded in `yarn.lock`:

```bash
yarn install --immutable
```

Create the local environment file.

On macOS or Linux:

```bash
cp .env.example .env.local
```

In Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Set the full public URL of the local WordPress installation:

```dotenv
VITE_WORDPRESS_URL=http://localhost/kbh-demo/wp
```

The URL must include `http://` or `https://` and must not contain a trailing slash.

Start the Vite development server:

```bash
yarn dev
```

Vite will normally make the frontend available at:

```text
http://localhost:5173
```

Create a production build with:

```bash
yarn build
```

Preview the production build with:

```bash
yarn preview
```

## WordPress setup

Regardless of the local server, the WordPress installation must:

1. Use `kbh-demo/wp` as its WordPress document directory.
2. Have a local MySQL or MariaDB database.
3. Have a local, uncommitted `wp-config.php`.
4. Have pretty permalinks enabled.
5. Have ACF Pro installed and activated.
6. Have the required ACF field groups imported or synchronized.
7. Have **Show in REST API** enabled on frontend-facing field groups.
8. Have the required pages created and published.
9. Permit public read access to the required WordPress REST resources.

After installation, visit:

```text
Settings → Permalinks
```

Select an appropriate permalink structure, such as **Post name**, and save the settings so WordPress refreshes its rewrite rules.

Test the REST API directly:

```text
http://localhost/kbh-demo/wp/wp-json/
```

A published page can be requested by slug:

```text
http://localhost/kbh-demo/wp/wp-json/wp/v2/pages?slug=home-page
```

The precise homepage slug must match the frontend’s documented data contract.

## Running WordPress with MAMP

MAMP is primarily used on macOS, although a Windows edition is also available.

### 1. Place or expose the project

Place the repository under MAMP’s document root:

```text
/Applications/MAMP/htdocs/kbh-demo
```

Alternatively, configure a MAMP virtual host whose document root points to:

```text
/path/to/kbh-demo/wp
```

### 2. Create the database

Start the Apache and MySQL services in MAMP.

Open phpMyAdmin from the MAMP start page and create a database such as:

```text
kbh_demo
```

MAMP commonly uses:

```text
Database host: localhost
MySQL port: 8889
Username: root
Password: root
```

Confirm these values in your MAMP preferences because local installations can differ.

### 3. Configure WordPress

Create `wp/wp-config.php` from `wp-config-sample.php` and enter the local database values.

A common MAMP database host value is:

```php
define('DB_HOST', 'localhost:8889');
```

Do not commit this file.

### 4. Open WordPress

With MAMP’s common Apache port, WordPress may be available at:

```text
http://localhost:8888/kbh-demo/wp
```

Set the frontend environment value accordingly:

```dotenv
VITE_WORDPRESS_URL=http://localhost:8888/kbh-demo/wp
```

Complete the WordPress installer, activate ACF Pro, synchronize the field groups, create the required pages, and save the permalink settings.

## Running WordPress with WAMP

### 1. Place or expose the project

Place the repository under the WAMP document directory:

```text
C:\wamp64\www\kbh-demo
```

Alternatively, create a WAMP virtual host pointing directly to:

```text
C:\path\to\kbh-demo\wp
```

### 2. Start the services

Start WAMP and wait for Apache and MySQL/MariaDB to report a healthy state.

Ensure Apache’s rewrite module is enabled.

### 3. Create the database

Open phpMyAdmin:

```text
http://localhost/phpmyadmin
```

Create a database such as:

```text
kbh_demo
```

Typical local WAMP credentials are:

```text
Database host: localhost
Username: root
Password: empty
```

Use the credentials configured by your own WAMP installation.

### 4. Configure WordPress

Create:

```text
C:\wamp64\www\kbh-demo\wp\wp-config.php
```

Use `wp-config-sample.php` as the starting point and provide the local database settings.

Do not commit `wp-config.php`.

### 5. Open WordPress

WordPress should normally be available at:

```text
http://localhost/kbh-demo/wp
```

Set:

```dotenv
VITE_WORDPRESS_URL=http://localhost/kbh-demo/wp
```

Complete the WordPress installation, activate ACF Pro, synchronize the field groups, create the required pages, and save the permalink settings.

## Basic Linux setup

The following example uses Ubuntu or Debian with Apache and MariaDB.

### 1. Install the server packages

```bash
sudo apt update
sudo apt install apache2 mariadb-server php libapache2-mod-php php-mysql php-curl php-gd php-mbstring php-xml php-zip unzip
```

Enable Apache rewriting:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 2. Place the project

Clone the repository into Apache’s document directory:

```bash
sudo git clone <repository-url> /var/www/html/kbh-demo
```

Set appropriate local ownership:

```bash
sudo chown -R "$USER":www-data /var/www/html/kbh-demo
```

WordPress must be installed within:

```text
/var/www/html/kbh-demo/wp
```

If WordPress core is excluded from the repository, install it into that directory without replacing repository-controlled custom content.

### 3. Create the database

Open MariaDB:

```bash
sudo mariadb
```

Create a local database and user:

```sql
CREATE DATABASE kbh_demo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'kbh_demo'@'localhost'
  IDENTIFIED BY 'replace-with-a-local-password';

GRANT ALL PRIVILEGES
  ON kbh_demo.*
  TO 'kbh_demo'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

Use a local development password and never commit it.

### 4. Configure WordPress

Create `wp/wp-config.php` using `wp-config-sample.php` and supply:

```text
Database: kbh_demo
Username: kbh_demo
Password: your local password
Host: localhost
```

Do not commit the resulting configuration.

### 5. Allow WordPress rewrite rules

For an ultra-basic Apache installation, update the applicable Apache directory configuration so overrides are permitted:

```apache
<Directory /var/www/html/kbh-demo/wp>
    AllowOverride All
    Require all granted
</Directory>
```

Restart Apache:

```bash
sudo systemctl restart apache2
```

### 6. Open WordPress

WordPress should be available at:

```text
http://localhost/kbh-demo/wp
```

Set the frontend environment variable:

```dotenv
VITE_WORDPRESS_URL=http://localhost/kbh-demo/wp
```

Complete the WordPress installation, activate ACF Pro, synchronize the field groups, publish the required pages, and save the permalink settings.

## Required WordPress content

The expected public pages are:

| Frontend route | WordPress responsibility |
| --- | --- |
| `/` | Homepage and ACF homepage content |
| `/contact-us/` | Contact information and consultation form |
| `/privacy-policy/` | Accurate organization-specific privacy information |
| `/accessibility-statement/` | Accurate accessibility-support information |

Additional production-site destinations are intentionally outside the demonstration scope.

## Security and configuration notes

- Never commit `wp-config.php`.
- Never commit `.env.local`.
- Never commit database exports containing sensitive or personal data.
- Never commit ACF Pro license keys.
- Keep WordPress, PHP, plugins, and ACF Pro updated locally.
- Expose only public editorial fields through unauthenticated REST endpoints.
- Do not expose form credentials, email-delivery settings, private notes, or administrative fields.
- Validate WordPress responses before displaying their content.
- Sanitize any trusted HTML received from WordPress before rendering it in React.

## Status

Completed: 2026-08-18; no further changes unless requested.

---

## (TL:DR;) Technology stack

### Backend

- WordPress
- Advanced Custom Fields Pro
- WordPress REST API
- MySQL or MariaDB
- Apache with URL rewriting enabled

### Frontend

- React
- TypeScript
- Vite
- React Router
- SCSS
- `lucide-react`
- Yarn 4

### Design system

- Playfair Display SC for semantic headings
- Poppins for body copy, navigation, buttons, forms, and non-heading display text
- Centralized SCSS variables for:
  - colours;
  - typography;
  - spacing;
  - layout;
  - breakpoints;
  - border radii;
  - elevations;
  - focus treatments;
  - transitions; and
  - layering.

No UI framework, component framework, CSS framework, or CSS-in-JS system is used.

## Architecture

The project contains two independently deployable applications:

```text
kbh-demo/
├── frontend/   # React, TypeScript, Vite, and SCSS application
└── wp/         # WordPress installation and custom WordPress resources
```

### WordPress responsibilities

WordPress owns the editable content.

The homepage uses a standard WordPress Page with an ACF Pro field group representing the established homepage sections. ACF fields provide structured copy, links, repeated content, and Media Library image references.

Field groups consumed by React must have **Show in REST API** enabled.

The field model uses:

- Group fields for fixed homepage sections;
- Repeater fields for genuinely repeated content;
- semantic field names independent of the visual layout; and
- a consistent image-return contract.

ACF does not control CSS classes, spacing, responsive behavior, heading sizes, colours, or component layout.

### React responsibilities

React owns:

- semantic markup;
- fixed page composition;
- responsive layout;
- interaction behavior;
- accessibility;
- loading and unavailable states;
- client-side routing; and
- presentation of normalized WordPress content.

Raw ACF responses are normalized into explicit TypeScript models before reaching React components. Components do not depend directly on the unvalidated WordPress response structure.

This provides WordPress editability without turning the frontend into an unrestricted page builder.

### Responsive component system

The interface uses reusable semantic React components and responsive SCSS. Layouts are designed to remain usable from small mobile screens through large desktop displays.

## Accessibility and WCAG remediation

The project targets relevant WCAG Level AA requirements. This is an implementation target, not an unverified claim of complete legal or WCAG conformance.

### Colour contrast

The original evaluation identified insufficient contrast where light theme colours were combined with white text.

The revised palette introduces darker accessible foreground and control colours:

- `#244E66`
- `#80654D`

The original lighter colours remain available primarily as surfaces:

- `#A2B9C7`
- `#D8C5B4`
- `#F0F1F2`

Actual foreground and background combinations must be tested in default, hover, focus, active, disabled, error, and text-over-image states. White text is not placed over the light blue or warm surface colours where it fails the applicable contrast requirement.

### Keyboard access and visible focus

Interactive elements are designed to be fully keyboard operable.

The project provides:

- visible `:focus-visible` treatments;
- keyboard-operable navigation;
- keyboard-operable dialogs;
- predictable focus order;
- Escape behavior where appropriate; and
- focus restoration after modal interactions.

### Semantic page structure

Each page uses:

- one meaningful page-level `h1`;
- a logical heading hierarchy;
- semantic landmarks;
- real links for navigation;
- real buttons for in-page actions; and
- one semantic heading for visually split titles such as “View Our Project Gallery.”

### Responsive and zoom support

The interface is designed for:

- approximately 320 CSS-pixel layouts;
- 400% browser zoom;
- responsive navigation;
- content reflow without horizontal scrolling;
- touch-friendly controls; and
- reduced-motion preferences.

## End 
(*warned you, TL:DR; right?*)
