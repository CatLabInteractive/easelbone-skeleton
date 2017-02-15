<?php

$root = dirname(__DIR__) . '/mods/';
$files = scandir($root);

$out = array();
foreach ($files as $file) {

	$index = $root . $file .'/' . $file . '.js';
	if (is_file ($index)) {
		$out[] = array (
			'path' => $file . '/',
			'index' => $file . '/' . $file . '.js'
		);
	}
}

header ('Content-type: application/json');
echo json_encode($out);