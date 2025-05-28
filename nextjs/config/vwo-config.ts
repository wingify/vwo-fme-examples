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

import { LogLevelEnum } from 'vwo-fme-node-sdk';

interface VWOConfig {
  accountId: string;
  sdkKey: string;
  flagKey: string;
  eventName: string;
  customVariables?: Record<string, unknown>;
  attributes: Record<string, string | number | boolean>;
  logLevel: string;
  variableKey1: string;
  variableKey2: string;
}

interface Config {
  vwo: VWOConfig;
}

const config: Config = {
  vwo: {
    accountId: String(Number(process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID) || 0),
    sdkKey: process.env.NEXT_PUBLIC_VWO_SDK_KEY || '',
    flagKey: process.env.NEXT_PUBLIC_VWO_FLAG_KEY || '',
    eventName: process.env.NEXT_PUBLIC_VWO_EVENT_NAME || '',
    attributes: process.env.NEXT_PUBLIC_VWO_USER_ATTRIBUTES 
      ? JSON.parse(process.env.NEXT_PUBLIC_VWO_USER_ATTRIBUTES) 
      : {},
    customVariables: process.env.NEXT_PUBLIC_VWO_CUSTOM_VARIABLES
      ? JSON.parse(process.env.NEXT_PUBLIC_VWO_CUSTOM_VARIABLES)
      : {},
    logLevel: process.env.NEXT_PUBLIC_VWO_LOG_LEVEL || LogLevelEnum.DEBUG,
    variableKey1: process.env.NEXT_PUBLIC_VWO_VARIABLE_KEY_1 || 'model_name',
    variableKey2: process.env.NEXT_PUBLIC_VWO_VARIABLE_KEY_2 || 'query_answer',
  },
};

// Validate required configuration
const requiredConfig: (keyof VWOConfig)[] = ['accountId', 'sdkKey', 'flagKey'];
for (const field of requiredConfig) {
  if (!config.vwo[field]) {
    throw new Error(`Missing required configuration: NEXT_PUBLIC_VWO_${field.toUpperCase()}`);
  }
}

export default config;
export type { Config, VWOConfig };
