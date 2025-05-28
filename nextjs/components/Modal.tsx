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
import styles from '../styles/Home.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, header, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className={styles.closeBtn} aria-label="Close modal" onClick={onClose}>
          X
        </button>
        <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
        {header && <div id="model-header">{header}</div>}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  );
};

export default Modal; 