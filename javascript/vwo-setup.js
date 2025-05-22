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

let vwoClient = null;
let vwoLogs = [];

// Initialize VWO SDK
async function initVwo() {
  vwoClient = await vwoSdk.init({
    accountId: window.vwoConfig.accountId,
    sdkKey: window.vwoConfig.sdkKey,
    logger: {
      level: window.vwoConfig.logLevel,
      transport: {
        log: (level, message) => {
          vwoLogs.push({ level, message });
        },
      },
    },
    integrations: {
      callback: (properties) => {
        (async () => {
          console.log('properties', properties);
        })();
      },
    },
    pollInterval: window.vwoConfig.pollInterval,
  });
  // Expose the initialized client
  window.vwoClient = vwoClient;
}

// Call initVwo on page load
window.addEventListener('DOMContentLoaded', initVwo);

// Get flag and track event
async function getVwoFlagAndTrack(userId) {
  if (!window.vwoClient) throw new Error('VWO SDK not initialized');
  const userContext = {
    id: userId,
    customVariables: window.vwoConfig.customVariables
  };
  const flag = await window.vwoClient.getFlag(window.vwoConfig.flagKey, userContext);
  const isEnabled = flag.isEnabled();
  const variables = flag.getVariables();
  const settings = window.vwoClient.originalSettings;
  await window.vwoClient.trackEvent(window.vwoConfig.eventName, userContext);
  // Optionally: await window.vwoClient.setAttribute(window.vwoConfig.attributes, userContext);
  return {
    flag,
    isEnabled,
    variables,
    settings,
    logs: vwoLogs,
  };
}

window.getVwoFlagAndTrack = getVwoFlagAndTrack; 