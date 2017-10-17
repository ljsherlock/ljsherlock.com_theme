<?php

namespace Includes;

class Core
{
    public static function init()
    {
        require_once 'constants.php';

        // Required by The SEO Framework 
        add_theme_support( 'title-tag' );

        // Widgets
        $sidebars = new \MVC\ContentTypes\Sidebar();
        $widgets = new \MVC\ContentTypes\Widgets();

        add_action('init', array( '\MVC\ContentTypes\Shortcodes', 'setup' ));

        // POSTS
        $content_block = new \MVC\ContentTypes\Content_Block();
        $content_block->register();

        /**
        * Setup ACF
        * Add options pages
        */
        Classes\Scripts::setup();

        /**
        * Setup CMB2
        * Add options pages
        */
        Classes\CMB2::init();

        /**
        * WP Images
        * Add images sizes
        * Add theme support
        */
        Classes\Images::setup();

        /**
        * WP Navigation
        * Register Navigation Menus
        * Add current nav class action
        */
        Classes\Nav::setup();

    }
}
