<?php

namespace Redwire;

class ArchivesFilter
{

    public $tags = [];

    public $cats = [];

    public $years = array();

    public function __construct()
    {
        // Categories
        $this->tags = get_taxonomy('post_tag');
        $this->tags->terms = get_tags();

        // Tags
        $this->cats = get_taxonomy('category');
        $this->cats->terms = get_terms(array(
            'taxonomy' => 'category',
            'orderby' => 'name',
            'childless' => true
        ));

        // Years
        $all_posts = get_posts(array( 'posts_per_page' => -1 ));
        $this->years = array();

        foreach ($all_posts as $single)
        {
            if( !array_key_exists( mysql2date( 'Y', $single->post_date ), $this->years )  )
            {
                $this->years['terms'][mysql2date( 'Y', $single->post_date )] = mysql2date( 'Y', $single->post_date );
            }
        }
        $this->years['name'] = "Years";

    }

    public function search_ajax($filters)
    {
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body);

        $posts = self::filterQuery( $data->post ) ;

        // compile timber tmpl.
        echo json_encode( array(
            'template' => \Timber::compile( '_organisms/blog-archive-posts/blog-archive-posts.twig', array('posts' => $posts ) ),
            'num_of_posts' => count($posts)
        ) );
        die();
    }

    private static function filterQuery($filters)
    {
        $tax_query = [];
        $year_query = [];

        $prop = 'post_tag[]';
        if( isset( $filters->$prop) )
        {
            $tags = $filters->$prop;
            array_push( $tax_query,
                array( 'taxonomy' => 'post_tag', 'field' => 'slug', 'terms' => get_object_vars($tags) )
            );
        }

        $prop = 'category[]';
        if( isset( $filters->$prop ) )
        {
            $categories = $filters->$prop;
            array_push( $tax_query,
                array( 'taxonomy' => 'category', 'field' => 'slug', 'terms' => get_object_vars($categories))
            );
        }

        $prop = 'years[]';
        if( isset( $filters->$prop ) )
        {
            $years = $filters->$prop;
            foreach( $years as $year)
            {
                array_push( $year_query,
                    array( 'year' => $year )
                );
            }
        }

        if( !empty($tax_query) || !empty($year_query) || !empty($filters->keyword) )
        {
            $args = array(
                'post_type' => 'post',
                "orderby"   => "post_date",
                "order"     => "ASC"
            );
            if( !empty($tax_query) || !empty($year_query) )
            {
                array_push( $tax_query, array('relation' => 'OR') );
                array_push( $year_query, array('relation' => 'OR') );
                array_push($args, array( 'tax_query' => $tax_query ) );
                array_push($args, array('date_query' => $year_query) );
            }
            if( !empty($filters->keyword) )
            {
                $args = array_merge( $args, array( 's' => $filters->keyword ) );
            }
        }

        // search for posts with terms
        return \Timber::get_posts( $args );
    }
}
