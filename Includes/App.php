<?php

namespace Includes;

class App
{
    public static function init()
    {
        $quote = new \MVC\ContentTypes\Quote();
        $quote->args['menu_icon'] = 'dashicons-editor-quote';
        $quote->register();

        $project = new \MVC\ContentTypes\Project();
        $project->args['menu_icon'] = 'dashicons-hammer';
        $project->args['supports'] = array_merge($project->args['supports'], array('excerpt'));
        $project->register();
    }
}
