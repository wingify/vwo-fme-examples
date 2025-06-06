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

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.example.fmeexample.R
import com.example.fmeexample.vm.SmartBotViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.example.fmeexample.FME_ACCOUNT_ID
import com.example.fmeexample.FME_SDK_KEY
import com.example.fmeexample.repos.SmartBotRemoteDataSourceImpl
import com.example.fmeexample.repos.SmartBotRepositoryImpl
import com.example.fmeexample.useCases.SendChatQueryUseCaseImpl
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SmartBotActivity : AppCompatActivity() {

    private lateinit var viewModel: SmartBotViewModel
    private lateinit var userIdEditText: EditText
    private lateinit var searchQueryEditText: EditText
    private lateinit var sendButton: Button
    private lateinit var assignButton: Button
    private lateinit var infoCardView: CardView
    private lateinit var infoTextView: TextView
    private lateinit var featureFlagStatusValue: TextView
    private lateinit var userIdBottomValue: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_smart_bot)

        // Initialize views
        userIdEditText = findViewById(R.id.userIdEditText)
        searchQueryEditText = findViewById(R.id.searchQueryEditText)
        sendButton = findViewById(R.id.sendButton)
        assignButton = findViewById(R.id.assignButton)
        infoCardView = findViewById(R.id.infoCardView)
        infoTextView = findViewById(R.id.infoTextView)
        featureFlagStatusValue = findViewById(R.id.featureFlagStatusValue)
        userIdBottomValue = findViewById(R.id.userIdBottomValue)
        findViewById<TextView>(R.id.showLogs).setOnClickListener {
            startActivity(Intent(this, FmeTextDisplayActivity::class.java))
        }

        // Prevent EditText from getting initial focus
        window.decorView.requestFocus()

        // Initialize ViewModel (using a Factory if you have dependencies)
        viewModel = ViewModelProvider(
            this, SmartBotViewModelFactory(
                SendChatQueryUseCaseImpl(
                    SmartBotRepositoryImpl(SmartBotRemoteDataSourceImpl())
                )
            )
        )[SmartBotViewModel::class.java]

        lifecycleScope.launch(Dispatchers.IO) { viewModel.init(this@SmartBotActivity) }

        // Observe LiveData
        viewModel.userInfo.observe(this) { userInfo ->
            userIdEditText.setText(userInfo.userId)
            userIdBottomValue.text = userInfo.userId

            searchQueryEditText.setText(userInfo.query)
        }

        viewModel.chatResponse.observe(this) { response ->
            infoTextView.text = response.content
            setCardBackgroundColorFromString(infoCardView, response.background)
            if (response.model.isBlank()) {
                findViewById<TextView>(R.id.tvPoweredBy).visibility = View.GONE
                findViewById<TextView>(R.id.tvPoweredByValue).visibility = View.GONE
            } else {
                findViewById<TextView>(R.id.tvPoweredBy).visibility = View.VISIBLE
                findViewById<TextView>(R.id.tvPoweredByValue).visibility = View.VISIBLE
                findViewById<TextView>(R.id.tvPoweredByValue).text = response.model
            }
            val status = if (response.isEnabled) "Enabled" else "Disabled"
            featureFlagStatusValue.text = status
        }

        // Set click listener for send button
        sendButton.setOnClickListener {

            val query = searchQueryEditText.text.toString()
            val userId = userIdEditText.text.toString()
            if (userId.isNotEmpty() && query.isNotEmpty()) {
                viewModel.sendEvent(userId)
                viewModel.sendQuery(userId, query)
                userIdBottomValue.text = userId
            } else {
                showDialog()
            }
        }

        assignButton.setOnClickListener {
            viewModel.getUserId()
        }

        if (FME_SDK_KEY.isBlank() || FME_ACCOUNT_ID == 0) {
            showMissingFmeInfoDialog()
        }
    }

    private fun showMissingFmeInfoDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Missing FME Information")
        builder.setMessage("Please set FME_SDK_KEY, FME_ACCOUNT_ID, etc in local.properties.")

        builder.setPositiveButton("OK") { dialog, _ ->
            dialog.dismiss()
        }

        val dialog = builder.create()
        dialog.show()
    }

    private fun showDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Missing Information")
        builder.setMessage("Please enter both User ID and Query.")

        builder.setPositiveButton("OK") { dialog, _ ->
            dialog.dismiss()
        }

        val dialog = builder.create()
        dialog.show()
    }

    private fun setCardBackgroundColorFromString(
        infoCardView: CardView,
        backgroundColorString: String
    ) {
        try {
            // Parse the color string into a color integer
            val colorInt = Color.parseColor(backgroundColorString)

            // Create a ColorStateList from the color integer
            val colorStateList = ColorStateList.valueOf(colorInt)

            // Set the background color
            infoCardView.backgroundTintList = colorStateList
        } catch (e: IllegalArgumentException) {
            // Handle invalid color string (e.g., log an error, set a default color)
            println("Invalid color string: $backgroundColorString")
            // Example: Set a default color
            infoCardView.backgroundTintList = ColorStateList.valueOf(Color.WHITE)
        }
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            hideKeyboard()
        }
    }

    private fun hideKeyboard() {
        val view = this.currentFocus
        if (view != null) {
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(view.windowToken, 0)
            // Clear focus from any EditText
            view.clearFocus()
        } else {
            // If no view is focused, you can still hide the keyboard
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(window.decorView.windowToken, 0)
        }
    }
}

class SmartBotViewModelFactory(private val chatQueryUseCase: SendChatQueryUseCaseImpl) :
    ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(SmartBotViewModel::class.java)) {
            return SmartBotViewModel(chatQueryUseCase) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}