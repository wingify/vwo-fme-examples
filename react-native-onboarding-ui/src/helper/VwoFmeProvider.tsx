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

import React, { createContext, useContext, useEffect, useState } from 'react';
import { init, VWO } from 'vwo-fme-react-native-sdk';
import { VWOInitOptions } from 'vwo-fme-react-native-sdk/src/types';

interface VwoFmeContextType {
  vwo: VWO | null;
  isInitialized: boolean;
  error: Error | null;
}

const VwoFmeContext = createContext<VwoFmeContextType>({
  vwo: null,
  isInitialized: false,
  error: null,
});

interface VwoFmeProviderProps {
  options?: VWOInitOptions;
  children: React.ReactNode;
}

export const VwoFmeProvider: React.FC<VwoFmeProviderProps> = ({ options = {}, children }) => {
  const [vwo, setVwo] = useState<VWO | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeVWO = async () => {
      try {
        const vwoInstance = await init(options);
        setVwo(vwoInstance);
        setIsInitialized(true);

        // Register integration callback
        const removeIntegrationListener = VWO.registerIntegrationCallback((properties) => {
          console.log('Integration properties:', properties);
        });
        // Cleanup function
        vwoInstance.cleanup = () => {
          removeIntegrationListener();
        };
      } catch (err) {
        setError(new Error('Failed to initialize VWO SDK'));
      }
    };

    initializeVWO();

    return () => {
      if (vwo?.cleanup) {
        vwo.cleanup();
      }
    };
  }, [options]);

  return (
    <VwoFmeContext.Provider value={{ vwo, isInitialized, error }}>
      {children}
    </VwoFmeContext.Provider>
  );
};

export const useVwoFme = () => {
  const context = useContext(VwoFmeContext);
  if (context === undefined) {
    throw new Error('useVwoFme must be used within a VwoFmeProvider');
  }
  return context;
};
