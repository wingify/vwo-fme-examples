# 🤖 Smart Bot with VWO FME Integration

> A simple example mobile application showcasing VWO Feature Management and Experimentation (React Native SDK) integration, enabling dynamic feature flags and user interaction tracking.

## ✨ Example App Features

- 🎯 User ID-based feature flag evaluation
- 🚦 Feature flag status checking
- 🔄 Real-time settings visualization
- 📊 SDK log monitoring
- 🌐 Interactive web interface
- 📈 Event tracking capabilities
- 🎨 User attributes management

## 🚀 Prerequisites

Before you begin, ensure you have:

- Xcode
- FME product enabled for your VWO account

## 💻 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/wingify/vwo-fme-examples.git
    cd vwo-fme-examples/ios
    ```

2. Open file `iOSFmeExample.xcodeproj` in Xcode

3. Add `Config.xcconfig` file and adding below environment variables in project at root level.

    ```bash
    VWO_ACCOUNT_ID = vwo_account_id
    VWO_SDK_KEY = vwo_sdk_key
    VWO_FLAG_KEY = vwo_flag_key
    VWO_FLAG_VARIABLE_1_KEY = vwo_flag_variable_key_1
    VWO_FLAG_VARIABLE_2_KEY = vwo_flag_variable_key_2
    VWO_EVENT_NAME = vwo_event_name
    ```

## 🔧 Usage

### Client Setup

🎨 Transform your application with VWO's powerful Feature Flags and Experimentation! This example showcases an intelligent way to:

✨ **Dynamic AI Model Switching**

- Seamlessly switch between different LLM models from AI companies.
- Customise and test your experience in real-time based on user context

🎯 **Smart Content Management**

- Fine-tune response content through intuitive flag variables
- Control UI elements with precision
- Personalize user experiences on the fly

🧪 **Experimentation Made Easy**

- Run sophisticated A/B tests combining different AI models
- Test various UI combinations effortlessly
- Measure and optimize performance in real-time

### Steps to Implement

1. **Create a Feature Flag in VWO FME:**
   - **Name:** `FME Example Smart Bot`
   - **Variables:**
     - `model_name` with default value `GPT-4`
     - `query_answer` with default value `{"background":"#e6f3ff","content":"Content 1"}`

     - <img src="./screenshots/variables.png" width="600" alt="VWO FME Variables Configuration">


2. **Create Variations:**
   - **Variation 1:**
     - `model_name`: `Claude 2`
     - `query_answer`: `{"background":"#e6ffe6","content":"Content 2"}`
   - **Variation 2:**
     - `model_name`: `Gemini Pro`
     - `query_answer`: `{"background": "#fffff0", "content": "Content 3"}`
   - **Variation 3:**
     - `model_name`: `LLaMA 2`
     - `query_answer`: `{"background": "#ffe6cc", "content": "Content 4"}`

     - <img src="./screenshots/variations.png" width="600" alt="VWO FME Variations Configuration">

3. **Create a Rollout and Testing Rule:**
   - Set up the feature flag with the above variations.

4. **Configure Your iOS App:**
   - Add all the config details in `Config.xcconfig` file.

    ```bash
    VWO_ACCOUNT_ID = vwo_account_id
    VWO_SDK_KEY = vwo_sdk_key
    VWO_FLAG_KEY = vwo_flag_key
    VWO_FLAG_VARIABLE_1_KEY = vwo_flag_variable_key_1
    VWO_FLAG_VARIABLE_2_KEY = vwo_flag_variable_key_2
    VWO_EVENT_NAME = vwo_event_name
    ```

5. **Run the App in Xcode:**
   - Use the Simulator to test the app.

6. **Interact with the App:**
   - Enter a unique `user ID` (or assign a random `user ID`) and tap the `send` button to see the feature flag in action.
   - Observe the query response and model name change based on the feature flag variation.

       - <img src="./screenshots/input.png" style="width: 200px; height: auto;" alt="VWO FME iOS SDK Example">

    - You will see that the query response and model name is changed based on the feature flag variation.
        - <img src="./screenshots/result.png" style="width: 200px; height: auto;" alt="VWO FME iOS SDK Example">

    - You can also check the SDK logs using the `Show SDK Logs` buttons.
        - <img src="./screenshots/logs.png" style="width: 200px; height: auto;" alt="VWO FME iOS SDK Example">

7. **Check SDK Logs:**
   - Use the `Show SDK Logs` button to view SDK logs.

### Screenshots

<img src="./screenshots/ios-default-model.png" style="width: 200px; height: auto;" alt="VWO FME React Native SDK Example"> <img src="./screenshots/ios-model1.png" style="width: 200px; height: auto;" alt="VWO FME React Native SDK Example"> <img src="./screenshots/ios-model2.png" style="width: 200px; height: auto;" alt="VWO FME React Native SDK Example"> <img src="./screenshots/ios-model3.png" style="width: 200px; height: auto;" alt="VWO FME React Native SDK Example"> <img src="./screenshots/ios-model4.png" style="width: 200px; height: auto;" alt="VWO FME React Native SDK Example">
