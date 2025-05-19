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

import express, { Router, Request, Response } from 'express';
import { getFlag, trackEvent, setAttribute, getSettings, getLogs, Flag, LogEntry } from '../utils/vwoHelper';
import config from '../config';

interface FlagResponse {
  isEnabled: boolean;
  variables: Record<string, unknown>[];
  settings: unknown;
  logs: LogEntry[];
  variablekey1: string;
  variablekey2: any;
}

interface SuccessResponse {
  success: boolean;
}

const router: Router = express.Router();

/**
 * Getflag endpoint
 */
router.get('/v1/get-flag', async (req: Request, res: Response<FlagResponse>) => {
  try {
    // call getFlag from sdkHelper
    const flag: Flag = await getFlag(req);

    // return the flag values in the response
    const isFlagEnabled = flag.isEnabled();
    const variables = flag.getVariables();

    // include the settings in the response
    const settings = getSettings();

    // include the logs in the response
    const logs = getLogs();

    res.json({
      isEnabled: isFlagEnabled,
      variables,
      settings,
      logs,
      variablekey1: flag.getVariable(config.vwo.variablekey1, 'GPT-4'),
      variablekey2: flag.getVariable(config.vwo.variablekey2, []),
    });
  } catch (error) {
    console.error('Error in getFlag route:', error);
    res.status(500).json({
      isEnabled: false,
      variables: [],
      settings: null,
      logs: [],
      variablekey1: 'GPT-4',
      variablekey2: [],
    });
  }
});

/**
 * TrackEvent endpoint
 */
router.get('/v1/track-event', async (req: Request, res: Response<SuccessResponse>) => {
  try {
    // call trackEvent from sdkHelper
    await trackEvent(req);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in trackEvent route:', error);
    res.status(500).json({ success: false });
  }
});

/**
 * SetAttribute endpoint
 */
router.get('/v1/set-attribute', async (req: Request, res: Response<SuccessResponse>) => {
  try {
    // call setAttribute from sdkHelper
    await setAttribute(req);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in setAttribute route:', error);
    res.status(500).json({ success: false });
  }
});

export default router;
