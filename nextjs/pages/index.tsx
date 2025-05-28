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
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import config from '../config/vwo-config';
import { init, IVWOClient, IVWOOptions } from 'vwo-fme-node-sdk';
import Modal from '../components/Modal';
import SearchForm from '../components/SearchForm';
import ResponseDisplay from '../components/ResponseDisplay';

interface VWOLog {
  level: string;
  message: string;
  timestamp: string;
}

interface FlagVariable {
  content?: string;
  background?: string;
}

const Home: NextPage = () => {
  const [vwoClient, setVwoClient] = useState<IVWOClient | null>(null);
  const [vwoLogs, setVwoLogs] = useState<VWOLog[]>([]);
  const [cachedSettings, setCachedSettings] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  const [sendEnabled, setSendEnabled] = useState(false);
  const [responseHtml, setResponseHtml] = useState('');
  const [responseBgColor, setResponseBgColor] = useState('#fff');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalHeader, setModalHeader] = useState<React.ReactNode>(null);
  const [viewRawSettings, setViewRawSettings] = useState(false);
  const scriptLoaded = useRef(false);

  // Initialize SDK
  const initializeSDK = async () => {
    if (scriptLoaded.current) return;
    
    let logs: VWOLog[] = [];
    const addLog = (level: string, message: string) => {
      const timestamp = new Date().toISOString();
      logs.push({ level, message, timestamp });
      setVwoLogs([...logs]);
    };

    try {
      const client = await init({
        accountId: config.vwo.accountId,
        sdkKey: config.vwo.sdkKey,
        logger: {
          level: config.vwo.logLevel,
          transport: {
            log: (level: string, message: string) => {
              console.log(`[${level}] ${message}`);
              addLog(level, message);
            }
          },
        },
      });
      setVwoClient(client);
      scriptLoaded.current = true;
      addLog('info', 'VWO SDK initialized successfully');
    } catch (e: any) {
      console.error('SDK initialization error:', e);
      addLog('error', `Failed to initialize VWO SDK: ${e.message}`);
      alert('Failed to initialize VWO SDK: ' + e.message);
    }
  };

  useEffect(() => {
    // Wait for environment variables to be available
    const checkAndInitialize = () => {
      if (typeof window !== 'undefined' && !scriptLoaded.current && config.vwo.accountId) {
        initializeSDK();
      } else if (!config.vwo.accountId) {
        // If environment variables are not loaded yet, retry after a short delay
        setTimeout(checkAndInitialize, 100);
      }
    };

    checkAndInitialize();
  }, []);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value.trim();
    setUserId(newUserId);
    if (newUserId === '') {
      setSendEnabled(false);
      setInputQuery('');
      setResponseHtml('');
    } else {
      setSendEnabled(true);
      setInputQuery('How do I reset my password?');
    }
  };

  const sendRequest = async () => {
    if (!vwoClient) {
      alert('VWO SDK not initialized');
      return;
    }
    if (userId.trim() === '') {
      alert('Please enter a User ID');
      return;
    }

    try {
      const userContext = {
        id: userId.trim(),
        customVariables: config.vwo.customVariables,
      };
      const flag = await vwoClient.getFlag(config.vwo.flagKey, userContext);
      const isEnabled = flag.isEnabled();
      const variables = flag.getVariables();
      const settings = vwoClient.originalSettings;
      await vwoClient.trackEvent(config.vwo.eventName, userContext);

      setCachedSettings(settings);

      const defaultContent =
        'To reset your password:\n1. Open the app and go to the login screen.\n2. Tap "Forgot Password?" below the password field.\n3. Enter your registered email address and submit.\n4. Check your inbox for a password reset email (it may take a few minutes).\n5. Click the link in the email and follow the instructions to create a new password.\n6. Return to the app and log in with your new password.';

      const contentVariable = flag.getVariable(config.vwo.variableKey2, {}) as FlagVariable;
      const content = contentVariable?.content || defaultContent;
      const backgroundColor = contentVariable?.background || '#fff';

      setResponseBgColor(backgroundColor);

      setResponseHtml(`
        <div class="${styles.resultFooter}">
          Response generated by <i><strong>${flag.getVariable(config.vwo.variableKey1, 'GPT-4')}</strong></i>
          <span style="float: right;">
            Feature: <span style="color: ${isEnabled ? '#4CAF50' : '#FF6B6B'};">
              <strong>${isEnabled ? 'Enabled' : 'Disabled'}</strong>
            </span> for user: <i>${userId.trim()}</i>
          </span>
        </div>
        <div class="${styles.responseWrapper}"><pre>${content}</pre></div>
      `);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch response. Please try again.');
    }
  };

  const assignRandomUserId = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const randomId = 'user_' + Math.random().toString(36).substring(2, 8);
    setUserId(randomId);
    setSendEnabled(true);
    setInputQuery('How do I reset my password?');
  };

  const renderSettingsContent = () => {
    if (!cachedSettings) return;

    if (!viewRawSettings) {
      const simplifiedData = cachedSettings.campaigns?.map((campaign: any) => ({
        name: campaign.name,
        status: campaign.status,
        variationsCount: campaign.variations.length,
        variations: campaign.variations.map((variation: any) => ({
          name: variation.name,
          weight: variation.weight,
          variables: variation.variables.map((variable: any) => ({
            key: variable.key,
            value: variable.value,
            isDefault: variation.name.toLowerCase().includes('default'),
          })),
        })),
      })) || [];

      return (
        <div>
          {simplifiedData.map((test: any, i: number) => (
            <div key={i} className={styles.testContainer}>
              <h3>
                {test.name} (<span className={test.status === 'RUNNING' ? styles.statusRunning : ''}>{test.status}</span>, Variations: {test.variationsCount})
              </h3>
              {test.variations.map((variation: any, j: number) => (
                <div key={j} className={styles.variation}>
                  <strong>Variation: {variation.name} (Weight: {variation.weight}%)</strong>
                  <ul>
                    {variation.variables.map((variable: any, k: number) => (
                      <li key={k}>
                        <strong>Variable:</strong> {variable.key} - {JSON.stringify(variable.value)} {variable.isDefault ? ' (Default)' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      const prettyJson = JSON.stringify(cachedSettings, null, 4)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
        .replace(/"([^"]+)"(?=,|\n|\s*\}|\s*\])/g, '<span class="json-string">"$1"</span>')
        .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="json-number">$1</span>');

      return (
        <div style={{ position: 'relative' }}>
          <button
            className={styles.copyBtn}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(cachedSettings, null, 2)).then(() => {
                alert('Copied to clipboard!');
              });
            }}
          >
            📋 Copy
          </button>
          <pre
            className={styles.modalContent}
            dangerouslySetInnerHTML={{ __html: prettyJson }}
          />
        </div>
      );
    }
  };

  const renderLogsContent = () => {
    return (
      <div className={styles.modalContent}>
        <div style={{ whiteSpace: 'pre-wrap', maxHeight: 400, overflowY: 'auto' }}>
          {vwoLogs.map((log, index) => (
            <div key={index} style={{ marginBottom: '8px', padding: '4px' }}>
              <span className={`${styles[`logLevel${log.level.charAt(0).toUpperCase() + log.level.slice(1)}`]}`}>
                [{log.level.toUpperCase()}]
              </span>{' '}
              {log.timestamp} {log.message}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const openModal = (modalId: string) => {
    setViewRawSettings(false);
    if (modalId === 'one' && cachedSettings) {
      setModalTitle('VWO Flags Settings');
      setModalHeader(
        <div className={styles.toggleSwitch}>
          <input
            type="checkbox"
            id="toggleSwitch"
            checked={viewRawSettings}
            onChange={() => setViewRawSettings((v) => !v)}
          />
          <label htmlFor="toggleSwitch" style={{ cursor: 'pointer', marginLeft: 8 }}>
            View Raw Settings
          </label>
        </div>
      );
      setModalContent(renderSettingsContent());
      setModalOpen(true);
    } else if (modalId === 'two' && vwoLogs.length > 0) {
      setModalTitle('VWO SDK Logs');
      setModalHeader(null);
      setModalContent(renderLogsContent());
      setModalOpen(true);
    } else {
      setModalTitle('Error');
      setModalHeader(null);
      setModalContent('Error showing VWO Flags configuration. Please check the SDK logs for more details.');
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.container} style={{ '--response-bg': responseBgColor } as React.CSSProperties}>
      <h1 className={styles.title}>Smart Bot</h1>
      
      <SearchForm
        userId={userId}
        inputQuery={inputQuery}
        sendEnabled={sendEnabled}
        onUserIdChange={handleUserIdChange}
        onAssignRandomId={assignRandomUserId}
        onSendRequest={sendRequest}
      />

      <ResponseDisplay
        responseHtml={responseHtml}
        onShowSettings={() => openModal('one')}
        onShowLogs={() => openModal('two')}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        header={modalHeader}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Home; 