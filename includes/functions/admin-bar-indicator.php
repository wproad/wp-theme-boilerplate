<?php

/**
 * Local Admin Bar Indicator
 *
 * Highlights the WordPress admin bar in red when the site runs in a local development
 * environment (localhost, .local, .test, etc.). On production/live sites, the admin bar
 * remains unchanged.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Determine if the current environment is local.
 *
 * @return bool True if local, false otherwise.
 */
function is_local_environment() {
	if ( defined( 'WP_ENVIRONMENT_TYPE' ) && function_exists( 'wp_get_environment_type' ) ) {
		$env_type = wp_get_environment_type();
		if ( 'local' === $env_type ) {
			return true;
		}
	}

	if ( defined( 'WP_LOCAL_DEV' ) && WP_LOCAL_DEV ) {
		return true;
	}

	if ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
		$local_ips = array( '127.0.0.1', '::1' );
		if ( in_array( $_SERVER['REMOTE_ADDR'], $local_ips, true ) ) {
			return true;
		}
	}

	if ( ! empty( $_SERVER['HTTP_HOST'] ) ) {
		$host           = $_SERVER['HTTP_HOST'];
		$local_patterns = array(
			'localhost',
			'.local',
			'.test',
			'.localhost',
			':8888',
			':8080',
		);
		foreach ( $local_patterns as $pattern ) {
			if ( false !== strpos( $host, $pattern ) ) {
				return true;
			}
		}
	}

	$site_host = wp_parse_url( get_site_url(), PHP_URL_HOST );
	if ( $site_host ) {
		if ( in_array( $site_host, array( 'localhost', '127.0.0.1', '::1' ), true ) ) {
			return true;
		}
		if ( substr( $site_host, -6 ) === '.local' || substr( $site_host, -5 ) === '.test' ) {
			return true;
		}
	}

	return false;
}

/**
 * Output inline CSS to change admin bar background color on local environments.
 */
function local_admin_bar_css() {
	if ( ! is_user_logged_in() ) {
		return;
	}

	$default_color = '#d63638';
	$color         = apply_filters( 'local_admin_bar_indicator_color', $default_color );

	printf(
		'<style id="local-admin-bar-indicator">#wpadminbar { background-color: %s !important; }</style>',
		esc_attr( $color )
	);
}

if ( is_local_environment() ) {
	add_action( 'wp_head', 'local_admin_bar_css', 999 );
	add_action( 'admin_head', 'local_admin_bar_css', 999 );
}
