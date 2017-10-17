<?php

namespace MVC\Models;

use Includes\Classes\CMB2 as CMB2;

class Frontpage extends Page
{
    /**
    * __construct
    * @param array $args Model arguments
    */
    public function __construct( $args )
    {
        parent::__construct( $args );
    }

    public function get()
    {
        // Work Posts: most recent.
        $work = new \MVC\Controllers\Archive__Work( array( 'post_type' => 'work', 'query' => array('posts_per_page' => 1 ) ) );
        $workData = $work->model->get();

        $this->timber->addContext( array(
            'work' => $workData['posts'],
            'captions' => array(
                'left' => get_post_meta( $this->post->ID, CMB2::$prefix . 'hero_caption_left', true ),
                'right' => get_post_meta( $this->post->ID, CMB2::$prefix . 'hero_caption_right', true )
            ),
            'instagram' => $this->instagram(),
        ) );

        return parent::get();
    }

    private function instagram()
    {
        $access_token = CMB2::myprefix_get_option( CMB2::$prefix . 'instagram_at' );
        $recents = json_decode( file_get_contents('https://api.instagram.com/v1/users/self/media/recent/?access_token='. $access_token) );
        $images = array();

        if($recents->data)
        {
            foreach (array_slice($recents->data, 0, 9) as $key => $item)
            {
                $caption = $item->caption->text ?? null;
                $link = $item->link ?? null;
                $image = $item->images->standard_resolution->url ?? null;
                $created_time = $item->created_time;
                array_push($images, array( 'src' => $image, 'alt' => $caption, 'link' => $link, 'created_date' => date( 'j F Y', $created_time) ));
            }
            return $images;
        }
    }

}
