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


require_once 'Config.php';
use vwo\VWO;

/**
 * Helper class for VWO SDK
 */

class VWOHelper
{
    private static $vwoClient = null;
    private static $logs = [];

    /**
     * Initialize the VWO client
     */
    public static function init()
    {
        if (self::$vwoClient === null) {
            $sdkConfig = [
                'accountId' => Config::$ACCOUNT_ID,
                'sdkKey' => Config::$SDK_KEY,
                'logger' => [
                    'level' => Config::$LOG_LEVEL,
                ]
            ];

            self::$vwoClient = VWO::init($sdkConfig);
        }
    }

    /**
     * Create user context from request
     */
    public static function createUserContext($userId)
    {
        return [
            'id' => $userId,
            'customVariables' => json_decode(Config::$CUSTOM_VARIABLES, true) ?? [],
            'attributes' => json_decode(Config::$ATTRIBUTES, true) ?? []
        ];
    }

    /**
     * Get flag from VWO FME SDK
     */
    public static function getFlag($userId)
    {
        self::init();
        $userContext = self::createUserContext($userId);
        return self::$vwoClient->getFlag(Config::$FLAG_KEY, $userContext);
    }

    /**
     * Track event from VWO FME SDK
     */
    public static function trackEvent($userId)
    {
        self::init();
        $userContext = self::createUserContext($userId);
        return self::$vwoClient->trackEvent(Config::$EVENT_NAME, $userContext);
    }

    /**
     * Set attribute from VWO FME SDK
     */
    public static function setAttribute($userId)
    {
        self::init();
        $userContext = self::createUserContext($userId);
        return self::$vwoClient->setAttribute(Config::$ATTRIBUTES, $userContext);
    }

    /**
     * Get settings from VWO FME SDK
     */
    public static function getSettings()
    {
        self::init();
        return self::$vwoClient->originalSettings;
    }

    /**
     * Get logs from VWO FME SDK
     */
    public static function getLogs()
    {
        return self::$logs;
    }
}
