<?php

namespace MVC\Controllers;

class Page__Join_Our_Network extends Page
{
    public $modelName = "Page__Join_Our_Network";
    public $template = "page__join_our_network";

    public function __construct( $args = array() )
    {
        parent::__construct($args);

        $this->model->add( 'form_data', $_POST );

        if( $this->form_submitted() == true )
        {
            $this->model->validate();
        }
    }

    public function form_submitted()
    {
        if( isset( $_POST['submit'] ) )
        {
            $this->form_data = $_POST;
            return true;
        }
        return false;
    }
}
