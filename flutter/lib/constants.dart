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
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppConstants {
  // Initialize (call this in main() before runApp)
  static Future<void> initialize() async {
    try {
      await dotenv.load(fileName: ".env");

      // Verify required variables are loaded
      if (dotenv.env['FME_ACCOUNT_ID'] == null ||
          dotenv.env['FME_SDK_KEY'] == null) {
        throw Exception("Missing required environment variables");
      }
    } catch (e) {
      throw Exception(
          "Failed to load .env file. "
              "Please ensure:\n"
              "1. The file exists at the project root\n"
              "2. It contains FME_ACCOUNT_ID and FME_SDK_KEY\n"
              "3. The file is properly formatted (KEY=VALUE)\n"
              "Error details: $e"
      );
    }
  }

  // Feature Flag Constants
  static int get fmeAccountId => int.parse(dotenv.env['FME_ACCOUNT_ID']!);

  static String get fmeSdkKey => dotenv.env['FME_SDK_KEY']!;

  static String get flagName => dotenv.env['FLAG_NAME']!;

  static String get eventName => dotenv.env['EVENT_NAME']!;

  // Variable Keys
  static String get variable1Key => dotenv.env['VARIABLE_1_KEY']!;

  static String get variable2Key => dotenv.env['VARIABLE_2_KEY']!;

  static String get variable2Content => dotenv.env['VARIABLE_2_CONTENT']!;

  static String get variable2Bg => dotenv.env['VARIABLE_2_BG']!;

  // Configuration
  static int get maxLogMessages => int.parse(dotenv.env['MAX_LOG_MESSAGES']!);
}
