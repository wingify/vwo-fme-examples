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

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/get_flag.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_context.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';

import '../constants.dart';
import 'dart_logger.dart';

class FmeService {

  // Singleton instance
  static final FmeService _instance = FmeService._internal();
  factory FmeService() => _instance;
  FmeService._internal();

  static dynamic _vwoInstance;
  final String _tag = "Vwo-Fme";

  Future<Object> init() async {
    if (_vwoInstance != null) {
      debugPrint("$_tag: VWO already initialized");
      return true;
    }

    try {
      // Create a list of transports
      var transport = <String, dynamic>{};
      transport["defaultTransport"] = DartLogger();

      var logger = <Map<String, dynamic>>[];
      logger.add(transport);

      var initOptions = VWOInitOptions(
          accountId: AppConstants.fmeAccountId,
          sdkKey: AppConstants.fmeSdkKey,
          logger: {"level": "TRACE", "transports": logger},
          integrationCallback: (Map<String, dynamic> properties) {
            print('VWO: Integration callback received: $properties');
          });

      _vwoInstance = await VWO.init(initOptions);

      if (_vwoInstance == null) {
        debugPrint("$_tag: FME init failed!");
        return false;
      } else {
        debugPrint("$_tag: FME init successful!");
        return true;
      }
    } catch (e) {
      debugPrint("$_tag: FME init failed: $e");
      return false;
    }
  }

  void track(String eventName, dynamic userContext) {
    try {
      _vwoInstance.trackEvent(
        eventName: eventName,
        vwoContext: userContext,
      );
    } catch (e) {
      debugPrint("Error tracking event: $e");
    }
  }

  void trackWithProperties(String eventName, Map<String, dynamic> properties, String userId) {
    try {
      final userContext = getUserContext(userId);
      if (userContext != null) {
        _vwoInstance.trackEvent(
          eventName: eventName,
          vwoContext: userContext,
          eventProperties: properties
        );
      }
    } catch (e) {
      debugPrint("Error tracking event with properties: $e");
    }
  }

  VWOContext? getUserContext(String userId) {
    return VWOContext(
      userId: userId,
    );
  }

  Future<GetFlag?> getFlag(String flagName, dynamic userContext) async {
    try {
      return await _vwoInstance.getFlag(flagName: flagName, vwoContext: userContext);
    } catch (e) {
      debugPrint("$_tag: getFlag error: $e");
      return null;
    }
  }

  void setAttribute(Map<String, dynamic> attributes, dynamic context) {
    try {
      _vwoInstance.setAttribute(attributes: attributes, vwoContext: context);
    } catch (e) {
      debugPrint("Error setting attribute: $e");
    }
  }
}