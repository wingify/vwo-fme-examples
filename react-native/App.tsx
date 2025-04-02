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
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import ContentView from './src/view/ContentView';
import { VWOInitOptions, LogLevel } from 'vwo-fme-react-native-sdk/src/types';
import { VwoFmeProvider } from './src/helper/VwoFmeProvider';
import { SdkEnvironment } from './src/constants/Constants';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const options: VWOInitOptions = {
    sdkKey: SdkEnvironment.sdkKey,
    accountId: SdkEnvironment.accountID,
    logLevel: LogLevel.debug,
    integrations: true,
    cachedSettingsExpiryTime: null,
    pollInterval: null,
    batchMinSize: null,
    batchUploadTimeInterval: null,
  };

  return (
    <VwoFmeProvider options={options}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ContentView />
      </SafeAreaView>
    </VwoFmeProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
