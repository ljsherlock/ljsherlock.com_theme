<?php

namespace Includes\Classes;

class Images
{

    public static function setup()
    {
        add_action('after_setup_theme', array(__CLASS__, 'add_image_sizes'));
    }

    /**
     *  Add Image Sizes
     */
      public static function add_image_sizes()
      {
         add_theme_support( 'post-thumbnails', array( 'post', 'page', 'thoughts' ) );

         // Banner sizes
         add_image_size('banner__desktop-retina', 2800, 1600, true);
         add_image_size('banner__desktop', 1400, 800, true);
         add_image_size('banner__mobile-retina', 1536, 920, true);
         add_image_size('banner__mobile', 768, 470, true);

        //  add_image_size('title-banner-desktop-retina', 2800, 440, true);
        //  add_image_size('title-banner-desktop', 1400, 220, true);
        //  add_image_size('title-banner-mobile-retina', 1536, 440, true);
        //  add_image_size('title-banner-mobile', 768, 220, true);

         add_image_size('tile__desktop-retina', 1280, 1280, true);
         add_image_size('tile__desktop', 640, 640, true);
         add_image_size('tile__mobile-retina', 1280, 1280, true);
         add_image_size('tile__mobile', 640, 640, true);

         //same as above but does not crop, scales instead.
         add_image_size('tile__desktop-retina--scale', 1280, 1280, false);
         add_image_size('tile__desktop--scale', 640, 640, false);
         add_image_size('tile__mobile-retina--scale', 1280, 1280, false);
         add_image_size('tile__mobile--scale', 640, 640, false);
    }

    /**
     *  Return image url based on Device
     *
     *  @param  {Array} Image Array
     *  @param  {String} image type
     *  @param  {boolean} Return Url Only
     *  @param  {String} Classes
     *  @example serve_image( $array, 'banner', true, false);
     */
     public static function serve_image( $image_array = array(), $type = 'tile', $srcOnly = false, $retina = false, $class = '' )
     {
       $size = $image_array['sizes'];
       $title = $image_array['title'];
       $device = \Utils\Utils::isDevice();

       // key of image size iE tile-desktop
       $key = $type.'__'.$device;
       $key = ($retina) ? $key . '--retina' :  $key ;
    //    die(var_dump($key));

       // Use the above key to get the value
       $src = $size[$key];

    //    die(var_dump($src));

       // return the image as URL or IMG element
       return ( $srcOnly === true ) ? $src : '<img src="'. $src .'" alt="'. $title .'" class="'.$class.'"/>' ;

     }

}
