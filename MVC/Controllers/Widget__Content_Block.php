<?php

namespace MVC\Controllers;

class Widget__Content_Block extends Widget
{
    public $modelName = 'Widget__Content_Block';

    public function get_widget()
    {
        $this->model->get_widget();
    }

    public function get_form()
    {
        $this->model->get_form();
    }
}
