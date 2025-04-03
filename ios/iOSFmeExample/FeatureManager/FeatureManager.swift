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
import VWO_FME

class FeatureManager: LogTransport, IntegrationCallback {
    
    static let shared = FeatureManager()
    var logsSdk: [String] = []
    
    private init() {}
    
    func initSDK(completion: @escaping (Bool) -> Void) {
        
        self.resetForInit()
        
        let SDK_KEY = SdkEnvironment.sdkKey
        let ACCOUNT_ID = SdkEnvironment.accountID
        
        let options = VWOInitOptions(sdkKey: SDK_KEY,
                                     accountId: ACCOUNT_ID,
                                     logLevel: .debug,
                                     integrations: self,
                                     logTransport: self)
        
        VWOFme.initialize(options: options) { result in
            switch result {
            case .success(let message):
                print("VWO Initialized: \(message)")
                completion(true)
                
            case .failure(let error):
                print("VWO Initialization Failed: \(error)")
                completion(false)
                
            }
        }
    }
    
    func getFeatureFlag(feature: String, userId: String, customVariables: [String: Any] = [:], completion: @escaping (GetFlag) -> Void) {
        if !VWOFme.isInitialized {
            print("Initialize VWO SDK first")
            return
        }
        let userContext = VWOContext(id: userId, customVariables: customVariables)
        VWOFme.getFlag(featureKey: feature, context: userContext) { featureFlagObj in
            completion(featureFlagObj)
        }
    }
    
    func isFeatureEnabled(feature: GetFlag) -> Bool {
        return feature.isEnabled()
    }
    
    func getAllVariablesFromFlag(featureFlag: GetFlag) -> [[String: Any]] {
        return featureFlag.getVariables()
    }
    
    func getVariableValueFromFlag(featureFlag: GetFlag, variableKey: String, defaultValue: Any) -> Any {
        return featureFlag.getVariable(key: variableKey, defaultValue: defaultValue)
    }
    
    func trackEvent(eventName: String, userId: String, eventProperties: [String: Any] = [:], customVariables: [String: Any] = [:]) {
        if !VWOFme.isInitialized {
            print("Initialize VWO SDK first")
            return
        }
        let userContext = VWOContext(id: userId, customVariables: customVariables)
        VWOFme.trackEvent(eventName: eventName, context: userContext, eventProperties: eventProperties)
    }
    
    func setAttribute(attributes: [String: Any], userId: String) {
        if !VWOFme.isInitialized {
            print("Initialize VWO SDK first")
            return
        }
        let userContext = VWOContext(id: userId, customVariables: [:])
        VWOFme.setAttribute(attributes: attributes, context: userContext)
    }
    
        
    // integration callback
    func execute(_ properties: [String : Any]) {

        // send properties from getFlag or trackEvent to third party here if needed
    }
    
    // log transport
    func log(logType: String, message: String) {
        let time = Date().formatted(date: .numeric, time: .standard)
        let message = message
        let logMessage = "\(time) \n\(message)"
#if DEBUG
        print(logMessage)
#endif
        self.logsSdk.append(logMessage)
        
        // send logs to third party here if needed
    }
    
    func flushLogs() -> [String] {
        return self.logsSdk
    }
    
    func resetForInit() {
        self.logsSdk.removeAll()
    }
}

