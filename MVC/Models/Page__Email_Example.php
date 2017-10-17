<?php

namespace MVC\Models;

class Page__Join_Our_Network extends Page
{
    private $valid = array();

    public function __construct()
    {
        $this->form();
    }

    public function get()
    {
        $this->timber->addContext( array(
            'roles' => get_field('roles_array_of_text'),
        ) );

        return parent::get();
    }

    public function form()
    {
        if( isset( $this->data['form_data']['submit'] ) )
        {
            $this->validate();
        }
    }

    public function validate()
    {
        $this->valid = new \Includes\Classes\ValidFluent( $this->data['form_data'] );

        $this->valid->name('contact_name')->required('You must choose a user name!')->alfa()->minSize(4);
        $this->valid->name('contact_role')->required('Select a role')->alfa()->minSize(5);
        $this->valid->name('contact_email')->required('Provide an Email Address')->email();
        $this->valid->name('contact_telephone')->required()->minSize(11)->numberInteger('Telephone number invalid');

        if( !$this->valid->isGroupValid() )
        {
            $this->timber->addContext(
                array( 'form' =>
                    array( 'valid' => $this->valid ),
                )
            );
        }
         else
        {
            if( $this->email() == true )
            {
                $this->timber->addContext(
                    array( 'form' =>
                        array( 'success' => true ),
                    )
                );
            }
        }
    }

    public function email()
    {
        $email = new \MVC\Controllers\Email('', $this->valid, $this->valid->getValue('contact_name') . 'wants to join the network' );

        return $email->show();
    }
}
