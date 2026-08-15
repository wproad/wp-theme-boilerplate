# WP Theme Boilerplate

A modern, minimal WordPress theme boilerplate with per-page bundles using Webpack and Tailwind CSS v4. Global styles load on every page; page-specific CSS and JS load only where they are needed.

## Features

- **Global + per-page bundles** — `common` on every page, plus `home`, `single`, `page`, `archive`, and `search`
- **Dev / prod asset split** — unminified source maps in `dist/dev/`, minified output in `dist/prod/`
- **Environment-aware enqueue** — `wp_get_environment_type()` picks the matching `dist` folder
- **Webpack bundling** — Babel transpilation, Terser minification (production only)
- **Tailwind CSS v4** — CSS-first config via `@source` in `common.css`
- **Thin WordPress setup** — `title-tag`, thumbnails, HTML5, `primary` and `footer` menus
- **Hotfix files** — unbundled `hotfix.css` / `hotfix.js` loaded last for last-minute fixes
- **Production optimizations** — minification, dead code elimination, and console removal in production

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **WordPress** (v6.0 or higher)

## Installation

1. Clone or download this repository into your WordPress `wp-content/themes/` directory:

```bash
cd wp-content/themes/
git clone https://github.com/wproad/wp-theme-boilerplate.git
cd wp-theme-boilerplate
```

2. Install dependencies and build production assets:

```bash
npm install
npm run build
```

3. Activate the theme in WordPress:
   - Go to **Appearance** → **Themes**
   - Click **Activate** on "WP Theme Boilerplate"

During local development, set `WP_ENVIRONMENT_TYPE` to `local` (or `development`) so the theme loads `dist/dev/`. Optionally define `DEVELOPMENT_MODE` as `true` in `wp-config.php` to cache-bust with a timestamp.

## Development

```bash
npm run dev
```

This watches all CSS entries into `dist/dev/css/` and Webpack into `dist/dev/js/`.

### Individual commands

```bash
# CSS
npm run watch:css:common
npm run watch:css:home
npm run watch:css:all

# JavaScript
npm run build:js:watch
npm run build:js:dev
npm run build:js:prod

# Production
npm run build
```

## Project Structure

```
wp-theme-boilerplate/
├── assets/
│   ├── css/
│   │   ├── common.css            # Global styles, Tailwind v4 @theme + @source
│   │   ├── hotfix.css            # Unbundled last-loaded styles
│   │   ├── components/           # Reusable CSS components
│   │   └── pages/                # Page-specific CSS entries
│   └── js/
│       ├── common.js             # Global JS entry
│       ├── hotfix.js             # Unbundled last-loaded scripts
│       ├── components/
│       │   ├── ui/               # Dropdown, theme switcher
│       │   └── sliders/          # Swiper helpers
│       ├── pages/                # Page-specific JS entries
│       └── utils/                # Helpers, toast, storage, toggler
├── dist/                         # Generated (gitignored)
│   ├── dev/{css,js}/
│   └── prod/{css,js}/
├── includes/
│   ├── Assets.php                # Conditional enqueue
│   ├── Setup.php                 # Theme supports and menus
│   └── functions/
│       ├── svg-icon.php
│       └── admin-bar-indicator.php
├── template/                     # PHP partials (components, partials, sections)
├── languages/
├── 404.php
├── archive.php
├── footer.php
├── functions.php
├── header.php
├── home.php
├── index.php
├── page.php
├── search.php
├── single.php
├── style.css
├── webpack.config.js
├── postcss.config.js
└── package.json
```

## How It Works

### Build

- **JavaScript:** Webpack entries in `assets/js/` (plus `assets/js/pages/`) output to `dist/{dev|prod}/js/[name].min.js`. Production mode minifies and drops `console.log`. Development mode writes source maps.
- **CSS:** Tailwind CLI compiles `common.css` and each file in `assets/css/pages/` to `dist/{dev|prod}/css/`. Page CSS does **not** import `common.css`; the common bundle is a separate enqueue.

Webpack uses `argv.mode` (`webpack --mode production`), not `NODE_ENV`.

### Runtime enqueue

`includes/Assets.php` on `wp_enqueue_scripts`:

| Condition | Bundles |
|-----------|---------|
| Always | `common` + `hotfix` |
| Home / front page | `home` |
| Single posts | `single` |
| Pages | `page` |
| Archives / categories / tags | `archive` |
| Search | `search` |

Local and development environments load `dist/dev/`; staging and production load `dist/prod/`.

### Theme setup

`includes/Setup.php` registers `title-tag`, post thumbnails, HTML5 markup, responsive embeds, and two menu locations (`primary`, `footer`). Header calls `wp_body_open()` and outputs the primary menu; footer outputs the footer menu and a toast container (`#spd-toast-container`).

## Development Guidelines

- Keep PHP templates thin: loops, `wp_head()` / `wp_footer()`, and `get_template_part()`.
- Put page-specific CSS/JS in `assets/css/pages/` and `assets/js/pages/`.
- Put reusable UI in `assets/css/components/`, `assets/js/components/`, and `template/`.
- Put global styles and Tailwind tokens in `assets/css/common.css`.
- Use `hotfix.css` / `hotfix.js` only for short-lived overrides that should not wait for a rebuild.
- Text domain is `sepid`.

## Adding a page bundle

1. Add `assets/js/pages/{name}.js` and `assets/css/pages/{name}.css`.
2. Register the Webpack entry and npm CSS scripts.
3. Add a conditional in `Assets::load_page_based_assets()`.

## License

GPL-2.0-or-later — see the [LICENSE](LICENSE) file for details.

## Author

**WP Road**

- GitHub: [@wproad](https://github.com/wproad)
- Repository: [wp-theme-boilerplate](https://github.com/wproad/wp-theme-boilerplate)

## Version

Current version: **1.1.0**
