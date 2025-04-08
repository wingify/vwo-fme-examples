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

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.fmeexample.MAX_LOG_MESSAGES
import com.vwo.interfaces.logger.LogTransport
import com.vwo.packages.logger.enums.LogLevelEnum
import java.text.SimpleDateFormat
import java.util.Date
import java.util.LinkedList
import java.util.Locale

object AppLogger : LogTransport {

    private val logMessages: LinkedList<String> = LinkedList()

    private val _logMessagesLiveData = MutableLiveData<List<String>>()
    val logMessagesLiveData: LiveData<List<String>> = _logMessagesLiveData

    override fun log(level: LogLevelEnum, message: String?) {
        if (message == null) return
        Log.d("FME", message)
        addLogMessage("${getCurrentDateTimeFormatted()} [${level.name}] $message")
    }

    private fun addLogMessage(message: String) {
        synchronized(logMessages) {
            logMessages.add(message)
            if (logMessages.size > MAX_LOG_MESSAGES) {
                logMessages.removeFirst()
            }
            // Post the updated list to LiveData
            _logMessagesLiveData.postValue(logMessages.toList())
        }
    }

    private fun getCurrentDateTimeFormatted(): String {
        val currentTime = Date()
        val dateFormat = SimpleDateFormat("dd-MM-yyyy HH:mm:ss", Locale.getDefault())
        return dateFormat.format(currentTime)
    }
}