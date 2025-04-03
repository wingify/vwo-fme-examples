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

import Foundation

class ContentViewModel: ObservableObject {

    @Published var isFeatureEnabled: Bool = false
    @Published var featureModelName: String = ""
    @Published var featureBackground: String = ""
    @Published var featureContent: String = ""
    @Published var isLoading: Bool = true
    @Published var isInitialized: Bool = false
    @Published var userId: String = ""
    @Published var messageText: String = ""

    @Published var userQuries: [String] = []
    
    @Published var error: String? = nil
    @Published var isProcessingQuery: Bool = false
    
    // Initialize SDK and fetch feature flags
    func initializeAndFetchFeatureFlags() {

        isLoading = true
        error = nil
        
        // Initialize SDK
        FeatureManager.shared.initSDK() { success in
            if success {
                self.isInitialized = true
                self.isLoading = false
            } else {
                self.isLoading = false
                self.error = "SDK initialization failed"
            }
        }
    }
    
    // Fetch feature flags
    func fetchFeatureFlags() {
        guard isInitialized else {
            error = "SDK not initialized"
            isLoading = false
            return
        }
        
        isLoading = true
        error = nil
        
        FeatureManager.shared.getFeatureFlag(feature: Constants.FeatureFlags.fmeExampleSmartBot,
                                             userId: userId) { [weak self] flag in
            // Check if feature is enabled
            guard let self = self else {return}
            
            self.isFeatureEnabled = flag.isEnabled()

            if self.isFeatureEnabled {
                // Get model name variable
                if let modelName = flag.getVariable(key: Constants.FeatureFlags.variableKey1, defaultValue: "GPT-4") as? String {
                    self.featureModelName = modelName
                }
                
                // Get query answer variable (JSON)
                if let queryAnswer = flag.getVariable(key: Constants.FeatureFlags.variableKey2, defaultValue: [:]) as? [String: Any] {
                    if let background = queryAnswer["background"] as? String {
                        self.featureBackground = background
                    }
                    
                    if let content = queryAnswer["content"] as? String {
                        self.featureContent = content
                    }
                }
            }
            
            self.isLoading = false
        }
    }
    
    // Track user interaction with the model
    func trackModelInteraction(query: String, model: String, response: String) {
        guard isInitialized else {
            error = "Cannot track event: SDK not initialized"
            return
        }
        
        let properties: [String: Any] = [
            "model": model,
            "query": query,
            "response": response
        ]
        
        FeatureManager.shared.trackEvent(eventName: Constants.Events.aiModelInteracted,
                                         userId: userId, eventProperties: properties)
    }
    
    // Generate new userId and refresh feature flags
    func refreshFeatureFlags() {
        // Generate a new userId for testing different variations
        self.messageText = generateRandomQuery()
        userId = generateRandomUserId()
        fetchFeatureFlags()
    }
    
    // Simulate API call to get response
    func processUserQuery(query: String, completion: @escaping (String) -> Void) {
        isProcessingQuery = true
        
        // Simulate network delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            // In a real app, this would make an actual API call
            // Here we're just returning the content from the feature flag or default content
            
            self.fetchFeatureFlags()
            
            let response = self.isFeatureEnabled && !self.featureContent.isEmpty ?
            self.featureContent : "I'm sorry, I don't have a specific answer for that query."
            self.isProcessingQuery = false
            completion(response)
        }
    }
}
