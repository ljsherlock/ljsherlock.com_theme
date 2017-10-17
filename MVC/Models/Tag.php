<?php

namespace MVC\Models;

class Tag extends Archive
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
        $this->args = $this->tags($this->args);

        return parent::get();
    }

    /**
    * @method Query posts grab pagination data
    *
    * @param Array $args
    *
    * @return void
    */
    private function tags($args)
    {
        $tagString = '';

        foreach (get_the_tags() as $key => $tag)
        {
            $tagString .= $tag->slug . ',';
        }

        return array('query' => array('tag' => $tagString) );
    }
}
