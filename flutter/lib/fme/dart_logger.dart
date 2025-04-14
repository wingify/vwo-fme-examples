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

import 'dart:io';

import 'package:vwo_fme_flutter_sdk/logger/log_transport.dart';
import 'package:flutter/foundation.dart';
import 'package:vwo_fme_flutter_sdk_example/constants.dart';

/// A log transport that uses Flutter's built-in `print` function for logging.
///
/// This class implements the [LogTransport] interface and provides a way to
/// log messages to the Flutter console. It formats the log messages with a
/// prefix "FME-Flutter:" and includes the log level.
class DartLogger implements LogTransport {
  // Singleton instance
  static final DartLogger _instance = DartLogger._internal();

  factory DartLogger() => _instance;

  DartLogger._internal();

  final List<String> _logMessages = [];
  final ValueNotifier<List<String>> logMessagesNotifier = ValueNotifier([]);
  static int maxLogMessages = AppConstants.maxLogMessages;

  @override
  void log(String level, String? message) {
    if (message == null) return;

    print("FME: $message");
    if (Platform.isIOS) {
      addLogMessage("${_getCurrentDateTimeFormatted()} $message");
    } else {
      addLogMessage("${_getCurrentDateTimeFormatted()} [$level] $message");
    }
  }

  void addLogMessage(String message) {
    _logMessages.add(message);
    if (_logMessages.length > maxLogMessages) {
      _logMessages.removeAt(0);
    }
    logMessagesNotifier.value = List.from(_logMessages);
  }

  String _getCurrentDateTimeFormatted() {
    final now = DateTime.now();
    return '${_twoDigits(now.day)}-${_twoDigits(now.month)}-${now.year} '
        '${_twoDigits(now.hour)}:${_twoDigits(now.minute)}:${_twoDigits(now.second)}';
  }

  String _twoDigits(int n) => n.toString().padLeft(2, '0');
}

enum LogLevel {
  verbose,
  debug,
  info,
  warning,
  error,
}