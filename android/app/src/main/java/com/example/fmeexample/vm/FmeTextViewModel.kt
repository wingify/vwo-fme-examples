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

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class FmeTextViewModel : ViewModel() {

    private val _fmeTextList = MutableLiveData<List<String>>()
    val fmeTextList: LiveData<List<String>> = _fmeTextList

    fun generateFmeText() {
        // Replace this with your actual FME SDK integration
        val generatedText = listOf(
            "FME SDK Output Line 1",
            "FME SDK Output Line 2",
            "Another line from FME SDK",
            "More FME SDK text",
            "And so on..."
        )
        _fmeTextList.value = generatedText
    }
}