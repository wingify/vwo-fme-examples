/*
 * Copyright (c) 2024-2025 Wingify Software Pvt. Ltd.
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
package com.example.fmeexample.repos

import com.example.fmeexample.EVENT_NAME
import com.example.fmeexample.FLAG_NAME
import com.example.fmeexample.VARIABLE_1_KEY
import com.example.fmeexample.VARIABLE_2_BG
import com.example.fmeexample.VARIABLE_2_CONTENT
import com.example.fmeexample.VARIABLE_2_KEY
import com.example.fmeexample.fme.FmeHelper
import com.example.fmeexample.models.ChatResponse
import com.vwo.models.user.VWOUserContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext

class SmartBotRemoteDataSourceImpl : SmartBotRemoteDataSource {

    private val defaultResponse = """To reset your password:  
1. Open the app and go to the login screen.  
2. Tap ‘Forgot Password?’ below the password field.  
3. Enter your registered email address and submit.  
4. Check your inbox for a password reset email (it may take a few minutes).  
5. Click the link in the email and follow the instructions to create a new password.  
6. Return to the app and log in with your new password."""

    override suspend fun sendChatQuery(userId: String, query: String): ChatResponse? =
        withContext(Dispatchers.IO) {

            // Simulate network delay
            delay(1000) // 1 second delay
            val userContext = FmeHelper.getUserContext(userId) ?: return@withContext null
            val featureFlag = FmeHelper.getFlag(FLAG_NAME, userContext)

            if (featureFlag?.isEnabled() != true) {
                val response = ChatResponse(query, "", "#ffffff", defaultResponse, false)
                return@withContext response
            }
            val model = featureFlag.getVariable(VARIABLE_1_KEY, "GPT-4") as? String ?: ""

            val json = featureFlag.getVariable(
                VARIABLE_2_KEY,
                emptyMap<String, Any>()
            ) as? Map<String, Any>

            val content: String = if (json?.containsKey(VARIABLE_2_CONTENT) == true) {
                json[VARIABLE_2_CONTENT] as String
            } else {
                ""
            }
            val background = if (json?.containsKey(VARIABLE_2_BG) == true) {
                json[VARIABLE_2_BG] as String
            } else {
                "#ffffff"
            }
            val response = ChatResponse(query, model, background, content, true)
            return@withContext response
        }

    override fun sendEvent(userId: String) {
        val userContext = VWOUserContext()
        userContext.id = userId
        FmeHelper.track(EVENT_NAME, userContext)
    }
}