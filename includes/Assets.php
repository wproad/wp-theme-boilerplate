<?php
namespace WpThemeBP;

defined( 'ABSPATH' ) || exit;
class Assets {
    private static $instance;

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct() {
        add_action( 'wp_enqueue_scripts', [$this, 'load_assets'], 100 );
    }

    public function load_assets() {

        if (is_home() || is_front_page()) {
            wp_enqueue_style('home', THEME_URI . '/dist/css/home.min.css' , [], THEME_VERSION);
            wp_enqueue_script('home', THEME_URI . '/dist/js/home.min.js' , [], THEME_VERSION, true);
        }

        if (is_single()) {
            wp_enqueue_style('single', THEME_URI . '/dist/css/single.min.css' , [], THEME_VERSION);
            wp_enqueue_script('single', THEME_URI . '/dist/js/single.min.js' , [], THEME_VERSION, true);
        }

    }

}