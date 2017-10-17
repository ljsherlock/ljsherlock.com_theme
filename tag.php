<?php

$taxonomy = 'post_tag';
$taxonomyObj = get_taxonomy($taxonomy);
$term = get_query_var('tag');

$args = array(
    'post_type' => $taxonomyObj->object_type[0],
    'tax' => $taxonomyObj,
    'term' => $term,
    'query' => array(
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term
            )
        ),
    )
);

$archive = new MVC\Controllers\Archive($args);
$archive->show();
