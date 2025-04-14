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
import 'package:provider/provider.dart';
import 'constants.dart';
import 'repos/SmartBotRemoteDataSourceImpl.dart';
import 'repos/SmartBotRepositoryImpl.dart';
import 'ui/smart_bot_screen.dart';
import 'usecases/SendChatQueryUseCaseImpl.dart';
import 'vm/SmartBotViewModel.dart'; // Import your new screen

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Important for SDK initialization

  // Load environment variables
  await AppConstants.initialize();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SmartBotViewModel(
            SendChatQueryUseCaseImpl(
                SmartBotRepositoryImpl(
                    SmartBotRemoteDataSourceImpl()
                )
            )
        )),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Bot Demo',
      theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue), // Example theme
          useMaterial3: true,
          // Adjust input decoration theme for consistent look
          inputDecorationTheme: const InputDecorationTheme(
            contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0), // Makes TextFields less tall
          )
      ),
      home: const SmartBotScreen(), // Start with the Smart Bot screen
      debugShowCheckedModeBanner: false,
    );
  }
}