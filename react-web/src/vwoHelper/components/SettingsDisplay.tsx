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

import React from 'react';
import { useVWOClient } from 'vwo-fme-react-sdk';
import { formatJSONWithSyntaxHighlighting } from '../utils/formatters';

/**
 * SettingsDisplay Component
 *
 * Displays VWO campaign settings in a formatted JSON view with syntax highlighting.
 * Uses the VWO React SDK's useVWOClient hook to access campaign settings.
 *
 * @returns {JSX.Element} Pre-formatted JSON display of VWO settings
 */
const SettingsDisplay: React.FC = () => {
  let settings = {};
  const { vwoClient, isReady } = useVWOClient();
  if (isReady && vwoClient) {
    settings = vwoClient.originalSettings;
  }

  return (
    <div className="vwo-settings-display">
      <pre dangerouslySetInnerHTML={{ __html: formatJSONWithSyntaxHighlighting(settings) }} />
    </div>
  );
};

export default SettingsDisplay;
