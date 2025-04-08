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

package com.example.fmeexample.ui

import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.fmeexample.R
import com.example.fmeexample.fme.AppLogger
import com.example.fmeexample.ui.adapters.FmeTextAdapter
import com.example.fmeexample.vm.FmeTextViewModel

class FmeTextDisplayActivity : AppCompatActivity() {

    private lateinit var fmeTextRecyclerView: RecyclerView
    private lateinit var viewModel: FmeTextViewModel
    private lateinit var fmeTextAdapter: FmeTextAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fme_text_display)
        supportActionBar?.show()
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        fmeTextRecyclerView = findViewById(R.id.fmeTextRecyclerView)
        fmeTextRecyclerView.layoutManager = LinearLayoutManager(this)

        // Initialize the adapter
        fmeTextAdapter = FmeTextAdapter(emptyList()) // Start with an empty list
        fmeTextRecyclerView.adapter = fmeTextAdapter

        viewModel = ViewModelProvider(this)[FmeTextViewModel::class.java]

        // Observe the log messages from AppLogger
        AppLogger.logMessagesLiveData.observe(this) { logMessages ->
            // Update the adapter with the new list of log messages
            fmeTextAdapter.updateData(logMessages)
        }

        viewModel.generateFmeText() // Trigger FME SDK call
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                // Handle the Up button. Finish the activity.
                finish()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }
}