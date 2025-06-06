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
package com.example.fmeexample.vm

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.fmeexample.BuildConfig
import com.example.fmeexample.analytics.MixpanelIntegration
import com.example.fmeexample.fme.FmeHelper
import com.example.fmeexample.models.ChatResponse
import com.example.fmeexample.models.UserInfo
import com.example.fmeexample.useCases.SendChatQueryUseCaseImpl
import com.vwo.interfaces.integration.IntegrationCallback
import kotlinx.coroutines.launch

class SmartBotViewModel(private val chatQueryUseCase: SendChatQueryUseCaseImpl) : ViewModel() {
    private val _chatResponse = MutableLiveData<ChatResponse>()
    val chatResponse: LiveData<ChatResponse> = _chatResponse

    private val _userInfo = MutableLiveData<UserInfo>()
    val userInfo: LiveData<UserInfo> = _userInfo

    private var mixpanelIntegration: MixpanelIntegration? = null

    suspend fun init(context: Context) {
        // Get Mixpanel token from BuildConfig
        val mixpanelToken = BuildConfig.MIXPANEL_PROJECT_TOKEN

        val integrations = if (mixpanelToken.isNotEmpty()) {
            // Initialize Mixpanel
            mixpanelIntegration = MixpanelIntegration.getInstance(context, mixpanelToken)

            object : IntegrationCallback {
                override fun execute(properties: Map<String, Any>) {
                    // Check if this is a flag evaluation or event tracking
                    if (properties["api"] == "track") {
                        // This is event tracking
                        val eventName = properties["eventName"] as String
                        mixpanelIntegration?.trackEvent(eventName, properties)

                    } else if (properties.containsKey("featureName")) {
                        // This is a flag evaluation
                        mixpanelIntegration?.trackFlagEvaluation(properties)
                    }
                }
            }
        } else {
            null
        }
        loadInitialData()
        initFme(context, integrations)
    }

    private fun loadInitialData() {
        viewModelScope.launch {
            _userInfo.value = UserInfo("", "")
        }
    }

    fun sendQuery(userId: String, query: String) {
        viewModelScope.launch {
            processUserQuery(userId, query)
        }
    }

    fun getUserId() {
        viewModelScope.launch {
            _userInfo.postValue(UserInfo(generateRandomUserId(), generateRandomQuery()))
        }
    }

    private fun generateRandomUserId(): String {
        val letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return (1..12)
            .map { letters.random() }
            .joinToString("")
    }

    private fun generateRandomQuery(): String {
        return "I forgot my password"
    }

    private suspend fun initFme(context: Context, integrations: IntegrationCallback?) {
        FmeHelper.initFME(context, integrations)
    }

    private suspend fun processUserQuery(userId: String, query: String) {
        val chatResponse = chatQueryUseCase.getChatResponse(userId, query)
        if (chatResponse != null) {
            _chatResponse.postValue(chatResponse)
        }
    }

    fun sendEvent(userId: String) {
        chatQueryUseCase.sendEvent(userId)
    }
}