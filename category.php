<?php

$taxonomy = 'category';
$taxonomyObj = get_taxonomy($taxonomy);
$term = get_query_var('category_name');

$archive = new MVC\Controllers\Archive( array(
    'post_type' => 'post',
    'tax' => $taxonomyObj,
    'term' => $term,
    'query' => array(
        'category_name' => get_the_category()[0]->slug,
    )
));
$archive->show();
