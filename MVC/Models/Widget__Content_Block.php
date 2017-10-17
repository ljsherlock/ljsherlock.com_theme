<?php

namespace MVC\Models;

class Widget__Content_Block extends Widget
{
    public $options = [];

    public function get_widget()
    {
        $this->timber->addContext( array(
            'post' => new \TimberPost( $this->widget->post )
        ) );
    }

    public function get_form()
    {
        $this->widget->instances->post->options = $this->get_options();
    }

    private function get_options()
    {
        $args = array('post_type' => 'content-block');

        foreach( \Timber::get_posts( $args ) as $key => $post )
        {
            $this->options[$key]['value'] = $post->ID;
            $this->options[$key]['text'] = $post->title;
            $this->options[$key]['selected'] = ( $post->ID == $this->widget->instances->post->value ) ? true : false;
        }
        return $this->options;
    }

    private function isForm()
    {
        return ( $this->widget->type == 'form' ) ? true : false;
    }
}
