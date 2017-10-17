<?php

namespace MVC\ContentTypes;

class Quote extends Post
{
    protected $name = "quote";
    protected $singular = "Quote";
    protected $plural = "Quotes";

    protected $taxonomy = "author";
    protected $taxonomy_name = "Author";

}
