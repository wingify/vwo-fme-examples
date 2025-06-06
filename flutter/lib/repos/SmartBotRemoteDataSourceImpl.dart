/*
 * Copyright (c) 2025 Wingify Software Pvt. Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_user_context.dart';
import 'package:vwo_fme_flutter_sdk_example/constants.dart';
import 'package:vwo_fme_flutter_sdk_example/models/ResponseStatus.dart';

import '../fme/fme_service.dart';
import '../models/ChatResponse.dart';
import 'ISmartBotRemoteDataSource.dart';

class SmartBotRemoteDataSourceImpl implements ISmartBotRemoteDataSource {

  final String defaultResponse = """To reset your password:  
1. Open the app and go to the login screen.  
2. Tap 'Forgot Password?' below the password field.  
3. Enter your registered email address and submit.  
4. Check your inbox for a password reset email (it may take a few minutes).  
5. Click the link in the email and follow the instructions to create a new password.  
6. Return to the app and log in with your new password.""";

  @override
  Future<ChatResponse?> sendChatQuery(String userId, String query) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    final userContext = FmeService().getUserContext(userId);
    if (userContext == null) return null;

    final featureFlag =
        await FmeService().getFlag(AppConstants.flagName, userContext);

    if (featureFlag?.isEnabled() != true) {
      return ChatResponse(
        query: query,
        model: "",
        background: "#ffffff",
        content: defaultResponse,
        isEnabled: false,
        status: ResponseStatus.error,
      );
    }

    final model = featureFlag?.getVariable(AppConstants.variable1Key, "GPT-4")
            as String? ??
        "";

    final json = featureFlag?.getVariable(
          AppConstants.variable2Key,
          <Object?, Object?>{},
        ) as Map<Object?, Object?>? ??
        {};

    final content = json[AppConstants.variable2Content] as String? ?? "";
    final background = json[AppConstants.variable2Bg] as String? ?? "#ffffff";

    return ChatResponse(
      query: query,
      model: model,
      background: background,
      content: content,
      isEnabled: true,
      status: ResponseStatus.success,
    );
  }

  @override
  Future<void> sendEvent(String userId) async {
    final userContext = VWOUserContext(id: userId);
    FmeService().track(AppConstants.eventName, userContext);
  }
}
