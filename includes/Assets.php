<?php

namespace Sepid;

defined( 'ABSPATH' ) || exit;

class Assets {
	private static $instance;

	public static function getInstance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_page_based_assets' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'load_hotfix_assets' ), 20 );
	}

	/**
	 * Use unminified local builds in development, production builds elsewhere.
	 */
	private function get_asset_dir() {
		$env_type = wp_get_environment_type();

		if ( in_array( $env_type, array( 'local', 'development' ), true ) ) {
			return 'dev';
		}

		return 'prod';
	}

	public function load_page_based_assets() {
		$asset_dir = $this->get_asset_dir();

		wp_enqueue_style( 'theme-common', THEME_URI . "/dist/{$asset_dir}/css/common.min.css", array(), THEME_VERSION );
		wp_enqueue_script( 'theme-common', THEME_URI . "/dist/{$asset_dir}/js/common.min.js", array(), THEME_VERSION, true );

		if ( is_home() || is_front_page() ) {
			wp_enqueue_style( 'home', THEME_URI . "/dist/{$asset_dir}/css/home.min.css", array( 'theme-common' ), THEME_VERSION );
			wp_enqueue_script( 'home', THEME_URI . "/dist/{$asset_dir}/js/home.min.js", array(), THEME_VERSION, true );
		}

		if ( is_single() ) {
			wp_enqueue_style( 'single', THEME_URI . "/dist/{$asset_dir}/css/single.min.css", array( 'theme-common' ), THEME_VERSION );
			wp_enqueue_script( 'single', THEME_URI . "/dist/{$asset_dir}/js/single.min.js", array(), THEME_VERSION, true );
		}

		if ( is_page() && ! is_front_page() && ! is_home() ) {
			wp_enqueue_style( 'page-default', THEME_URI . "/dist/{$asset_dir}/css/page.min.css", array( 'theme-common' ), THEME_VERSION );
			wp_enqueue_script( 'page-default', THEME_URI . "/dist/{$asset_dir}/js/page.min.js", array(), THEME_VERSION, true );
		}

		if ( is_archive() || is_category() || is_tag() ) {
			wp_enqueue_style( 'archive', THEME_URI . "/dist/{$asset_dir}/css/archive.min.css", array( 'theme-common' ), THEME_VERSION );
			wp_enqueue_script( 'archive', THEME_URI . "/dist/{$asset_dir}/js/archive.min.js", array(), THEME_VERSION, true );
		}

		if ( is_search() ) {
			wp_enqueue_style( 'search', THEME_URI . "/dist/{$asset_dir}/css/search.min.css", array( 'theme-common' ), THEME_VERSION );
			wp_enqueue_script( 'search', THEME_URI . "/dist/{$asset_dir}/js/search.min.js", array(), THEME_VERSION, true );
		}
	}

	public function load_hotfix_assets() {
		$hotfix_css_path = THEME_PATH . '/assets/css/hotfix.css';
		$hotfix_js_path  = THEME_PATH . '/assets/js/hotfix.js';

		if ( file_exists( $hotfix_css_path ) ) {
			wp_enqueue_style(
				'theme-hotfix',
				THEME_URI . '/assets/css/hotfix.css',
				array(),
				filemtime( $hotfix_css_path )
			);
		}

		if ( file_exists( $hotfix_js_path ) ) {
			wp_enqueue_script(
				'theme-hotfix',
				THEME_URI . '/assets/js/hotfix.js',
				array(),
				filemtime( $hotfix_js_path ),
				true
			);
		}
	}
}
