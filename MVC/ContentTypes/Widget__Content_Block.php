<?php

namespace MVC\ContentTypes;

class Widget__Content_Block extends Widget
{
    public $name = 'Content Block';
    public $className = 'content-block';
    public $desc = "A Content Block Widget";
    public $type = '';

    // specified by widget
    public $template = '_molecules/block/block--content';

    /**
     * Registers the widget with the WordPress Widget API.
     *
     * @return void.
     */
    public static function register() {
        register_widget( __CLASS__ );
    }

    /**
     * Registers the widget with the WordPress Widget API.
     *
     * @return void.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget( $args, $instance )
    {
        parent::widget( $args, $instance );

        if(!empty($instance) )
        {
            // widget values
            $this->post = ( ! empty( $instance['post'] ) ) ? absint( $instance['post'] ) : '';
            $this->template = ( ! empty( $instance['template'] ) ) ? $instance['template'] : $this->template;
            $this->type = 'widget';

            // initiate Controller
            $widget = new \MVC\Controllers\Widget__Content_Block(
                array( 'widget' => $this, )
            );

            // get widget
            $widget->get_widget();

            // Show the Widget
            $widget->show();
        }
    }

    public function update( $new_instance, $old_instance )
    {
        $instance = $old_instance;
        $instance['post'] = (int) $new_instance['post'];
        $instance['template'] = sanitize_text_field( $new_instance['template'] );

        return $instance;
    }

    public function form( $instance )
    {
        // widget field_id, value & name
        $this->instances->post->id = $this->get_field_id( 'post' );
        $this->instances->post->value = isset( $instance['post'] ) ? absint( $instance['post'] ) : 0;
        $this->instances->post->name = $this->get_field_name( 'post' );
        $this->instances->post->title = 'Post:';
        $this->instances->post->type = 'select';

        // widget field_id, value & name
        $this->instances->template->id = $this->get_field_id( 'template' );
        $this->instances->template->value = isset( $instance['template'] ) ? esc_attr( $instance['template'] ) : $this->template;
        $this->instances->template->name = $this->get_field_name( 'template' );
        $this->instances->template->title = 'Template:';
        $this->instances->template->type = 'text';

        $this->type = 'form';

        //initiate Controller
        $widget = new \MVC\Controllers\Widget__Content_Block(
            array( 'widget' =>  $this )
        );

        // get forms
        $widget->get_form();

        // Render the Form
        $widget->show();
    }
}
