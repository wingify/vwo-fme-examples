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

package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

import com.vwo.models.user.GetFlag;
import com.example.demo.config.Config;
import com.example.demo.vwoHelper.VWOHelper;
import com.fasterxml.jackson.core.type.TypeReference;

@RestController
@RequestMapping("/v1")
public class VWOController {

    /**
     * This endpoint is used to get the flag values and settings
     * 
     * @return JSON response with flag values and settings
     */
    @GetMapping("/get-flag")
    public ResponseEntity<Map<String, Object>> getFlagValues() {
        try {
            VWOHelper vwoHelper = VWOHelper.getInstance();
            GetFlag flag = vwoHelper.getFlag();

            Map<String, Object> response = new HashMap<>();
            response.put("isEnabled", flag.isEnabled());
            response.put("variables", flag.getVariables());

            // Parse the settings from the response and convert it to a map of key-value
            // pairs
            Map<String, Object> settingsMap = Config.objectMapper.readValue(
                    vwoHelper.getSettings(),
                    new TypeReference<Map<String, Object>>() {
                    });
            response.put("settings", settingsMap);
            response.put("logs", vwoHelper.getLogs());
            response.put("variablekey1", flag.getVariable(Config.VARIABLE_KEY_1, "GPT-4"));
            response.put("variablekey2", flag.getVariable(Config.VARIABLE_KEY_2, new ArrayList<>()));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("isEnabled", false);
            errorResponse.put("variables", new HashMap<>());
            errorResponse.put("settings", null);
            errorResponse.put("logs", new ArrayList<>());
            errorResponse.put("variablekey1", "GPT-4");
            errorResponse.put("variablekey2", new ArrayList<>());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * This endpoint is used to track the event
     * 
     * @return JSON response with the success status
     */
    @GetMapping("/track-event")
    public ResponseEntity<Map<String, Boolean>> trackEvent() {
        try {
            VWOHelper vwoHelper = VWOHelper.getInstance();
            Map<String, Boolean> trackEventResponse = vwoHelper.trackEvent();
            return ResponseEntity.ok(trackEventResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new HashMap<>());
        }
    }

    @GetMapping("/set-attribute")
    public ResponseEntity<Map<String, Object>> setAttribute() {
        VWOHelper vwoHelper = VWOHelper.getInstance();
        vwoHelper.setAttribute();
        return ResponseEntity.ok(Map.of("success", true));
    }
}
