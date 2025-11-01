<?php

include_once 'includes/Assets.php';

WpThemeBP\Assets::getInstance();

$theme = wp_get_theme();
$version = defined( 'DEVELOPMENT_MODE' ) && DEVELOPMENT_MODE ? time() : $theme->get( 'Version' );

define( 'THEME_PATH', get_template_directory() );
define( 'THEME_URI', get_template_directory_uri() );
define( 'THEME_VERSION', $version );