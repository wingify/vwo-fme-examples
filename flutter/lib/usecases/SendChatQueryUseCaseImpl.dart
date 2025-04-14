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
import '../models/ChatResponse.dart';
import '../repos/ISmartBotRepository.dart';
import 'ISendChatQueryUseCase.dart';

class SendChatQueryUseCaseImpl implements ISendChatQueryUseCase {

  final ISmartBotRepository repository;

  SendChatQueryUseCaseImpl(this.repository);

  @override
  Future<ChatResponse?> getChatResponse(String userId, String query) async {
    return await repository.sendChatQuery(userId, query);
  }

  @override
  Future<void> sendEvent(String userId) async {
    await repository.sendEvent(userId);
  }
}