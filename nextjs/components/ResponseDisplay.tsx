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

interface ResponseDisplayProps {
  responseHtml: string;
  onShowSettings: () => void;
  onShowLogs: () => void;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  responseHtml,
  onShowSettings,
  onShowLogs,
}) => {
  if (!responseHtml) return null;

  return (
    <>
      <div
        id="responseContainer"
        className={styles.result}
        dangerouslySetInnerHTML={{ __html: responseHtml }}
      />
      <div className={styles.links} id="modalLinks">
        <a onClick={onShowSettings} className={styles.link}>Show Flag(s) Settings</a>
        <a onClick={onShowLogs} className={styles.link}>Show VWO SDK Logs</a>
      </div>
    </>
  );
};

export default ResponseDisplay; 