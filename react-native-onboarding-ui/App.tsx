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

import React from 'react';
import { StyleSheet } from 'react-native';

import { VWOInitOptions, LogLevel } from 'vwo-fme-react-native-sdk/src/types';
import { VwoFmeProvider } from './src/helper/VwoFmeProvider';
import { SdkEnvironment } from './src/constants/Constant';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './src/screens/Welcome';
import FeatureList from './src/screens/FeatureList';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const options: VWOInitOptions = {
    sdkKey: SdkEnvironment.sdkKey,
    accountId: SdkEnvironment.accountID,
    logLevel: LogLevel.debug,
    integrations: true,
    cachedSettingsExpiryTime: null,
    pollInterval: null,
    batchMinSize: null,
    batchUploadTimeInterval: null,
    vwoMeta: { _ea: 1, _ean: 'tj' }, // this is for internal use by VWO, DO NOT REMOVE
  };

  return (
    <VwoFmeProvider options={options}>
      <SafeAreaProvider style={styles.safeAreaView}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FeatureList">
            <Stack.Screen
              name="FeatureList"
              component={FeatureList}
              options={{ title: 'Use cases', headerShown: false }}
            />
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </VwoFmeProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
