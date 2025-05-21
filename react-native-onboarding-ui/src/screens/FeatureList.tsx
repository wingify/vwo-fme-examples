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

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RemoveSkipControl, PersonalizeControl, SignUpControl } from '../constants/VariationsJson';
import { Constants } from '../constants/Constant';

interface UseCase {
  id: string;
  title: string;
  featureKey: string;
  variableKey: string;
  controlUserId: string;
  variationUserId: string;
  customVariables: object;
  type: string;
  defaultVariable: object;
  options: object[];
}

const FeatureList = () => {
  const usecases: UseCase[] = [
    {
      id: '1',
      title: 'Remove Skip',
      featureKey: Constants.FeatureFlags.useCase1 || '',
      variableKey: Constants.Variable.key || '',
      controlUserId: Constants.Usecase1UserId.control,
      variationUserId: Constants.Usecase1UserId.variation,
      customVariables: {},
      type: 'rollout',
      defaultVariable: RemoveSkipControl,
      options: [
        {
          label: 'Feature Enabled',
          type: 'Variation',
        },
        {
          label: 'Feature Disabled',
          type: 'Control',
        },
      ],
    },
    {
      id: '2',
      title: 'New Sign up options',
      featureKey: Constants.FeatureFlags.useCase2 || '',
      variableKey: Constants.Variable.key || '',
      controlUserId: Constants.Usecase2UserId.control,
      variationUserId: Constants.Usecase2UserId.variation,
      customVariables: {},
      type: 'testing',
      defaultVariable: SignUpControl,
      options: [
        {
          label: 'Control',
          type: 'Control',
        },
        {
          label: 'Variation 1',
          type: 'Variation',
        },
      ],
    },
    {
      id: '3',
      title: 'Personalized content',
      featureKey: Constants.FeatureFlags.useCase3 || '',
      variableKey: Constants.Variable.key || '',
      controlUserId: Constants.Usecase3UserId.control,
      variationUserId: Constants.Usecase3UserId.variation,
      customVariables: { location: 'US' }, // customVariables added to show use case, IRL we can target via location pre segment option in VWO
      type: 'personalize',
      defaultVariable: PersonalizeControl,
      options: [
        {
          label: 'Control',
          type: 'Control',
        },
        {
          label: 'Experience 1',
          type: 'Variation',
        },
      ],
    },
  ];
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UseCase | null>(usecases[0]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const gotoWelcomeScreen = (item: UseCase) => {
    if (!selectedItem) {
      return;
    }
    hideModal();
    setTimeout(() => {
      navigation.navigate('Welcome', { featureItem: item, variationType: 'Control' });
    }, 100);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }: { item: UseCase }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => gotoWelcomeScreen(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.optionText}>{item.title}</Text>
        <Text style={styles.optionIcon}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (selectedItem === null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text> </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Use cases</Text>
      <FlatList
        data={usecases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#1A1A1A',
  },
  optionIcon: {
    fontSize: 20,
    color: '#666',
    opacity: 0.6,
  },
  separator: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 8,
  },
});

export default FeatureList;
