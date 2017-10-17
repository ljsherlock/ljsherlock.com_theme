<?php

namespace MVC\ContentTypes;

class Content_Block extends Post
{
    protected $name = "content-block";

    protected $singular = "Content Block";

    protected $plural = "Content Blocks";

    protected $taxonomy = "page";

    protected $taxonomy_name = "Page";
}
