<?php

namespace MVC\Controllers;

class Project extends Base
{
    protected $modelName = "Post__Project";
    protected $template = "pages/project/project";
}

// default block template ('.block' has default padding, which can be overidden)

// dynamic template to include inside it otherwise 'content-block.twig'
