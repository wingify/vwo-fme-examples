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

/**
 * Evaluates and returns feature flag status and configurations for a specific user.
 */

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/../VWOHelper.php';

$app->get(
    '/v1/get-flag', function (Request $request, Response $response) {
        try {
            $userId = $request->getQueryParams()['userId'] ?? 'defaultUser';
            $flag = VWOHelper::getFlag($userId);

            $data = [
            'isEnabled' => $flag->isEnabled(),
            'variables' => $flag->getVariables(),
            'settings' => VWOHelper::getSettings(),
            'logs' => VWOHelper::getLogs(),
            'variablekey1' => $flag->getVariable(Config::$VARIABLE_KEY_1, 'GPT-4'),
            'variablekey2' => $flag->getVariable(Config::$VARIABLE_KEY_2, [])
            ];
            $response->getBody()->write(json_encode($data));
            // Set the correct headers and return the response
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);  // 200 OK is already the default status, but adding it explicitly can be useful for clarity
        } catch (Exception $e) {
            error_log('Error in getFlag route: ' . $e->getMessage());
        
            $errorData = [
            'isEnabled' => false,
            'variables' => [],
            'settings' => null,
            'logs' => [],
            'variablekey1' => 'GPT-4',
            'variablekey2' => []
            ];
        
            $response->getBody()->write(json_encode($errorData));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(500);
        }
    }
);
