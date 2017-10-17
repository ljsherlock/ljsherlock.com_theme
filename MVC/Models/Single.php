<?php

namespace MVC\Models;

use Includes\Classes\CMB2 as CMB2;

class Single extends Base
{

    public $sidebars = array();

    /**
    *   @method __construct
    *   @return get
    **/
    public function __construct($args)
    {
        parent::__construct($args);

        // set Sidebars and merge
        $this->sidebars = array(
            'sidebar',
            'sidebar__header',
            'sidebar__footer',
            'sidebar__homepage_main',
            'sidebar__after_app',
        );
        if( isset( $this->args['sidebars'] ) )
        {
            array_merge( $this->sidebars, $this->args['sidebars'] ) ;
        }

        $this->post = new \TimberPost();
    }

    /**
    *   @method get
    *   @return parent::get()
    *
    *
    **/
    public function get()
    {
        // if sidebars exist, call addSidebar().
        if( isset($this->sidebars) )
        {
            $this->addSidebar( $this->sidebars );
        }

        // query Work posts for Footer
        $archive = new \MVC\Models\Archive(array());
        $args = array( 'query' => array( 'posts_per_page' => 3 ) );
        $posts = $archive->query($args);

        //required to get ajax request input.
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body);

        $this->timber->addContext( array(
            // content
            'meta' => array (
                'themeColour' => CMB2::myprefix_get_option( CMB2::$prefix . 'theme_colour'),
            ),
            'request_body' => $data,
            'subtitle' => get_post_meta( $this->post->ID, CMB2::$prefix . 'subtitle', true ),
            'post' => $this->post,
            'terms' => $this->terms($this->post),
            'social_media' => CMB2::myprefix_get_option( CMB2::$prefix . 'social_media_links'),
            'header' => array(
                'menu' => new \TimberMenu('Primary'),
            ),
            'footer' => array(
                'email' => CMB2::myprefix_get_option( CMB2::$prefix . 'contact_email'),
                'telephone' => CMB2::myprefix_get_option(CMB2::$prefix . 'contact_telephone'),
                'posts' => $posts,
                'menu' => new \TimberMenu('Footer'),
                'copyright' => 'Copyright ' . date('Y') . ' Sherlock Ltd',
            ),
        ));

        return parent::get();
    }

    public function addSidebar($sidebars)
    {
        foreach ($sidebars as $key => $sidebar)
        {
            $this->timber->addContext( array( $sidebar => \Timber::get_widgets( $sidebar ) ) );
        }
    }

    public function terms($post, $args = array(), $output = 'names')
    {
        $terms = wp_get_object_terms( $post->ID, get_taxonomies($args, $output));

        $timberTerms = array();

        foreach ($terms as $key => $term)
        {
            $timberTerms[$key] = new \TimberTerm( $term->term_id );
        }

        return $timberTerms;
    }

    public function get_hierachical_terms($post, $tax)
    {
        $terms = wp_get_post_terms( $post->ID, $tax, array( 'parent' => 0, 'hide_empty' => true) );
        $sorted_terms = [];

        $sorted_terms = $this->get_hierachical_terms_loop($post, $tax, $terms, $sorted_terms);

        unset( $sorted_terms['children'] );

        return $sorted_terms['sorted_terms'];
    }

    public function get_hierachical_terms_loop($post, $tax, $terms, $sorted_terms = array())
    {
        foreach ($terms as $key => &$term)
        {
            // get children at current level.
            // $children = wp_get_post_terms($tax, array( 'parent' => $term->term_id, 'hide_empty' => true) );
            $children = wp_get_post_terms( $post->ID, $tax, array( 'parent' => $term->term_id, 'hide_empty' => true) );
            $term->term_permalink = get_term_link( $term->term_id, $tax );

            if( count($children) > 0 )
            {
                // loop through indefinite children (scary).
                $loop = $this->get_hierachical_terms_loop($post, $tax, $children, $sorted_terms);

                // add returned children to current term.
                $term->children = $loop['children'];
            }
            // Add the current term to final array.
            $sorted_terms[$term->slug] = $term;
        }

        return array('children' => $terms, 'sorted_terms' => $sorted_terms);
    }
}
