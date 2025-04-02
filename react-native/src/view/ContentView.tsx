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

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { VWOContext, GetFlagResult } from 'vwo-fme-react-native-sdk/src/types';
import { useVwoFme } from '../helper/VwoFmeProvider';
import { Constants } from '../constants/Constants';

const ContentView = () => {
  const { vwo, isInitialized, error, sdkLogs } = useVwoFme();

  const [userId, setUserId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const [userQueries, setUserQueries] = useState([]);
  const [featureModelName, setFeatureModelName] = useState<string>('');
  const [featureBackground, setFeatureBackground] = useState<string>('#ffffff');
  const [featureContent, setFeatureContent] = useState<string>(Constants.DefaultBotResponse);
  const [isSheetPresented, setIsSheetPresented] = useState(false);

  const generateRandomUserId = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let userId = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      userId += letters[randomIndex];
    }
    return userId;
  };

  const generateRandomQuery = () => {
    return 'I forgot my password';
  };

  const getFeatureFlag = async (featureKey: string, context: VWOContext) => {
    if (isInitialized && vwo) {
      try {
        const flagData = vwo.getFlag(featureKey, context);
        return flagData;
      } catch (error) {
        console.error('Failed to get feature flag:', error);
        throw error;
      }
    }
  };

  const trackFeatureEvent = async (
    eventName: string,
    context: VWOContext,
    eventProperties: any,
  ) => {
    if (isInitialized && vwo) {
      try {
        vwo.trackEvent(eventName, context, eventProperties);
      } catch (error) {
        console.error('Failed to track event:', error);
      }
    }
  };

  const handleSend = async () => {
    if (!isLoading && messageText && isInitialized) {
      let query = messageText;
      setUserQueries([...userQueries, messageText]);
      setIsLoading(true);
      const featureKey = Constants.FeatureFlags.fmeExampleSmartBot;
      const context: VWOContext = {
        id: userId,
        customVariables: {},
      };
      try {
        // Get the feature flag
        const flagResult: GetFlagResult = await getFeatureFlag(featureKey, context);

        // Check if isEnabled is a function or a property
        const flagEnabled = flagResult.isEnabled();
        setIsFeatureEnabled(flagEnabled);

        if (flagEnabled) {
          // Get model name variable
          const modelName = flagResult.getVariable(Constants.FeatureFlags.variableKey1, 'GPT-4');
          setFeatureModelName(modelName);

          // Get query answer variable (JSON)
          const queryAnswer = flagResult.getVariable(Constants.FeatureFlags.variableKey2, {});
          if (queryAnswer.background) {
            setFeatureBackground(queryAnswer.background);
          } else {
            setFeatureBackground('');
          }

          if (queryAnswer.content) {
            setFeatureContent(queryAnswer.content);
          }
          setIsLoading(false);

          // Track the event
          const properties = {
            model: modelName,
            query: query,
            response: queryAnswer.content,
          };
          const eventName = Constants.Events.aiModelInteracted;
          trackFeatureEvent(eventName, context, properties);
        } else {
          // set default values to show
          setFeatureBackground('#ffffff');
          setFeatureModelName('');
          setFeatureContent(Constants.DefaultBotResponse);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error handling button press:', error);
      }
    }
  };

  const CustomButton = ({ title, onPress, isDisabled }) => {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDisabled ? 'gray' : 'blue' }]}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Bot</Text>

      <View style={styles.row}>
        <Text style={styles.label}>User id</Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            setUserId(generateRandomUserId());
            setMessageText(generateRandomQuery());
          }}
        >
          <Text style={styles.assignText}>Assign</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter User ID or assign one"
        value={userId}
        onChangeText={setUserId}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Search a query</Text>
      </View>

      <View style={styles.queryContainer}>
        <TextInput
          style={styles.queryInput}
          placeholder="Enter your query"
          value={messageText}
          onChangeText={setMessageText}
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <CustomButton title="Send" onPress={handleSend} isDisabled={!messageText} />
        </View>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <View>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}

      {!isLoading && userQueries.length > 0 && (
        <>
          {featureModelName !== '' && (
            <View style={styles.modelNameContainer}>
              <Text style={styles.modelName}>Powered by {featureModelName}</Text>
            </View>
          )}
          <View style={[styles.scrollViewContainer, { backgroundColor: featureBackground }]}>
            <ScrollView>
              <Text style={styles.responseText}>{featureContent}</Text>
            </ScrollView>
          </View>
        </>
      )}

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.footerText}>Feature Flag Status: </Text>
          <Text style={[styles.footerText, { color: isFeatureEnabled ? 'green' : 'red' }]}>
            {isFeatureEnabled ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
        <Text style={styles.footerText}>
          User ID: {userId.length > 8 ? `${userId.substring(0, 8)}...` : userId}
        </Text>
      </View>

      {isInitialized && (
        <TouchableOpacity onPress={() => setIsSheetPresented(true)}>
          <Text style={styles.linkText}>Show SDK Logs</Text>
        </TouchableOpacity>
      )}

      <Modal visible={isSheetPresented} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}> SDK Logs</Text>
              <Button color={'black'} title="Close" onPress={() => setIsSheetPresented(false)} />
            </View>
            <FlatList
              style={{ marginTop: 16 }}
              data={sdkLogs}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              keyExtractor={(item) => item}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
    fontSize: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  queryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  queryInput: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  scrollViewContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
  },
  responseText: {
    fontSize: 20,
    lineHeight: 30,
    borderRadius: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: 'gray',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  assignText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: '500',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
    }),
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.3,
  },
  modelName: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  modelNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonContainer: {
    marginLeft: 16,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ContentView;
