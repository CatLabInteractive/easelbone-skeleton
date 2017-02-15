<?php

$url = isset ($_GET['url']) ? $_GET['url'] : null;

$data = file_get_contents ($url);

$finfo = new finfo (FILEINFO_MIME);
$type = $finfo->buffer($data);

$parts = explode (';', $type);
header ('Content-type: ' . $parts[0]);
echo $data;