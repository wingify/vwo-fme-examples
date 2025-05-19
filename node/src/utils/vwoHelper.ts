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

import { Request } from 'express';
import { init, Flag, IVWOOptions, IVWOClient, IVWOContextModel } from '../../../../vwo-fme-node-sdk';
import config from '../config';

interface LogEntry {
  level: string;
  message: string;
}

let vwoClient: IVWOClient;
let logs: LogEntry[] = [];

/**
 * Initialize the VWO client
 */
async function initVwoClient(): Promise<void> {
  // initialize the VWO client with the config
  const sdkConfig: IVWOOptions = {
    accountId: config.vwo.accountId,
    sdkKey: config.vwo.sdkKey,
    logger: {
      level: config.vwo.logLevel,
      transport: {
        log: (level, message): void => {
          logs.push({ level, message });
        },
      },
    },
    integrations: {
      callback: (properties: Record<string, unknown>) => {
        (async () => {
          console.log('properties', properties);
          // Do async operations here
        })();
      },
    },
    pollInterval: config.vwo.pollInterval,
  };

  vwoClient = await init(sdkConfig);
}

/**
 * create the user context
 * @param req - The request object
 * @returns The user context
 */
function createUserContext(req: Request): IVWOContextModel {
  // create the user context using the request object and config
  return {
    id: (req.query.userId as string) || 'defaultUser',
    customVariables: config.vwo.customVariables || {},
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  };
}

/**
 * Get the flag from VWO FME SDK
 * @param req - The request object
 * @returns The flag
 */
async function getFlag(req: Request): Promise<Flag> {
  // get the user context
  const userContext = createUserContext(req);
  // get the flag from VWO FME SDK
  const flag = await vwoClient.getFlag(config.vwo.flagKey, userContext);
  return flag;
}

/**
 * Track the event from VWO FME SDK
 * @param req - The request object
 * @returns The success status
 */
async function trackEvent(req: Request): Promise<Record<string, boolean>> {
  // get the user context
  const userContext = createUserContext(req);
  // track the event from VWO FME SDK
  return await vwoClient.trackEvent(config.vwo.eventName, userContext);
}

/**
 * Set the attribute from VWO FME SDK
 * @param req - The request object
 * @returns Promise<void>
 */
async function setAttribute(req: Request): Promise<void> {
  // get the user context
  const userContext = createUserContext(req);
  // set the attribute from VWO FME SDK
  await vwoClient.setAttribute(config.vwo.attributes, userContext);
}

/**
 * Get the settings from VWO FME SDK
 * @returns The settings
 */
function getSettings(): Record<any, any> {
  return vwoClient.originalSettings;
}

/**
 * Get the logs from the VWO FME SDK
 * @returns The logs array
 */
function getLogs(): LogEntry[] {
  return logs;
}

export {
  initVwoClient,
  createUserContext,
  getFlag,
  trackEvent,
  setAttribute,
  getSettings,
  getLogs,
  IVWOContextModel,
  Flag,
  LogEntry,
};
