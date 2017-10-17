<?php

namespace MVC\ContentTypes;

class Widget__Join_Our_Network extends Widget
{
    public $name = 'Join Our Network';
    public $className = 'join-our-network   ';
    public $desc = "Add any contact form to your theme";
    public $type = '';

    // specified by widget
    public $template = '';

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

        $page = new \MVC\Controllers\Page__Join_Our_Network(array(
            'template' => '_app/_templates/widget--join-our-network' )
        );
        
        $page->show();
    }

    public function update( $new_instance, $old_instance )
    {
        $instance = $old_instance;
        $instance['template'] = $new_instance['template'];

        return $instance;
    }

    public function form( $instance )
    {
        // widget field_id, value & name
        $this->instances->template->id = $this->get_field_id( 'template' );
        $this->instances->template->value = isset( $instance['template'] ) ? absint( $instance['template'] ) : 0;
        $this->instances->template->name = $this->get_field_name( 'template' );
        $this->instances->template->title = 'Template:';
        $this->instances->template->type = 'select';

        $this->type = 'form';

        //initiate Controller
        $widget = new \MVC\Controllers\Widget__Template(
            array( 'widget' =>  $this )
        );

        // get forms
        $widget->get_form();

        // Render the Form
        $widget->show();
    }
}
