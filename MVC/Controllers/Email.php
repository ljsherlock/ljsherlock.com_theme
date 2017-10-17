<?php

namespace MVC\Controllers;

class Email extends Base
{
    public $modelName = "Email";
    public $template = "_molecules/email/email";

    public $headers = '';

    public $to = '';

    public $subject = '';

    public $context = '';

    public function __construct( $args, $valid, $subject )
    {
        parent::__construct();

        $this->valid = $valid;

        $this->subject = $subject;

        $this->model->add( 'contact_name', $this->valid->getValue('contact_name') );
        $this->model->add( 'contact_role', $this->valid->getValue('contact_role') );
        $this->model->add( 'contact_email', $this->valid->getValue('contact_email') );
        $this->model->add( 'contact_telephone', $this->valid->getValue('contact_telephone') );
    }

    /**
    * Gather model data, compile template and pass to wp_mail
    * @return null
    */
    public function show()
    {
        // get data
        $data = $this->model->get();

        // render data
        $template = $this->timber->compile( $this->template, $data );

        // send email!
        return wp_mail( $this->model->to, $this->subject , $template, $this->model->headers );
    }
}
