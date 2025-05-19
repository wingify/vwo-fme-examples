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

// Validate environment variables at runtime
const requiredEnvVars = [
  'VITE_VWO_ACCOUNT_ID',
  'VITE_VWO_SDK_KEY',
  'VITE_VWO_LOG_LEVEL',
  'VITE_VWO_FLAG_KEY',
  'VITE_VWO_EVENT_NAME',
  'VITE_VWO_FLAG_VARIABLE_1_KEY',
  'VITE_VWO_FLAG_VARIABLE_2_KEY',
] as const;

// Check if all required environment variables are present
requiredEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

interface LogEntry {
  level: string;
  message: string;
}

let logs: LogEntry[] = [];

export const vwoConfig = {
  accountId: import.meta.env.VITE_VWO_ACCOUNT_ID,
  sdkKey: import.meta.env.VITE_VWO_SDK_KEY,
  logLevel: import.meta.env.VITE_VWO_LOG_LEVEL || 'DEBUG',
  transport: {
    log: (level: string, message: string): void => {
      logs.push({ level, message });
    },
  },
  flagKey: import.meta.env.VITE_VWO_FLAG_KEY,
  eventName: import.meta.env.VITE_VWO_EVENT_NAME,
  variableKey1: import.meta.env.VITE_VWO_FLAG_VARIABLE_1_KEY,
  variableKey2: import.meta.env.VITE_VWO_FLAG_VARIABLE_2_KEY,
  attributes: import.meta.env.VITE_VWO_ATTRIBUTES || {},
} as const;

// Export logs array for access in other components
export { logs };

// Type-safe way to access environment variables
export type VWOConfig = typeof vwoConfig;
