<?php

namespace MVC\Controllers;

abstract class Base
{
    /**
    * Controller args
    * @var object
    */
    protected $args = array();

    /**
    * Element attributes
    * @var object
    */
    protected $attrs = array();

    /**
    * Timber worker
    * @var \wptwig\Workers\Twig
    */
    protected $timber = null;

    /**
    * Model object
    * @var object
    */
    public $model = null;

    /**
    * Name of model to be used in Controller;
    * to be set in classes that extend from Base
    * @var string
    */
    public $modelName = '';

    /**
    * Location of template; to be set in classes
    * that extend from Base
    * @var string
    */
    public $template = '';

    /**
    * Setup model and timber/twig
    * @param object args Controller arguments.
    * @return null
    */
    public function __construct($args = array())
    {
        // Allows for a custom template string to be defined in the Controller call argument.
        $this->args = $args;

        // initialize the Timber Workers
        // Pass base template locations
        $this->timber = new \MVC\Workers\Timber( array(
            dirname(__DIR__) . "/View",
            dirname(__DIR__) . "/View/_components",
            dirname(__DIR__) . "/View/_app",
            dirname(__DIR__) . "/View/_macros",
        ));

        // Create the dynamic model name
        $modelName = "\\MVC\\Models\\{$this->modelName}";

        // Initialize Model
        $this->model = new $modelName( $args );

        // Add the timber object to Model
        $this->model->timber = $this->timber;
    }

    /**
    * Gather model data and render twig template
    * @return null
    */
    public function show()
    {
        // get data
        $data = $this->model->get();

        // Allows for a custom template string to be defined in the Controller call argument.
        $this->template = ( isset( $args['template'] ) ) ? $args['template'] : $this->template;

        // render data
        $this->timber->render($this->template, $data);
    }

}
