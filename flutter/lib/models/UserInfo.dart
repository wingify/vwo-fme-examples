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
class UserInfo {
  final String userId;
  final String query;

  UserInfo({required this.userId, required this.query});

  @override
  String toString() => 'UserInfo(userId: $userId, query: $query)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
          other is UserInfo &&
              runtimeType == other.runtimeType &&
              userId == other.userId &&
              query == other.query;

  @override
  int get hashCode => userId.hashCode ^ query.hashCode;
}