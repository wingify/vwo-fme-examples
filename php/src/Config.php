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


require_once __DIR__ . '/../vendor/autoload.php';
use Dotenv\Dotenv;

// Load environment variables using vlucas/phpdotenv
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');  // Changed path to point to php folder
$dotenv->load();  // Load .env file


/**
 * Configuration class for VWO SDK
 */
class Config
{
    // Define static variables instead of constants
    public static $ACCOUNT_ID;
    public static $SDK_KEY;
    public static $FLAG_KEY;
    public static $EVENT_NAME;
    public static $ATTRIBUTES;
    public static $CUSTOM_VARIABLES;
    public static $LOG_LEVEL;
    public static $VARIABLE_KEY_1;
    public static $VARIABLE_KEY_2;

    // Static method to initialize configuration values
    public static function initialize()
    {
        // Use $_ENV instead of getenv() for better reliability
        self::$ACCOUNT_ID = $_ENV['VWO_ACCOUNT_ID'] ?? '';
        self::$SDK_KEY = $_ENV['VWO_SDK_KEY'] ?? '';
        self::$FLAG_KEY = $_ENV['VWO_FLAG_KEY'] ?? '';
        self::$EVENT_NAME = $_ENV['VWO_EVENT_NAME'] ?? '';
        self::$ATTRIBUTES = $_ENV['VWO_USER_ATTRIBUTES'] ?? '';
        self::$CUSTOM_VARIABLES = $_ENV['VWO_CUSTOM_VARIABLES'] ?? '';
        self::$LOG_LEVEL = $_ENV['VWO_LOG_LEVEL'] ?? 'DEBUG';
        self::$VARIABLE_KEY_1 = $_ENV['VWO_FLAG_VARIABLE_1_KEY'] ?? '';
        self::$VARIABLE_KEY_2 = $_ENV['VWO_FLAG_VARIABLE_2_KEY'] ?? '';
    }

    // Additional validation if needed
    public static function validate()
    {
        if (empty(self::$ACCOUNT_ID) || empty(self::$SDK_KEY) || empty(self::$FLAG_KEY)) {
            throw new Exception('Missing required VWO config values');
        }
    }
}

// Initialize the configuration
Config::initialize();

// Call validate method to ensure required configuration is available
Config::validate();
