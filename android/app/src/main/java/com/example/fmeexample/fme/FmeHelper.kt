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
package com.example.fmeexample.fme

import android.content.Context
import android.util.Log
import com.example.fmeexample.FME_ACCOUNT_ID
import com.example.fmeexample.FME_SDK_KEY
import com.vwo.VWO
import com.vwo.interfaces.IVwoInitCallback
import com.vwo.interfaces.IVwoListener
import com.vwo.models.user.GetFlag
import com.vwo.models.user.VWOContext
import com.vwo.models.user.VWOInitOptions
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

object FmeHelper {

    var VWO_FME_INSTANCE: VWO? = null

    private val tag = "Vwo-Fme"

    suspend fun initFME(context: Context) = suspendCoroutine { coroutine ->

        VWO_FME_INSTANCE?.let {
            Log.w(tag, "initFME() --> VWO already initialized ")
            coroutine.resume("Success: VWO already initialized")
            return@suspendCoroutine
        }

        val initOptions = VWOInitOptions().apply {
            sdkKey = FME_SDK_KEY
            accountId = FME_ACCOUNT_ID
            logger = mutableMapOf<String, Any>().apply {
                put("level", "TRACE")
                put("transports", getTransport())
            }
            //pollInterval = 10 * 1000
        }
        initOptions.context = context

        VWO.init(initOptions, object : IVwoInitCallback {
            override fun vwoInitSuccess(vwo: VWO, message: String) {
                VWO_FME_INSTANCE = vwo
                Log.i(tag, "FME Init Success: vwo=$vwo message=$message")
                coroutine.resume("Success: VWO initialized $message")
            }

            override fun vwoInitFailed(message: String) {
                // Log error here
                Log.i(tag, "FME Init failed: message=$message")
                coroutine.resume("Error: VWO Init failed: message=$message")
            }
        })
    }

    private fun getTransport(): MutableList<Map<String, Any>> {
        val transport: MutableMap<String, Any> = mutableMapOf()
        transport["defaultTransport"] = AppLogger

        val appLogger: MutableList<Map<String, Any>> = mutableListOf()
        appLogger.add(transport)
        return appLogger
    }

    fun track(eventName: String, userContext: VWOContext) {
        try {
            VWO_FME_INSTANCE?.trackEvent(eventName, userContext)
        } catch (e: Exception) {
            println(e)
        }
    }

    fun track(eventName: String, map: MutableMap<String, Any>, userId: String = "") {
        try {
            val userContext = getUserContext(userId) ?: return
            VWO_FME_INSTANCE?.trackEvent(eventName, userContext, map)
        } catch (e: Exception) {
            println(e)
        }
    }

    fun getUserContext(userId: String): VWOContext? {
        try {
            val userContext = VWOContext()
            userContext.id = userId
            Log.d(tag, "UserId=$userId")
            return userContext
        } catch (e: Exception) {
            return null
        }
    }

    suspend fun getFlag(flagName: String, userContext: VWOContext) =
        suspendCoroutine { continuation ->
            VWO_FME_INSTANCE?.getFlag(
                flagName,
                userContext,
                object : IVwoListener {
                    override fun onSuccess(data: Any) {
                        continuation.resume(data as GetFlag)
                    }

                    override fun onFailure(message: String) {
                        continuation.resume(null)
                        Log.d(tag, "getFlag $message")
                    }
                })
        }

    fun setAttribute(attributes: Map<String, Any>, context: VWOContext) {
        VWO_FME_INSTANCE?.setAttribute(attributes, context)
    }
}