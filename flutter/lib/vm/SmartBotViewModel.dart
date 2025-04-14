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
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:vwo_fme_flutter_sdk_example/fme/fme_service.dart';

import '../models/ChatResponse.dart';
import '../models/UserInfo.dart';
import '../usecases/ISendChatQueryUseCase.dart';

class SmartBotViewModel with ChangeNotifier {
  final ISendChatQueryUseCase chatQueryUseCase;

  UserInfo? _userInfo;
  UserInfo? get userInfo => _userInfo;

  ChatResponse? _chatResponse;
  ChatResponse? get chatResponse => _chatResponse;

  SmartBotViewModel(this.chatQueryUseCase);

  Future<void> init(BuildContext context) async {
    await loadInitialData();
    await initFme();
  }

  Future<void> loadInitialData() async {
    _userInfo = UserInfo(userId: "", query: "");
    notifyListeners();
  }

  Future<void> sendQuery(String userId, String query) async {
    await processUserQuery(userId, query);
  }

  Future<void> getUserId() async {
    _userInfo = UserInfo(userId: _generateRandomUserId(), query: _generateRandomQuery());
    notifyListeners();
  }

  setUserId(String userId) async {
    _userInfo = UserInfo(userId: userId, query: _generateRandomQuery());
    notifyListeners();
  }

  String _generateRandomUserId() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return List.generate(12, (index) => letters[Random().nextInt(letters.length)]).join();
  }

  String _generateRandomQuery() {
    return 'I forgot my password';
  }

  Future<void> initFme() async {
    FmeService().init();
  }

  Future<void> processUserQuery(String userId, String query) async {
    final response = await chatQueryUseCase.getChatResponse(userId, query);
    if (response != null) {
      _chatResponse = response;
      notifyListeners();
    }
  }

  Future<void> sendEvent(String userId) async {
    await chatQueryUseCase.sendEvent(userId);
  }

  String getFlagStatus() {
    return chatResponse?.isEnabled == true ? "Enabled" : "Disabled";
  }
}