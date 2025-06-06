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

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import androidx.fragment.app.FragmentActivity
import com.example.tvseriesapp.fme.VwoFmeManager

/**
 * Loads [MainFragment] only after VWO FME SDK is fully initialized (init + getFlag).
 */
class MainActivity : FragmentActivity() {

    private lateinit var loadingView: View
    private lateinit var progressBar: ProgressBar
    private lateinit var loadingText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Create and show loading view
        setupLoadingView()
        
        // Initialize VWO FME SDK and wait for complete initialization
        initializeVwoAndLoadUI()
    }
    
    private fun setupLoadingView() {
        progressBar = ProgressBar(this).apply {
            isIndeterminate = true
        }
        
        loadingText = TextView(this).apply {
            text = "Initializing"
            setTextColor(android.graphics.Color.WHITE)
            textSize = 18f
            gravity = android.view.Gravity.CENTER
            setPadding(0, 40, 0, 0)
        }
        
        // Add loading view to main container
        val mainContainer = findViewById<android.widget.FrameLayout>(R.id.main_browse_fragment)
        
        // Create a container for loading elements
        val loadingContainer = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            gravity = android.view.Gravity.CENTER
            layoutParams = android.widget.FrameLayout.LayoutParams(
                android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
                android.widget.FrameLayout.LayoutParams.MATCH_PARENT
            )
            setBackgroundColor(android.graphics.Color.BLACK)
            addView(progressBar)
            addView(loadingText)
        }
        
        mainContainer.addView(loadingContainer)
        this.loadingView = loadingContainer
    }
    
    private fun initializeVwoAndLoadUI() {
        Log.d("MainActivity", "Starting initialization...")
        
        VwoFmeManager.initialize { isSuccess ->
            Log.d("MainActivity", "Initialized successfully: $isSuccess")
            
            runOnUiThread {
                if (isSuccess) {
                    loadingText.text = "FME SDK initialized successfully!"
                } else {
                    loadingText.text = "FME SDK initialization completed with errors. Loading with defaults..."
                }
                
                // Small delay to show success message, then load fragment
                android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                    loadMainFragment()
                }, 500)
            }
        }
    }
    
    private fun loadMainFragment() {
        Log.d("MainActivity", "Loading MainFragment...")
        
        // Hide loading view
        loadingView.visibility = View.GONE
        
        // Load the main fragment
        if (supportFragmentManager.findFragmentById(R.id.main_browse_fragment) == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.main_browse_fragment, MainFragment())
                .commitNow()
        }
        
        Log.d("MainActivity", "MainFragment loaded successfully")
    }
}