<?php

namespace MVC\Models;

use Includes\Utils\Utils as Utils;

abstract class Base
{
    /**
    * Model args
    * @var object
    */
    protected $args = [];

    /**
    * Stores all model data
    * @var object
    */
    protected $data = array();

    /**
    * Twig worker
    * @var \wptwig\Workers\Twig
    */
    public $timber = null;

    /**
    * @method __construct
    *
    * @param Array $args Model arguments
    */
    public function __construct( $args )
    {
        $this->args = $args;
        $this->add('args', $args);
    }

    /**
    * @method Stores all model data
    *
    * @param String $name key
    * @param Mixed $value array value
    */
    public function add( $name, $value )
    {
        $this->data[ $name ] = $value;
    }



    /**
    * @method get returns data to the controller
    *
    * @param void
    *
    * @return $this->data
    */
    public function get()
    {
        // Add core context data.
        $this->timber->addContext(
            array(
                'ajax' => false,
                'year' => date('Y'),
                'device' => Utils::isDevice(),
                'mustard' => (_MUSTARD != null && _MUSTARD == 'true') ? true : '',
            )
        );

        // put timber context in the $data variable
        $this->data = $this->timber->context;

        // force array for twig
        return $this->data;
    }

    public function context()
    {
        // put timber context in the $data variable
        $this->data = $this->timber->context;

        // force array for twig
        return $this->data;
    }

    /**
    * @method forceArray
    * The WP widget class does have trouble
    * see Models/Widget->get()
    * so force the data to be an array.
    * @param mixed $data Array/object
    * @return array
    */
    protected function forceArray($data)
    {
        return json_decode(json_encode($data), true);
    }
}
