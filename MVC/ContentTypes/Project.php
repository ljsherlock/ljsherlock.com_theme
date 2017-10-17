<?php

namespace MVC\ContentTypes;

class Project extends Post
{
    protected $name = "work";

    protected $singular = "Work";

    protected $plural = "Work";

    protected $taxonomy = "stats";

    protected $taxonomy_name = "Stats";

    public function __construct()
    {
        parent::__construct();

        $this->taxonomy_args = array_merge($this->taxonomy_args, array('rewrite' => array( 'slug' => $this->name . '/' . $this->taxonomy, 'with_front' => false )) );
        // die(var_dump($this->taxonomy_args));

    }

}
