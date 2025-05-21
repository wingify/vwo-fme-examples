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
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

interface ModalOption {
  label: string;
  onPress: () => void;
}

interface BottomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  options: ModalOption[];
}

const BottomModal: React.FC<BottomModalProps> = ({ isVisible, onClose, title, options }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.modalOption} onPress={onClose}>
                <Text style={styles.modalTitle}>✕</Text>
              </TouchableOpacity>
            </View>
            {options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.modalOption} onPress={option.onPress}>
                <View style={styles.itemContainer}>
                  <Text style={styles.modalOptionText}>{option.label}</Text>
                  <Text style={styles.optionIcon}>{'>'}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
  },
  itemContainer: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 20,
    color: 'black',
    opacity: 0.4,
  },
});

export default BottomModal;
