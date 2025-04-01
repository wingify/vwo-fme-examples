/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import app from './app';
import { initVwoClient } from './utils/vwoHelper';

const port: number = 3000;

const server = app.listen(port, async () => {
  try {
    // initialize the VWO client
    await initVwoClient();
    console.log(`Server running at http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to initialize VWO client:', error);
    process.exit(1);
  }
});

const exitHandler = (): void => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: unknown) => {
  unexpectedErrorHandler(reason instanceof Error ? reason : new Error(String(reason)));
});

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
