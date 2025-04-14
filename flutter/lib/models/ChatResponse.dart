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

import 'ResponseStatus.dart';

class ChatResponse {
  final String query;
  final String model;
  final String background;
  final String content;
  final bool isEnabled;
  final ResponseStatus status;

  ChatResponse({
    required this.query,
    required this.model,
    required this.background,
    required this.content,
    required this.isEnabled,
    required this.status,
  });

  /// Loading state factory
  factory ChatResponse.loading(String query) {
    return ChatResponse(
      query: query,
      model: "", // Model unknown during loading
      background: "", // Background info unknown
      content: "Processing your query...", // Loading message
      isEnabled: false, // Status unknown
      status: ResponseStatus.loading, // Set status explicitly
    );
  }

  /// Error state factory
  factory ChatResponse.error(String query, String errorMessage) {
    return ChatResponse(
      query: query,
      model: "System", // Indicate system generated error message
      background: "", // No specific background for generic error
      content: errorMessage, // The error message
      isEnabled: false, // Feature likely failed
      status: ResponseStatus.error, // Set status explicitly
    );
  }

  @override
  String toString() => 'ChatResponse(query: $query, model: $model, background: $background, content: $content, isEnabled: $isEnabled, status: $status)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
          other is ChatResponse &&
              runtimeType == other.runtimeType &&
              query == other.query &&
              model == other.model &&
              background == other.background &&
              content == other.content &&
              isEnabled == other.isEnabled &&
              status == other.status;

  @override
  int get hashCode =>
      query.hashCode ^
      model.hashCode ^
      background.hashCode ^
      content.hashCode ^
      isEnabled.hashCode ^
      status.hashCode;
}