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
import SettingsDisplay from '../vwoHelper/components/SettingsDisplay';

interface ModalProps {
  showModal: boolean;
  modalType: string;
  modalContent: React.ReactNode;
  onClose: () => void;
  modalContentRef: React.RefObject<HTMLDivElement>;
}

/**
 * Modal Component
 * Displays either VWO settings or logs in a modal dialog
 */
const Modal: React.FC<ModalProps> = ({
  showModal,
  modalType,
  modalContent,
  onClose,
  modalContentRef,
}) => {
  return (
    <>
      <div className="modal-overlay" style={{ display: showModal ? 'block' : 'none' }}></div>
      <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-header">
          <h2>{modalType === 'settings' ? 'VWO Flags Settings' : 'VWO SDK Logs'}</h2>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-content" ref={modalContentRef}>
          {showModal && modalType === 'settings' ? (
            <SettingsDisplay />
          ) : showModal ? (
            modalContent
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Modal;
