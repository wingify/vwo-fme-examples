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

// Replace with your actual values
window.vwoConfig = {
    accountId: '123456', // VWO Account ID
    sdkKey: '32-alpha-numeric-sdk-key', // SDK Key,
    flagKey: 'feature-flag-key',
    eventName: 'event-name',
    attributes: {}, // e.g. { attr1: 'value1' }
    customVariables: {}, // e.g. { var1: 'value1' }
    logLevel: vwoSdk.LogLevelEnum.DEBUG,
    pollInterval: 5000,
    variablekey1: 'variable-key-1',
    variablekey2: 'variable-key-2',
};
