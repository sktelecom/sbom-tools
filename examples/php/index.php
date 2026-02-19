<?php
require 'vendor/autoload.php';
use Slim\Factory\AppFactory;
$app = AppFactory::create();
$app->get('/', function ($request, $response) {
    $response->getBody()->write(json_encode(['message' => 'Hello PHP']));
    return $response->withHeader('Content-Type', 'application/json');
});
$app->run();
