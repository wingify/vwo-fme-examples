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

interface UserInputProps {
  userId: string;
  query: string;
  onUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAssignRandomId: () => void;
  onSendRequest: () => void;
}

/**
 * UserInput Component
 * Handles user ID and query input fields
 */
const UserInput: React.FC<UserInputProps> = ({
  userId,
  query,
  onUserIdChange,
  onQueryChange,
  onAssignRandomId,
  onSendRequest,
}) => {
  return (
    <>
      <h3>Enter User ID</h3>
      <div className="input-container">
        <input
          type="text"
          value={userId}
          onChange={onUserIdChange}
          placeholder="Enter User ID(eg: hello@vwo.com) to see the response"
        />
        <a href="#" onClick={onAssignRandomId} className="assign-link">
          Assign Random ID
        </a>
      </div>
      <h3>Search a Query</h3>
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Enter your query"
          disabled={!userId}
        />
        <button onClick={onSendRequest} disabled={!userId}>
          Send
        </button>
      </div>
    </>
  );
};

export default UserInput;
