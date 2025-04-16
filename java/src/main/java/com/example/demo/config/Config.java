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

package com.example.demo.config;

import io.github.cdimascio.dotenv.Dotenv;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.HashMap;

public class Config {
    private static final Logger logger = LoggerFactory.getLogger(Config.class);
    private static final Dotenv dotenv = Dotenv.configure()
            .directory(".") // Look in current directory for .env
            .load();
    public static final ObjectMapper objectMapper = new ObjectMapper();

    public static String ACCOUNT_ID = dotenv.get("VWO_ACCOUNT_ID");
    public static String SDK_KEY = dotenv.get("VWO_SDK_KEY");
    public static String LOG_LEVEL = dotenv.get("VWO_LOG_LEVEL", "DEBUG");
    public static String FLAG_KEY = dotenv.get("VWO_FLAG_KEY");
    public static String EVENT_NAME = dotenv.get("VWO_EVENT_NAME");
    public static String VARIABLE_KEY_1 = dotenv.get("VWO_FLAG_VARIABLE_1_KEY");
    public static String VARIABLE_KEY_2 = dotenv.get("VWO_FLAG_VARIABLE_2_KEY");
    public static String POLL_INTERVAL = dotenv.get("VWO_POLLING_INTERVAL", "60000");
    public static String ATTRIBUTE_KEY = dotenv.get("VWO_ATTRIBUTE_KEY");
    public static String ATTRIBUTE_VALUE = dotenv.get("VWO_ATTRIBUTE_VALUE");

    private static String convertToValidJson(String input) {
        if (input == null)
            return "{}";
        return input.replace('\'', '"');
    }

    public static final Map<String, Object> CUSTOM_VARIABLES = parseJson(dotenv.get("VWO_CUSTOM_VARIABLES"));

    private static Map<String, Object> parseJson(String jsonString) {
        try {
            String validJson = convertToValidJson(jsonString);
            return objectMapper.readValue(validJson, new TypeReference<Map<String, Object>>() {
            });
        } catch (Exception e) {
            logger.error("Error parsing JSON: {}", e.getMessage());
            return new HashMap<>();
        }
    }

    // Prevent instantiation
    private Config() {
    }
}