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

interface SearchFormProps {
  userId: string;
  inputQuery: string;
  sendEnabled: boolean;
  onUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAssignRandomId: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSendRequest: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  userId,
  inputQuery,
  sendEnabled,
  onUserIdChange,
  onAssignRandomId,
  onSendRequest,
}) => {
  return (
    <>
      <h3 className={styles.subtitle}>Enter User ID</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="userIdField"
          className={styles.input}
          placeholder="Enter User ID(eg: hello@vwo.com) to see the response"
          value={userId}
          onChange={onUserIdChange}
        />
        <a href="#" onClick={onAssignRandomId} className={styles.assignLink}>
          Assign Random ID
        </a>
      </div>
      <h3 className={styles.subtitle}>Search a Query</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="inputField"
          className={styles.input}
          placeholder="Enter your query"
          disabled
          value={inputQuery}
          readOnly
        />
        <button
          id="sendButton"
          className={styles.button}
          onClick={onSendRequest}
          disabled={!sendEnabled}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default SearchForm; 