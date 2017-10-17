<?php

namespace MVC\ContentTypes;

class Shortcode
{
    public static function initialize( $class )
    {
        // Create the dynamic model name
        $controllerName = "\\MVC\\Models\\{$class}";

        // Initialize Model
        $controller = new $controllerName();

        // render
        $controller->show();
    }
}
