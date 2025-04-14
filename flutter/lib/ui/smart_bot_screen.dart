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
import 'package:flutter/material.dart';
import '../vm/SmartBotViewModel.dart';
import 'logs_screen.dart';

import 'package:provider/provider.dart';

class SmartBotScreen extends StatefulWidget {
  const SmartBotScreen({super.key});

  @override
  State<SmartBotScreen> createState() => _SmartBotScreenState();
}

class _SmartBotScreenState extends State<SmartBotScreen> {
  final _userIdController = TextEditingController();
  final _queryController = TextEditingController();
  final _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        context.read<SmartBotViewModel>().init(context);
      }
    });
  }

  @override
  void dispose() {
    _userIdController.dispose();
    _queryController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _sendQuery() {
    final userId = _userIdController.text;
    final query = _queryController.text;

    if (userId.isEmpty || query.isEmpty) {
      _showDialog(
          'Missing Information', 'Please enter both User ID and Query.');
      return;
    }
    var viewModel = context.read<SmartBotViewModel>();

    if (viewModel.userInfo?.userId != userId) viewModel.setUserId(userId);

    viewModel.sendQuery(userId, query);
    viewModel.sendEvent(userId);
    _focusNode.unfocus();
  }

  void _assignUser() async{
    var viewModel = context.read<SmartBotViewModel>();
    viewModel.getUserId();
    _userIdController.text = viewModel.userInfo?.userId ?? '';
    _queryController.text =  viewModel.userInfo?.query??'';
    _focusNode.unfocus();
  }

  void _showDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text('Smart Bot')),
      ),
      body: GestureDetector(
        onTap: () => _focusNode.unfocus(),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Consumer<SmartBotViewModel>(
            builder: (context, viewModel, child) {
              // Feature flag status will update whenever notifyListeners() is called
              // in the ViewModel after getFlag completes
              viewModel.getFlagStatus();

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // User ID Section
                  const Text('User id', style: TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _userIdController,
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Enter User ID',
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _assignUser,
                        child: const Text('Assign'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Query Section
                  const Text('Search a query', style: TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _queryController,
                          focusNode: _focusNode,
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Ask something...',
                          ),
                          onSubmitted: (_) => _sendQuery(),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _sendQuery,
                        child: const Text('Send'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Response Section
                  if (viewModel.chatResponse != null) ...[
                    if (viewModel.chatResponse!.model.isNotEmpty)
                      Text(
                        'Powered by ${viewModel.chatResponse!.model}',
                        style: const TextStyle(color: Colors.grey),
                      ),
                    const SizedBox(height: 8),
                    Card(
                      color: Color(int.parse(
                        viewModel.chatResponse!.background.replaceAll('#', '0xFF'),
                      )),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Text(viewModel.chatResponse!.content),
                      ),
                    ),
                  ],
                ],
              );
            },
          ),
        ),
      ),
      bottomNavigationBar: Consumer<SmartBotViewModel>(
        builder: (context, viewModel, child) {
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(top: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Feature Flag: ${viewModel.getFlagStatus()}'),
                    Text('User ID: ${viewModel.userInfo?.userId ?? ''}'),
                  ],
                ),
                const SizedBox(height: 8),
                Center(
                  child: TextButton(
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const LogsScreen()),
                    ),
                    child: const Text('Show logs'),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}