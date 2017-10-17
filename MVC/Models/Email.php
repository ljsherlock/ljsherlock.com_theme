<?php

namespace MVC\Models;

class Email extends Base
{
    public $headers = '';

    public $via = '';

    private $from = '';

    public function __construct( $args )
    {
        parent::__construct( $args );
    }

    public function get()
    {
        $this->to = get_option('admin_email');

        $this->from = 'From: '. $this->data['contact_name'];
        $this->from .= ( !empty( $this->via ) ) ? ' (via '. $this->via . ') ' : ' ';
        $this->from .= '<'. $this->data['contact_email'] .'>';

        $this->headers = array(
            'Content-Type: text/html; charset=UTF-8',
            $this->from
        );

        $this->timber->addContext( array(
            'form' => array(
                'values' => array(
                    'contact_name' => $this->data['contact_name'],
                    'contact_role' => $this->data['contact_role'],
                    'contact_email' => $this->data['contact_email'],
                    'contact_telephone' => $this->data['contact_telephone'],
                ),
            ),
        ) );

        return parent::get();
    }
}
