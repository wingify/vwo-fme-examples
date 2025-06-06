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
package com.example.tvseriesapp

import android.graphics.Color
import android.util.Log
import com.example.tvseriesapp.fme.AppLogger
import com.vwo.VWO
import com.vwo.interfaces.IVwoInitCallback
import com.vwo.interfaces.IVwoListener
import com.vwo.models.user.GetFlag
import com.vwo.models.user.VWOInitOptions
import com.vwo.models.user.VWOUserContext
import kotlin.random.Random

/**
 * VWO FME Manager - Handles all VWO Feature Management and Experimentation logic
 * Follows Single Responsibility Principle by encapsulating all VWO-related operations
 */
object VwoFmeManager {
    
    private var isInitialized = false
    private var isFlagLoaded = false
    private var initializationCallbacks = mutableListOf<(Boolean) -> Unit>()
    
    private const val TAG = "VwoFmeManager"

    private var vwoClient: VWO? = null
    private var featureFlag: GetFlag? = null
    private val defaultButtonColor = "#FF4444"
    
    private val userContext: VWOUserContext by lazy {
        VWOUserContext().apply {
            id = generateUserId()
        }
    }

    /**
     * Initialize VWO SDK with configuration from BuildConfig
     * Calls onComplete when both init and getFlag are finished
     */
    fun initialize(onComplete: ((Boolean) -> Unit)? = null) {
        if (isInitialized && isFlagLoaded) {
            Log.d(TAG, "VWO SDK already fully initialized")
            onComplete?.invoke(true)
            return
        }
        
        // Add callback to list if provided
        onComplete?.let { initializationCallbacks.add(it) }
        
        // If already initializing, just wait for callbacks
        if (isInitialized && !isFlagLoaded) {
            Log.d(TAG, "VWO SDK init complete, waiting for flag...")
            return
        }
        
        val sdkKey = BuildConfig.VWO_SDK_KEY
        val accountId = BuildConfig.VWO_ACCOUNT_ID

        if (sdkKey.isEmpty() || accountId.isEmpty()) {
            Log.e(TAG, "VWO SDK Key or Account ID is empty. Please check local.properties")
            notifyCallbacks(false)
            return
        }

        val vwoInitOptions = VWOInitOptions()
        vwoInitOptions.sdkKey = sdkKey
        vwoInitOptions.accountId = accountId.toIntOrNull() ?: run {
            notifyCallbacks(false)
            return
        }
        vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
            put("level", "TRACE")
            put("transports", getTransport())
        }
        vwoInitOptions._vwo_meta = mapOf("ea" to 1, "_ean" to "AndroidTVApp")

        VWO.init(vwoInitOptions, object : IVwoInitCallback {
            override fun vwoInitSuccess(vwoClient: VWO, message: String) {
                Log.d(TAG, "VWO SDK loaded successfully")
                this@VwoFmeManager.vwoClient = vwoClient
                isInitialized = true

                getFlag()
            }

            override fun vwoInitFailed(message: String) {
                Log.e(TAG, "VWO SDK load failed: $message")
                notifyCallbacks(false)
            }
        })
    }

    private fun getFlag() {
        val flagName = BuildConfig.VWO_FLAG_ANDROID_TV
        vwoClient?.getFlag(flagName, userContext, object : IVwoListener {
            override fun onSuccess(data: Any) {
                featureFlag = data as? GetFlag
                val isFeatureFlagEnabled = featureFlag?.isEnabled()
                Log.d("FME-App", "Received getFlag isFeatureFlagEnabled=$isFeatureFlagEnabled")
                isFlagLoaded = true
                notifyCallbacks(true)
            }

            override fun onFailure(message: String) {
                Log.d("FME-App", "getFlag failed: $message")
                isFlagLoaded = true // Mark as loaded even on failure so UI can proceed
                notifyCallbacks(false)
            }
        })
    }
    
    private fun notifyCallbacks(success: Boolean) {
        initializationCallbacks.forEach { callback ->
            callback(success)
        }
        initializationCallbacks.clear()
    }

    /**
     * Get play button color from android_tv_flag feature flag
     * Expected format: "#RRGGBB" (hex color)
     */
    fun getPlayButtonColor(): Int {
        if (!isInitialized || featureFlag == null || featureFlag?.isEnabled()!=true) {
            Log.w(TAG, "VWO not initialized, returning default color")
            return getDefaultPlayButtonColor()
        }

        val colorString = (featureFlag?.getVariable(BuildConfig.VWO_VARIABLE_PLAY_COLOR, defaultButtonColor) as? String)?:defaultButtonColor
        return Color.parseColor(colorString)
    }

    /**
     * Generate a unique user ID with 6 random characters from the alphabets and numbers
     */
    private fun generateUserId(): String {

        val charPool: List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')
        val random = Random(System.currentTimeMillis())

        return (1..6)
            .map { random.nextInt(charPool.size) }
            .map(charPool::get)
            .joinToString("")
    }

    /**
     * Get play button text from play_text variable
     * Options: "Play", "Watch Now", "Start Watching"
     */
    fun getPlayButtonText(): String {
        val defaultName = "Play"
        if (!isInitialized || featureFlag == null || featureFlag?.isEnabled()!=true) {
            Log.w(TAG, "VWO not initialized, returning default")
            return defaultName
        }

        val text = (featureFlag?.getVariable(BuildConfig.VWO_VARIABLE_PLAY_TEXT, defaultName) as? String)?:defaultName
        return text
    }
    
    /**
     * Check if watchlist feature is enabled from is_watchlist_enabled variable
     */
    fun isWatchlistEnabled(): Boolean {
        val defaultValue = true
        if (!isInitialized || featureFlag == null || featureFlag?.isEnabled()!=true) {
            Log.w(TAG, "VWO not initialized, returning default")
            return defaultValue
        }

        val isEnabled = (featureFlag?.getVariable(BuildConfig.VWO_VARIABLE_WATCHLIST_ENABLED, defaultValue) as? Boolean)?:defaultValue
        return isEnabled
    }
    
    /**
     * Track custom event for analytics
     */
    fun trackEvent(eventName: String, properties: Map<String, Any> = emptyMap()) {
        if (!isInitialized) {
            Log.w(TAG, "VWO not initialized, cannot track event: $eventName")
            return
        }
        
        try {
            VWO.trackEvent(eventName, userContext, properties)
            Log.d(TAG, "Event tracked: $eventName")
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking event $eventName: ${e.message}")
        }
    }
    
    /**
     * Track play button click
     */
    fun trackPlayButtonClick(showTitle: String) {
        val properties = mapOf(
            "show_title" to showTitle,
            "button_text" to getPlayButtonText(),
            "source" to "tv_series_card"
        )
        trackEvent(BuildConfig.VWO_EVENT_PLAY, properties)
    }
    
    /**
     * Track My List button click
     */
    fun trackMyListButtonClick(showTitle: String) {
        val properties = mapOf(
            "show_title" to showTitle,
            "source" to "tv_series_card"
        )
        trackEvent("my_list_button_clicked", properties)
    }
    
    private fun getDefaultPlayButtonColor(): Int {
        return Color.parseColor(defaultButtonColor) // Red color as default
    }

    private fun getTransport(): MutableList<Map<String, Any>> {
        val transport: MutableMap<String, Any> = mutableMapOf()
        transport["defaultTransport"] = AppLogger

        val appLogger: MutableList<Map<String, Any>> = mutableListOf()
        appLogger.add(transport)
        return appLogger
    }
    
    /**
     * Check if VWO is fully ready (both init and getFlag completed)
     */
    fun isFullyReady(): Boolean = isInitialized && isFlagLoaded
} 