# Minimal WP Webpack Tailwind Theme

A minimal WordPress theme boilerplate with per-page bundles using Webpack and Tailwind CSS.

## Directory structure

```
wp-theme-boilerplate/
├─ assets/
│  ├─ css/
│  │  ├─ global.css
│  │  ├─ home.css
│  │  └─ single.css
│  └─ js/
│     ├─ global.js
│     ├─ home.js
│     └─ single.js
├─ dist/
│  ├─ css/ (built)
│  └─ js/  (built)
├─ header.php
├─ footer.php
├─ index.php
├─ home.php
├─ single.php
├─ functions.php
├─ style.css
├─ webpack.config.js
├─ postcss.config.js
├─ tailwind.config.js
└─ package.json
```

## Install

From the theme directory:

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

## How it works
- Webpack entries: `global`, `home`, `single`
- Outputs to `dist/js/[name].js` and `dist/css/[name].css`
- Tailwind scans `*.php`, `assets/js/**/*.js`, `assets/css/**/*.css`
- `functions.php` enqueues bundles:
  - `global` on all pages
  - `home` on home/front page
  - `single` on single post

## Notes
- Keep PHP minimal; templates render the loop and call `wp_head()`/`wp_footer()`.
- Put page-specific code in corresponding `assets/css|js` files.
