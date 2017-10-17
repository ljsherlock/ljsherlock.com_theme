<?php

namespace MVC\Controllers;

class Content_Block extends Base
{
    protected $modelName = "Post__Content_Block";
    protected $template = "block";
}

// default block template ('.block' has default padding, which can be overidden)

// dynamic template to include inside it otherwise 'content-block.twig'
