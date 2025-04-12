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

import React, { useState, useRef, useEffect } from 'react';
import VWOProvider from './vwoHelper/components/VWOProvider';
import UserInput from './components/UserInput';
import ResultDisplay from './components/ResultDisplay';
import Modal from './components/Modal';
import { logs } from './config/vwo.config';
import './App.css';

function App() {
  // State management
  const [userId, setUserId] = useState('');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>('');
  const [showFeatureFlag, setShowFeatureFlag] = useState(false);
  const [showTrackEvent, setShowTrackEvent] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Event handlers
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUserId(value);
    setQuery(value ? 'How do I reset my password?' : '');
    setShowFeatureFlag(false);
    setShowTrackEvent(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const assignRandomUserId = () => {
    const randomId = 'user_' + Math.random().toString(36).substring(2, 8);
    setUserId(randomId);
    setQuery('How do I reset my password?');
    setShowFeatureFlag(false);
    setShowTrackEvent(false);
  };

  const handleSendRequest = () => {
    if (!userId) {
      alert('Please enter a User ID');
      return;
    }
    setShowFeatureFlag(true);
    setTimeout(() => {
      setShowTrackEvent(true);
    }, 100);
  };

  // Modal handlers
  const formatLogs = () => {
    return logs.map((log, index) => (
      <div key={index}>
        [<span className={`log-level-${log.level.toLowerCase()}`}>{log.level.toUpperCase()}</span>]:
        VWO-SDK {new Date().toISOString()} {log.message}
      </div>
    ));
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
    if (type === 'logs') {
      setModalContent(<div className="logs-container">{formatLogs()}</div>);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  // Effects
  useEffect(() => {
    if (showModal && modalType === 'logs' && modalContentRef.current) {
      modalContentRef.current.scrollTo({
        top: modalContentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [showModal, modalType, modalContent]);

  return (
    <VWOProvider>
      <div className="container">
        <h1>Smart Bot</h1>

        <UserInput
          userId={userId}
          query={query}
          onUserIdChange={handleUserIdChange}
          onQueryChange={handleQueryChange}
          onAssignRandomId={assignRandomUserId}
          onSendRequest={handleSendRequest}
        />

        <ResultDisplay
          showFeatureFlag={showFeatureFlag}
          showTrackEvent={showTrackEvent}
          userId={userId}
        />

        <div className={`links ${showFeatureFlag ? 'visible' : ''}`}>
          <a onClick={() => openModal('settings')}>Show Flag(s) Settings</a>
          <a onClick={() => openModal('logs')}>Show VWO SDK Logs</a>
        </div>
      </div>

      <Modal
        showModal={showModal}
        modalType={modalType}
        modalContent={modalContent}
        onClose={closeModal}
        modalContentRef={modalContentRef}
      />
    </VWOProvider>
  );
}

export default App;
