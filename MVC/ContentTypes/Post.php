<?php

namespace MVC\ContentTypes;

abstract class Post
{
    /**
    * @var String $name Post type name
    */
    protected $name = '';

    /**
    * @var String $singular Nice Singular name
    */
    protected $singular = '';

    /**
    * @var String $plural Nice plural name
    */
    protected $plural = '';

    /**
    * @var String $taxonomy Taxonomy type name
    */
    protected $taxonomy = '';

    /**
    * @var String $taxonomy_name Taxonomy type name
    */
    protected $taxonomy_name = '';

    /**
    *   @var Array $args Query arguments
    */
    public $args = '';

    /**
    *   @var Array $args Query arguments
    */
    public $labels = '';

    /**
    *   @method __construct Build the args and labels for registering the post type
    */
    public function __construct()
    {
        $this->labels = array(
            'name'               => _x($this->plural, 'post type general name', LJS_TEXT_DOMAIN),
            'singular_name'      => _x($this->singular, 'post type singular name', LJS_TEXT_DOMAIN),
            'menu_name'          => _x($this->plural, 'admin menu', LJS_TEXT_DOMAIN),
            'name_admin_bar'     => _x($this->singular, 'add new on admin bar', LJS_TEXT_DOMAIN),
            'add_new'            => _x('Add New', 'post', LJS_TEXT_DOMAIN),
            'add_new_item'       => __("Add New {$this->singular}", LJS_TEXT_DOMAIN),
            'new_item'           => __("New {$this->singular}", LJS_TEXT_DOMAIN),
            'edit_item'          => __("Edit {$this->singular}", LJS_TEXT_DOMAIN),
            'view_item'          => __("View {$this->singular}", LJS_TEXT_DOMAIN),
            'all_items'          => __("All {$this->plural}", LJS_TEXT_DOMAIN),
            'search_items'       => __("Search {$this->plural}", LJS_TEXT_DOMAIN),
            'parent_item_colon'  => __("Parent {$this->plural}:", LJS_TEXT_DOMAIN),
            'not_found'          => __("No {$this->plural} found.", LJS_TEXT_DOMAIN),
            'not_found_in_trash' => __("No {$this->plural} found in Trash.", LJS_TEXT_DOMAIN)
        );

        $this->args = array(
            'labels'             => $this->labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => $this->name ),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'thumbnail' ),
            'menu_icon'          => 'dashicons-align-left'
        );

        $this->taxonomy_args = array(
            'labels' => array(
                'name'          => 'Types',
                'singular_name' => 'Type',
                'search_items'  => 'Search Types',
                'edit_item'     => 'Edit Type',
                'add_new_item'  => 'Add New Type',
            ),
            'hierarchical' => true,
            'query_var'    => true,
            'label' => __($this->taxonomy_name . ' Category', LJS_TEXT_DOMAIN),
            'show_admin_column' => true
        );
    }

    public function register()
    {
        if(!empty($this->taxonomy)){
            $this->register_taxonomy();
        }
        $this->register_post_type();
    }

    /**
    *   @method register_posttype
    */
    public function register_post_type()
    {
        register_post_type( $this->name , $this->args );
    }

    /**
     *  Register Case Study category Taxonomy
     */
    public function register_taxonomy()
    {
        register_taxonomy(
            $this->taxonomy,
            $this->name,
            $this->taxonomy_args
        );
    }
}
