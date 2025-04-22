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
using System.IO;
using Newtonsoft.Json;
using DotNetEnv;

namespace VWOFmeExampleApp
{
    public static class Config
    {
        public static string AccountId { get; set; } = "YOUR_ACCOUNT_ID";
        public static string SdkKey { get; set; } = "YOUR_SDK_KEY";
        public static string LogLevel { get; set; } = "INFO";
        public static int PollInterval { get; set; } = 30;
        public static string FlagKey { get; set; } = "YOUR_FLAG_KEY";
        public static string EventName { get; set; } = "YOUR_EVENT_NAME";
        public static Dictionary<string, object> CustomVariables { get; set; } = new Dictionary<string, object>();
        public static Dictionary<string, object> Attributes { get; set; } = new Dictionary<string, object>();
        public static string VariableKey1 { get; set; } = "YOUR_VARIABLE_KEY_1";
        public static string VariableKey2 { get; set; } = "YOUR_VARIABLE_KEY_2";

        static Config()
        {
            // Get the absolute path to the root directory of the project (dotnet/)
            var projectRoot = Path.Combine(Directory.GetCurrentDirectory());  // Goes one directory up to the project root
            // The .env file should be in the project root
            var dotnetEnvPath = Path.Combine(projectRoot, ".env");
           // Load the .env file
            if (File.Exists(dotnetEnvPath))
            {
                Env.Load(dotnetEnvPath);
            }
            else
            {
                Console.WriteLine($"Error: .env file not found at: {dotnetEnvPath}");
            }


            // Load environment variables from .env file
            AccountId = Environment.GetEnvironmentVariable("VWO_ACCOUNT_ID") ?? "0";
            SdkKey = Environment.GetEnvironmentVariable("VWO_SDK_KEY") ?? string.Empty;
            FlagKey = Environment.GetEnvironmentVariable("VWO_FLAG_KEY") ?? string.Empty;
            EventName = Environment.GetEnvironmentVariable("VWO_EVENT_NAME") ?? string.Empty;
            Attributes = JsonConvert.DeserializeObject<Dictionary<string, object>>(Environment.GetEnvironmentVariable("VWO_USER_ATTRIBUTES") ?? "{}");
            CustomVariables = JsonConvert.DeserializeObject<Dictionary<string, object>>(Environment.GetEnvironmentVariable("VWO_CUSTOM_VARIABLES") ?? "{}");
            LogLevel = Environment.GetEnvironmentVariable("VWO_LOG_LEVEL") ?? "DEBUG";
            PollInterval = int.TryParse(Environment.GetEnvironmentVariable("VWO_POLLING_INTERVAL"), out var pollInterval) ? pollInterval : 5000;
            VariableKey1 = Environment.GetEnvironmentVariable("VWO_FLAG_VARIABLE_1_KEY") ?? string.Empty;
            VariableKey2 = Environment.GetEnvironmentVariable("VWO_FLAG_VARIABLE_2_KEY") ?? string.Empty;

            // Validate the required config values
            Validate();
        }

        // Validation for required values
        public static void Validate()
        {
            if (string.IsNullOrEmpty(AccountId) || string.IsNullOrEmpty(SdkKey) || string.IsNullOrEmpty(FlagKey))
            {
                throw new Exception("Missing required VWO config values");
            }
        }
    }
}
