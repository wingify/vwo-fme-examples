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

 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/../VWOHelper.php';


/**
 * Sets an attribute for a specific user.
 */
$app->get(
    '/v1/set-attribute', function (Request $request, Response $response) {
        try {
            $userId = $request->getQueryParams()['userId'] ?? 'defaultUser';
            VWOHelper::setAttribute($userId);

            $data = ['success' => true];
            $response->getBody()->write(json_encode($data));
        
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);
        } catch (Exception $e) {
            error_log('Error in setAttribute route: ' . $e->getMessage());
        
            $errorData = ['success' => false];
            $response->getBody()->write(json_encode($errorData));
        
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(500);
        }
    }
);
