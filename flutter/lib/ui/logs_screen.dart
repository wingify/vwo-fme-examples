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
 */

import 'package:flutter/material.dart';

import '../fme/dart_logger.dart';

class LogsScreen extends StatelessWidget {
  const LogsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final logger = DartLogger();

    return Scaffold(
      appBar: AppBar(
        title: const Text('SDK Logs'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: ValueListenableBuilder<List<String>>(
        valueListenable: logger.logMessagesNotifier,
        builder: (context, logs, child) {
          return logs.isEmpty
              ? const Center(child: Text('No logs available yet.'))
              : Padding(padding: const EdgeInsets.only(bottom: 24.0), child: ListView.builder(
            padding: const EdgeInsets.all(8.0),
            itemCount: logs.length,
            itemBuilder: (context, index) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      vertical: 8.0,
                      horizontal: 4.0,
                    ),
                    child: Text(
                      logs[index],
                      style: const TextStyle(
                        fontSize: 12.0,
                      ),
                    ),
                  ),
                  // Add separator line except after last item
                  if (index < logs.length - 1)
                    Container(
                      height: 1.0,
                      color: Colors.grey[300],
                      margin: const EdgeInsets.symmetric(vertical: 4.0),
                    ),
                ],
              );
            },
          )
          );
        },
      ),
    );
  }
}
