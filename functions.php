<?php

defined( 'ABSPATH' ) || exit;

$theme   = wp_get_theme();
$version = defined( 'DEVELOPMENT_MODE' ) && DEVELOPMENT_MODE ? time() : $theme->get( 'Version' );

define( 'THEME_PATH', get_template_directory() );
define( 'THEME_URI', get_template_directory_uri() );
define( 'THEME_VERSION', $version );

require_once THEME_PATH . '/includes/Assets.php';
\Sepid\Assets::getInstance();

require_once THEME_PATH . '/includes/Setup.php';
\Sepid\Setup::getInstance();

require_once THEME_PATH . '/includes/functions/svg-icon.php';
require_once THEME_PATH . '/includes/functions/admin-bar-indicator.php';
