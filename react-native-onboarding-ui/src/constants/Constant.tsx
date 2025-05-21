/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const Constants = {
  FeatureFlags: {
    useCase1: process.env.VWO_FLAG_KEY_1,
    useCase2: process.env.VWO_FLAG_KEY_2,
    useCase3: process.env.VWO_FLAG_KEY_3,
  },
  Variable: {
    key: process.env.VWO_FLAG_JSON_VARIABLE_KEY,
  },
  Usecase1UserId: {
    control: process.env.VWO_FLAG_1_CONTROL_USER_ID || 'user-id-8',
    variation: process.env.VWO_FLAG_1_VARIATION_USER_ID || 'user-id-3',
  },
  Usecase2UserId: {
    control: process.env.VWO_FLAG_2_CONTROL_USER_ID || 'user-id-4',
    variation: process.env.VWO_FLAG_2_VARIATION_USER_ID || 'user-id-6',
  },
  Usecase3UserId: {
    control: process.env.VWO_FLAG_3_CONTROL_USER_ID || 'user-id-1',
    variation: process.env.VWO_FLAG_3_VARIATION_USER_ID || 'user-id-4',
  },
};

export const SdkEnvironment = {
  sdkKey: process.env.VWO_SDK_KEY,
  accountID: parseInt(process.env.VWO_ACCOUNT_ID || '0', 10),
};
