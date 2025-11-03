# WP Theme Boilerplate

A modern, minimal WordPress theme boilerplate with per-page bundles using Webpack and Tailwind CSS v4. Perfect for building custom WordPress themes with a component-based architecture and optimized asset loading.

## Features

- 🚀 **Per-page JavaScript bundles** - Separate bundles for `home` and `single` pages for optimal loading
- 🎨 **Per-page CSS bundles** - Page-specific stylesheets using Tailwind CSS v4
- 📦 **Webpack bundling** - Modern build tool with Babel transpilation and optimization
- ⚡ **Tailwind CSS v4** - Latest version with PostCSS integration and custom typography
- 🧩 **Component-based architecture** - Organized CSS/JS components and utilities
- 🔧 **Development tools** - Source maps, watch mode, and hot reloading support
- ✨ **Production optimizations** - Auto-minification, dead code elimination, and console removal
- 🎯 **Smart asset enqueuing** - Automatic page-specific asset loading via WordPress hooks

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (v6 or higher)
- **WordPress** (v5.0 or higher)

## Installation

1. Clone or download this repository into your WordPress `wp-content/themes/` directory:

```bash
cd wp-content/themes/
git clone https://github.com/wproad/wp-theme-boilerplate.git
cd wp-theme-boilerplate
```

2. Install dependencies:

```bash
npm install
```

3. Activate the theme in WordPress:
   - Go to **Appearance** → **Themes** in your WordPress admin
   - Click **Activate** on "WP Theme Boilerplate"

## Development

### Watch Mode (Recommended for Development)

Watch and automatically rebuild CSS and JavaScript on file changes:

```bash
# Watch JavaScript files
npm run build:js:watch

# In separate terminal, watch CSS files
npm run watch:css:home
npm run watch:css:single
```

### Build Commands

#### CSS Builds

```bash
# Build single page CSS
npm run build:css:single

# Build home page CSS
npm run build:css:home

# Build all CSS files
npm run build:css:all
```

#### JavaScript Builds

```bash
# Development build (with source maps)
npm run build:js:dev

# Production build (minified and optimized)
npm run build:js:prod

# Watch mode (auto-rebuild on changes)
npm run build:js:watch
```

## Project Structure

```
wp-theme-boilerplate/
├── assets/                    # Source files
│   ├── css/
│   │   ├── common.css        # Global/common styles
│   │   ├── components/       # Reusable CSS components
│   │   │   └── _breadcrumbs.css
│   │   └── pages/           # Page-specific styles
│   │       ├── home.css
│   │       └── single.css
│   └── js/
│       ├── components/      # Reusable JS components
│       │   ├── dropdown.js
│       │   ├── init-swipers.js
│       │   └── theme-switcher.js
│       ├── pages/           # Page-specific scripts
│       │   ├── home.js
│       │   └── single.js
│       └── utils/           # Utility functions
│           ├── alert.js
│           ├── helpers.js
│           ├── storage.js
│           ├── toast.js
│           └── toggler.js
├── dist/                     # Compiled/built assets (auto-generated)
│   ├── css/
│   │   ├── home.min.css
│   │   └── single.min.css
│   └── js/
│       ├── home.min.js
│       ├── home.min.js.map
│       ├── single.min.js
│       └── single.min.js.map
├── includes/
│   └── Assets.php           # Asset enqueuing class
├── templates/                # Custom template files
├── footer.php               # Theme footer
├── functions.php            # Theme functions and setup
├── header.php               # Theme header
├── home.php                 # Home page template
├── index.php                # Fallback template
├── single.php               # Single post template
├── style.css                # Theme stylesheet (WordPress header)
├── webpack.config.js        # Webpack configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Node.js dependencies and scripts
```

## Technologies Used

- **WordPress** - Content management system
- **Webpack 5** - Module bundler for JavaScript
- **Babel** - JavaScript transpiler (ES6+ support)
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processor with Autoprefixer
- **Swiper** - Touch slider library
- **Terser** - JavaScript minifier and optimizer

## Configuration

### Webpack Configuration

The `webpack.config.js` file configures:

- **Entry points**: `home.js` and `single.js` from `assets/js/pages/`
- **Output**: Minified bundles to `dist/js/[name].min.js`
- **Transpilation**: Babel with `@babel/preset-env` targeting modern browsers
- **Optimization**: Terser plugin with console removal, dead code elimination
- **Source maps**: Enabled in development mode only
- **Performance**: 512KB size warnings for bundles

### Tailwind Configuration

The `tailwind.config.js` file:

- **Content paths**: Scans `.php` files, `assets/**/*.js`, `assets/**/*.html`
- **Custom typography**: Extended typography plugin with custom prose styles
- **Plugins**: Typography, PostCSS, and Autoprefixer

### Asset Enqueuing

The `includes/Assets.php` class handles automatic asset loading:

- **Home/Front page**: Loads `home.min.css` and `home.min.js`
- **Single posts**: Loads `single.min.css` and `single.min.js`
- **Versioning**: Uses theme version or timestamp (development mode)
- **Conditional loading**: Only loads page-specific assets on relevant pages

## How It Works

### Build Process

1. **JavaScript Bundling**:
   - Webpack processes entry points (`home.js`, `single.js`)
   - Babel transpiles modern JavaScript for browser compatibility
   - Terser minifies and optimizes in production
   - Source maps generated in development mode
   - Outputs to `dist/js/[name].min.js`

2. **CSS Processing**:
   - Tailwind CLI processes CSS files from `assets/css/pages/`
   - PostCSS applies Tailwind directives and autoprefixes
   - Minification in production mode
   - Outputs to `dist/css/[name].min.css`

### Runtime Asset Loading

1. **Theme Initialization**:
   - `functions.php` loads the `Assets` class singleton
   - Theme constants defined (THEME_PATH, THEME_URI, THEME_VERSION)

2. **Asset Enqueuing**:
   - WordPress `wp_enqueue_scripts` hook triggers `Assets::load_assets()`
   - Conditional logic checks current page type:
     - `is_home() || is_front_page()` → loads home bundle
     - `is_single()` → loads single bundle
   - Assets loaded with proper versioning for cache busting

### Development vs Production

- **Development mode**:
  - Source maps enabled for debugging
  - Unminified output (easier debugging)
  - Version uses timestamp for cache busting

- **Production mode**:
  - No source maps
  - Fully minified and optimized
  - Console logs removed
  - Version uses theme version number

## Development Guidelines

- **PHP Templates**: Keep minimal; templates should render loops and call `wp_head()`/`wp_footer()`
- **Page-specific code**: Place CSS/JS in corresponding `assets/css/pages/` or `assets/js/pages/` files
- **Reusable components**: Add to `assets/css/components/` or `assets/js/components/`
- **Utilities**: Shared helper functions go in `assets/js/utils/`
- **Common styles**: Global styles go in `assets/css/common.css`

## License

This project is licensed under the GPL-2.0-or-later License - see the [LICENSE](LICENSE) file for details.

## Author

**WP Road**

- GitHub: [@wproad](https://github.com/wproad)
- Repository: [wp-theme-boilerplate](https://github.com/wproad/wp-theme-boilerplate)

## Version

Current version: **1.0.0**

---

For more information or support, please open an issue on the GitHub repository.
