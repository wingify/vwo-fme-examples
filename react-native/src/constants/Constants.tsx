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

export const SdkEnvironment = {
  sdkKey: process.env.VWO_SDK_KEY,
  accountID: parseInt(process.env.VWO_ACCOUNT_ID || '0', 10),
};

export const Constants = {
  FeatureFlags: {
    fmeExampleSmartBot: process.env.VWO_FLAG_KEY,
    variableKey1: process.env.VWO_FLAG_VARIABLE_1_KEY,
    variableKey2: process.env.VWO_FLAG_VARIABLE_2_KEY,
  },
  Events: {
    aiModelInteracted: process.env.VWO_EVENT_NAME,
  },

  DefaultBotResponse: `
  To reset your password:
  1. Open the app and go to the login screen.
  2. Tap ‘Forgot Password?’ below the password field.
  3. Enter your registered email address and submit.
  4. Check your inbox for a password reset email (it may take a few minutes).
  5. Click the link in the email and follow the instructions to create a new password.
  6. Return to the app and log in with your new password.
  `,
};
