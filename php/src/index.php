<?php

/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('display_errors', 0);


require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
// Import necessary classes
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app = AppFactory::create();


$app->add(
    function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }
);


$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->get(
    '/', function (Request $request, Response $response) {
        $file = __DIR__ . '/../public/index.html';  // Path to your index.html
        if (file_exists($file)) {
            $response->getBody()->write(file_get_contents($file));
            return $response->withHeader('Content-Type', 'text/html');
        }
        $response->getBody()->write('File not found');
        return $response->withStatus(404);
    }
);


require_once __DIR__ . '/Routes/getFlagRoute.php';
require_once __DIR__ . '/Routes/trackEventRoute.php';
require_once __DIR__ . '/Routes/setAttributeRoute.php';


$app->run();
