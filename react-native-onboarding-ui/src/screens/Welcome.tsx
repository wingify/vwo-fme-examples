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

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  BackHandler,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import { useVwoFme } from '../helper/VwoFmeProvider';
import { VWOUserContext, GetFlagResult } from 'vwo-fme-react-native-sdk/src/types';
import BottomModal from '../components/BottomModal';
import { PersonalizeControl, PersonalizeLocation } from '../constants/VariationsJson';
const { width, height } = Dimensions.get('window');

const Welcome = ({ route }) => {
  const { vwo, isInitialized } = useVwoFme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const navigation = useNavigation();
  const [jsonVariable, setJsonVariable] = useState(null);
  const { featureItem, variationType } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      if (isInitialized) {
        const featureKey = featureItem.featureKey;
        const context: VWOUserContext = {
          id: variationType === 'Control' ? featureItem.controlUserId : featureItem.variationUserId,
          customVariables: variationType === 'Variation' ? featureItem.customVariables : {},
        };
        try {
          const flagResult: GetFlagResult = await vwo.getFlag(featureKey, context);
          if (flagResult.isEnabled()) {
            const variableData = flagResult.getVariable(
              featureItem.variableKey,
              featureItem.defaultVariable,
            );
            setJsonVariable(variableData);
          } else {
            setJsonVariable(featureItem.defaultVariable);
          }
        } catch (error) {
          console.error('Error handling:', error);
        }
      }
    };
    fetchFeatureFlag();
  }, []);

  const navigateToRoot = () => {
    setJsonVariable(null);
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'FeatureList' }],
        }),
      );
    }, 100);
  };

  const handleContinuePress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleOptionSelect = async (option: string) => {
    setModalVisible(false);
    const newVariationType = option;
    if (isInitialized && vwo) {
      const featureKey = featureItem.featureKey;
      const context: VWOUserContext = {
        id:
          newVariationType === 'Control' ? featureItem.controlUserId : featureItem.variationUserId,
        customVariables: newVariationType === 'Variation' ? featureItem.customVariables : {},
      };
      try {
        const flagResult: GetFlagResult = await vwo.getFlag(featureKey, context);
        if (flagResult.isEnabled()) {
          const variableData = flagResult.getVariable(
            featureItem.variableKey,
            featureItem.defaultVariable,
          );
          setJsonVariable(variableData);
        } else {
          setJsonVariable(featureItem.defaultVariable);
        }
      } catch (error) {
        console.error('Error handling variation change:', error);
      }
    }
  };

  const getModalOptions = (featureItem) => {
    // Check if featureItem has options
    if (featureItem.options) {
      return featureItem.options.map((option) => ({
        label: option.label,
        onPress: () => handleOptionSelect(option.type),
      }));
    }
    return [];
  };

  const modalOptions = getModalOptions(featureItem);

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={{
          uri: `${jsonVariable?.carousal?.data[index]?.imageUrl}`,
        }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        {jsonVariable?.carousal?.gradient?.isVisible && (
          <LinearGradient
            colors={jsonVariable.carousal.gradient.top}
            style={[
              styles.topGradient,
              { height: height * jsonVariable.carousal.gradient.heightMultiplier },
            ]}
          />
        )}
        <View style={styles.textContainerTop}>
          <Text style={styles.text} key={index} numberOfLines={2}>
            {jsonVariable?.carousal?.data[index]?.title?.content.map((item, itemIndex) => (
              <Text key={itemIndex + 'itemtext'} style={item.style}>
                {item.text}
              </Text>
            ))}
          </Text>
        </View>
        {jsonVariable?.carousal?.gradient?.isVisible && (
          <LinearGradient
            colors={jsonVariable.carousal.gradient.bottom}
            style={[
              styles.bottomGradient,
              { height: height * jsonVariable.carousal.gradient.heightMultiplier },
            ]}
          />
        )}
        {jsonVariable?.carousal?.data[index]?.footer?.isVisible && (
          <View style={styles.textContainerBottom}>
            <Text style={jsonVariable?.carousal?.data[index]?.footer?.style}>
              {jsonVariable?.carousal?.data[index]?.footer?.text}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {jsonVariable?.carousal?.data.map((item, index) => (
        <View
          key={`${item.id}-${index}-dot`}
          style={[styles.dot, activeIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );

  if (jsonVariable === null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text> </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.crossButtonContainer}
        activeOpacity={0.7}
        onPress={navigateToRoot}
      >
        <View style={styles.crossButton}>
          <Text style={styles.crossButtonText}>✕</Text>
        </View>
      </TouchableOpacity>
      {jsonVariable?.carousal && (
        <View style={styles.carouselContainer}>
          <FlatList
            ref={scrollRef}
            data={jsonVariable.carousal.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(newIndex);
            }}
            style={styles.flatList}
          />
          {renderDots()}
          <TouchableOpacity
            style={styles.switchButtonContainer}
            activeOpacity={0.7}
            onPress={handleContinuePress}
          >
            <View style={styles.switchButton}>
              <Text style={styles.switchButtonText}>Switch</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {jsonVariable?.authOptions && (
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Log in or Sign up</Text>

          <View style={styles.phoneInputContainer}>
            {jsonVariable.authOptions.default === 'email' ? (
              <TextInput
                style={styles.phoneInput}
                placeholder={jsonVariable.authOptions.email.text.placeholder}
                placeholderTextColor="#999"
                keyboardType={jsonVariable.authOptions.email.keyboardType}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCapitalize="none"
              />
            ) : (
              <>
                <TouchableOpacity style={styles.countryCodeContainer}>
                  <Text style={styles.countryCodeText}>{phoneCode}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder={jsonVariable.authOptions.phoneNumber.text.placeholder}
                  placeholderTextColor="#999"
                  keyboardType={jsonVariable.authOptions.phoneNumber.keyboardType}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </>
            )}
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.continueButton}>
              <Text style={[styles.continueButtonText, jsonVariable.cta.style]}>
                {jsonVariable.cta.title}
              </Text>
            </View>
          </TouchableOpacity>

          {jsonVariable.skipButton && jsonVariable.skipButton.isVisible && (
            <View style={styles.skipButtonContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={jsonVariable.skipButton.style}>{jsonVariable.skipButton.title}</Text>
              </TouchableOpacity>
            </View>
          )}

          {jsonVariable.authOptions.socialAuthEnable && (
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>
          )}

          {jsonVariable.authOptions.socialAuthEnable && (
            <View style={styles.socialContainer}>
              {jsonVariable.authOptions.socialMedia.providers
                .filter((provider) => provider.isVisible)
                .map((item, index) => (
                  <TouchableOpacity key={item.id} style={styles.buttonSocial}>
                    <Image
                      key={index + 'sm'}
                      resizeMode="contain"
                      source={{ uri: item.imageUrl }}
                      style={jsonVariable.authOptions.socialMedia.style}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      )}

      <BottomModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        title="Switch"
        options={modalOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  crossButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.12,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.12,
  },
  textContainerTop: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textContainerBottom: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  phoneInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 26,
    paddingVertical: 12,
    alignItems: 'center',
    height: 52,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonSocial: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#959595',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 3,
  },
  skipButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1,
  },
  topButtonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: 'red',
  },
  switchButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 2,
  },
  switchButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Welcome;
