<?php

/**
 * Template for front page if front
 * page is assigned a static page
 */

$page = new MVC\Controllers\Page(array( 'slug' => '104' ));
$page->show();
