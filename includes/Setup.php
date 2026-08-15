<?php

namespace Sepid;

defined( 'ABSPATH' ) || exit;

class Setup {
	private static $instance;

	public static function getInstance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'add_theme_supports' ) );
	}

	public function add_theme_supports() {
		load_theme_textdomain( 'sepid', get_template_directory() . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'automatic-feed-links' );

		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'sepid' ),
				'footer'  => esc_html__( 'Footer Menu', 'sepid' ),
			)
		);
	}
}
