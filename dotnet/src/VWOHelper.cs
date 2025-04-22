#pragma warning disable 1587
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
#pragma warning restore 1587

using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using VWOFmeSdk;
using VWOFmeSdk.Models.User;
using VWOFmeExampleApp;

namespace VWOFmeExampleApp
{
    /// <summary>
    /// Helper class for VWO SDK
    /// </summary>
    public static class VWOHelper
    {
        private static VWOClient _vwoClient = null;
        private static List<Dictionary<string, string>> _logs = new List<Dictionary<string, string>>();
        private static bool _isInitialized = false;

        // Static constructor to initialize the VWO client
        static VWOHelper() { }

        /// <summary>
        /// Initialize the VWO client using VWOInitOptions
        /// </summary>
        public static void Init()
        {
            // Initialize the VWO client only once
            if (!_isInitialized)
            {
                try
                {
                    var logger = new Dictionary<string, object>
                    {
                        { "level", Config.LogLevel }  // Logger level (DEBUG, INFO, etc.)
                    };

                    // Define the transport handlers for different log levels
                    var transports = new List<Dictionary<string, object>>
                    {
                        new Dictionary<string, object>
                        {
                            { "level", "DEBUG" },
                            { "logHandler", new Action<string, string>((msg, level) => LogMessage(msg, level)) }
                        },
                        new Dictionary<string, object>
                        {
                            { "level", "INFO" },
                            { "logHandler", new Action<string, string>((msg, level) => LogMessage(msg, level)) }
                        },
                        new Dictionary<string, object>
                        {
                            { "level", "ERROR" },
                            { "logHandler", new Action<string, string>((msg, level) => LogMessage(msg, level)) }
                        }
                    };

                    // Add transports to the logger configuration
                    logger.Add("transports", transports);

                    // Create an instance of VWOInitOptions
                    var vwoInitOptions = new VWOInitOptions
                    {
                        SdkKey = Config.SdkKey,  // SDK Key from config
                        AccountId = Convert.ToInt32(Config.AccountId),  // Account ID from config
                        Logger = logger,  // Logger configuration
                        PollInterval = Config.PollInterval  // Polling interval from config
                    };

                    // Initialize the VWO client using the VWOInitOptions
                    _vwoClient = VWO.Init(vwoInitOptions);


                    if (_vwoClient == null)
                    {
                        Console.WriteLine("Failed to initialize VWO Client");
                    }
                    else
                    {
                        _isInitialized = true; // Set flag to true once initialized successfully
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception to help with debugging
                    Console.WriteLine($"Error initializing VWO Client: {ex.Message}");
                    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                    throw;
                }
            }
        }

        /// <summary>
        /// Create user context using the VWOContext class
        /// </summary>
        public static VWOContext CreateUserContext(string userId)
        {
            var customVariables = Config.CustomVariables ?? new Dictionary<string, object>();
            var userContext = new VWOContext
            {
                Id = userId, // User ID
                CustomVariables = customVariables  // Custom variables from config
            };
            return userContext;
        }

        /// <summary>
        /// Get the flag from VWO FME SDK
        /// </summary>
        public static GetFlag GetFlag(string userId)
        {
            Init();  // Ensure VWO client is initialized
            var userContext = CreateUserContext(userId); // Create the VWOContext for the user
            return _vwoClient.GetFlag(Config.FlagKey, userContext); // Returns GetFlag object
        }

        /// <summary>
        /// Track the event from VWO FME SDK
        /// </summary>
        public static Dictionary<string, bool> TrackEvent(string userId)
        {
            Init();  // Ensure VWO client is initialized
            var userContext = CreateUserContext(userId); // Create the user context
            return _vwoClient.TrackEvent(Config.EventName, userContext); // Track the event and return the result as a dictionary
        }

        /// <summary>
        /// Set attribute from VWO FME SDK
        /// </summary>
        public static bool SetAttribute(string userId)
        {
            Init();  // Ensure VWO client is initialized
            var userContext = CreateUserContext(userId); // Create the user context
            //return _vwoClient.SetAttribute(Config.VariableKey1, Config.Attributes, userContext); // Set the attribute, returns a boolean result
            return true;
        }

        /// <summary>
        /// Get settings from VWO FME SDK
        /// </summary>
        public static string GetSettings()
        {
            Init();  // Ensure VWO client is initialized
            return _vwoClient.Settings ?? "No settings available"; // Retrieve settings or return a default message
            //serialize the settings
            
        }

        // Log the messages to the _logs list
        private static void LogMessage(string msg, string level)
        {
            // Push the log message to the logs list
            _logs.Add(new Dictionary<string, string>
            {
                { "level", level },
                { "message", msg }
            });

            
        }

        /// <summary>
        /// Get logs from VWO FME SDK
        /// </summary>
        public static List<Dictionary<string, string>> GetLogs()
        {
            return _logs;  // Return the logs as a list of dictionaries
        }
    }
}
