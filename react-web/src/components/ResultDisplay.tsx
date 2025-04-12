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
import FeatureFlagComponent from '../vwoHelper/components/FeatureFlag';
import TrackEventComponent from '../vwoHelper/components/TrackEvent';

interface ResultDisplayProps {
  showFeatureFlag: boolean;
  showTrackEvent: boolean;
  userId: string;
}

/**
 * ResultDisplay Component
 * Handles the display of feature flag response and track event
 */
const ResultDisplay: React.FC<ResultDisplayProps> = ({
  showFeatureFlag,
  showTrackEvent,
  userId,
}) => {
  return (
    <div className="result">
      {showFeatureFlag ? (
        <FeatureFlagComponent userId={userId} />
      ) : (
        <div className="response-wrapper" style={{ backgroundColor: '#fff' }}>
          {/* Empty state */}
        </div>
      )}
      {showTrackEvent && <TrackEventComponent />}
    </div>
  );
};

export default ResultDisplay;
