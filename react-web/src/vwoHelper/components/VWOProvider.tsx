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
import { VWOProvider as OriginalVWOProvider } from 'vwo-fme-react-sdk';
import { vwoConfig } from '../../config/vwo.config';

/**
 * VWO Provider Component
 *
 * Wraps the application with VWO SDK provider and handles configuration.
 * Centralizes VWO SDK initialization and configuration in one place.
 *
 * @param {React.ReactNode} children - Child components to be wrapped
 * @returns {JSX.Element} VWO provider with configured SDK
 */
const VWOProvider:  React.ComponentType<any> = ({ children }) => {
  const sdkConfig = {
    accountId: vwoConfig.accountId,
    sdkKey: vwoConfig.sdkKey,
    logger: {
      // level: vwoConfig.logLevel,
      transport: vwoConfig.transport,
    },
  };

  const LoadingSpinner = () => {
    return <div>Loading...</div>;
  };

  const Provider = OriginalVWOProvider as React.ComponentType<any>;
  return (
    <Provider config={sdkConfig} fallbackComponent={<LoadingSpinner />}>
      {children}
    </Provider>
  );
};

export default VWOProvider;
