<?php

ini_set('display_errors', 1 );

include("controller/user.ctr.php");


$tpl = new UserController();

$tpl->index();

?>