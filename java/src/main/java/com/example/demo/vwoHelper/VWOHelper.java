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

package com.example.demo.vwoHelper;

import com.example.demo.config.Config;
import com.vwo.VWO;
import com.vwo.models.user.VWOContext;
import com.vwo.models.user.GetFlag;
import com.vwo.models.user.VWOInitOptions;
import com.vwo.packages.logger.enums.LogLevelEnum;
import com.vwo.interfaces.logger.LogTransport;
import java.util.Map;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * VWOHelper is a singleton helper class that manages interactions with the VWO
 * Feature Management and Experimentation SDK.
 * It provides functionality to:
 * - Initialize and configure the VWO client
 * - Create user context for feature flag evaluation
 * - Retrieve feature flag values and variables
 * - Track user events
 * - Access VWO settings
 * - Capture and expose SDK logs
 */
public class VWOHelper {
    private VWO vwoClient;
    private List<Map<String, String>> logs = new ArrayList<>();
    private static VWOHelper instance;

    public VWOHelper() {
        initVwoClient();
        instance = this;
    }

    /**
     * Get the singleton instance of VWOHelper
     * 
     * @return The singleton instance
     */
    public static VWOHelper getInstance() {
        if (instance == null) {
            instance = new VWOHelper();
        }
        return instance;
    }

    /**
     * Initialize the VWO client
     */
    public void initVwoClient() {
        // Initialize the VWO client with the config
        VWOInitOptions options = new VWOInitOptions();
        options.setAccountId(Integer.parseInt(Config.ACCOUNT_ID));
        options.setSdkKey(Config.SDK_KEY);
        options.setPollInterval(Integer.parseInt(Config.POLL_INTERVAL));

        Map<String, Object> logger = new HashMap<>();
        logger.put("level", Config.LOG_LEVEL);

        List<Map<String, Object>> transports = new ArrayList<>();

        LogTransport logTransport = new LogTransport() {
            @Override
            public void log(LogLevelEnum level, String message) {
                // push logs to the list
                logs.add(new HashMap<String, String>() {
                    {
                        put("level", level.toString());
                        put("message", message);
                    }
                });
            }
        };
        transports.add(new HashMap<String, Object>() {
            {
                put("defaultTransport", logTransport);
            }
        });
        logger.put("transports", transports);
        options.setLogger(logger);
        vwoClient = VWO.init(options);
    }

    /**
     * Create the user context
     * 
     * @return The user context
     */
    public VWOContext createUserContext() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        VWOContext vwoContext = new VWOContext();
        vwoContext.setId(request.getParameter("userId") != null ? request.getParameter("userId") : "defaultUser");
        vwoContext.setCustomVariables(Config.CUSTOM_VARIABLES);
        vwoContext.setUserAgent(request.getHeader("User-Agent"));
        vwoContext.setIpAddress(request.getRemoteAddr());
        return vwoContext;
    }

    /**
     * Get the flag from VWO FME SDK
     * 
     * @return The flag
     */
    public GetFlag getFlag() {
        VWOContext userContext = createUserContext();
        return vwoClient.getFlag(Config.FLAG_KEY, userContext);
    }

    /**
     * Track the event from VWO FME SDK
     * 
     * @return The success status
     */
    public Map<String, Boolean> trackEvent() {
        VWOContext userContext = createUserContext();
        return vwoClient.trackEvent(Config.EVENT_NAME, userContext);
    }

    /**
     * Set the attribute from VWO FME SDK
     */
    public void setAttribute() {
        VWOContext userContext = createUserContext();
        vwoClient.setAttribute(Config.ATTRIBUTE_KEY, Config.ATTRIBUTE_VALUE, userContext);
    }

    /**
     * Get the settings from VWO FME SDK
     * 
     * @return The settings
     */
    public String getSettings() {
        return vwoClient.settings;
    }

    /**
     * Get the logs from the VWO FME SDK
     * 
     * @return The logs list
     */
    public List<Map<String, String>> getLogs() {
        return logs;
    }
}
