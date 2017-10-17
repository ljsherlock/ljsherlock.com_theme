<?php

namespace MVC\Models;

use Includes\Classes\CMB2 as CMB2;

class Archive__Work extends Archive
{
    /**
    *   @property Array $args archive query
    */
    public $args = '';

    /**
    * @method __construct
    *
    * @param Array $args Model arguments
    */
    public function __construct($args)
    {
        parent::__construct($args);
    }

    /**
    * @method get returns data to the controller
    *
    * @param void
    *
    * @return $context array( $posts, $pagination )
    */
    public function get()
    {
        parent::get();

        $posts = $this->addToPosts($this->posts, 'terms', function( $post ) {
            return $this->get_hierachical_terms($post, 'stats');
        });
        $posts = $this->addToPosts($this->posts, 'primary_image', function( $post ) {
            return get_post_meta( $post->ID, CMB2::$prefix . 'browser_image', true );
        });

        $this->timber->addContext(array(
            'posts' => $posts,
        ));

        // put timber context in the $data variable
        $this->data = $this->timber->context;

        // force array for twig
        return $this->data;
    }
}
