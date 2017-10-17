<?php

namespace MVC\ContentTypes;

class Shortcode__Button extends Shortcode
{
    static $controllerName = 'Shortcode__Button';

    public static function shortcode( $atts = [], $content = null, $tag = '' )
    {
        $class = self::$controllerName;

        $controllerName = "\\MVC\\Controllers\\{$class}";

        // Initialize Model
        $controller = new $controllerName( $atts, $content, $tag );

        // render
        return $controller->show();
    }
}
