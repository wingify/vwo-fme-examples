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

import java.util.Timer
import java.util.TimerTask

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.leanback.app.BackgroundManager
import androidx.leanback.app.BrowseSupportFragment
import androidx.leanback.widget.ArrayObjectAdapter
import androidx.leanback.widget.HeaderItem
import androidx.leanback.widget.ListRow
import androidx.leanback.widget.ListRowPresenter
import androidx.leanback.widget.OnItemViewClickedListener
import androidx.leanback.widget.OnItemViewSelectedListener
import androidx.leanback.widget.Presenter
import androidx.core.content.ContextCompat
import android.util.DisplayMetrics
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.core.view.setPadding

import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.SimpleTarget
import com.bumptech.glide.request.transition.Transition
import com.example.tvseriesapp.fme.VwoFmeManager

/**
 * Loads a grid of cards with travel videos to browse.
 */
class MainFragment : BrowseSupportFragment() {

    private lateinit var mBackgroundManager: BackgroundManager
    private var mDefaultBackground: Drawable? = null
    private lateinit var mMetrics: DisplayMetrics
    private var mBackgroundTimer: Timer? = null
    private var mBackgroundUri: String? = null
    private val travelVideos = TravelVideoList.list

    private val TAG = "MainFragment"


    override fun onActivityCreated(savedInstanceState: Bundle?) {
        Log.i(TAG, "onCreate")
        super.onActivityCreated(savedInstanceState)

        prepareBackgroundManager()

        setupUIElements()

        loadRows()

        setupEventListeners()
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "onDestroy: " + mBackgroundTimer?.toString())
        mBackgroundTimer?.cancel()
    }

    private fun prepareBackgroundManager() {
        mBackgroundManager = BackgroundManager.getInstance(activity)
        mBackgroundManager.attach(activity!!.window)
        mDefaultBackground = ContextCompat.getDrawable(activity!!, R.drawable.default_background)
        mMetrics = DisplayMetrics()
        activity!!.windowManager.defaultDisplay.getMetrics(mMetrics)
    }

    private fun setupUIElements() {
        title = getString(R.string.browse_title)
        headersState = HEADERS_ENABLED
        isHeadersTransitionOnBackEnabled = true
        brandColor = ContextCompat.getColor(activity!!, R.color.fastlane_background)
        searchAffordanceColor = ContextCompat.getColor(activity!!, R.color.search_opaque)
    }

    private fun loadRows() {
        val rowsAdapter = ArrayObjectAdapter(ListRowPresenter())
        travelVideos.forEachIndexed { index, travelVideo ->
            val listRowAdapter = ArrayObjectAdapter(TravelVideoCardPresenter())
            listRowAdapter.add(travelVideo)
            val header = HeaderItem(index.toLong(), travelVideo.title)
            rowsAdapter.add(ListRow(header, listRowAdapter))
        }
        adapter = rowsAdapter
    }

    private fun setupEventListeners() {
        setOnSearchClickedListener {
            Toast.makeText(activity!!, "Implement your own in-app search", Toast.LENGTH_LONG).show()
        }
        onItemViewClickedListener = OnItemViewClickedListener { itemViewHolder, item, rowViewHolder, row ->
            if (item is TravelVideo) {
                Toast.makeText(activity!!, "Play ${item.title}", Toast.LENGTH_SHORT).show()
            }
        }
        onItemViewSelectedListener = OnItemViewSelectedListener { itemViewHolder, item, rowViewHolder, row ->
            if (item is TravelVideo) {
                mBackgroundUri = item.landscapeImageResId.toString()
                startBackgroundTimer()
            }
        }
    }

    private fun updateBackground(resourceId: String?) {
        val width = mMetrics.widthPixels
        val height = mMetrics.heightPixels
        val resId = resourceId?.toIntOrNull() ?: R.drawable.default_background
        Glide.with(activity!!)
            .load(resId)
            .centerCrop()
            .error(mDefaultBackground)
            .into<SimpleTarget<Drawable>>(
                object : SimpleTarget<Drawable>(width, height) {
                    override fun onResourceReady(
                        drawable: Drawable,
                        transition: Transition<in Drawable>?
                    ) {
                        mBackgroundManager.drawable = drawable
                    }
                })
        mBackgroundTimer?.cancel()
    }

    private fun startBackgroundTimer() {
        mBackgroundTimer?.cancel()
        mBackgroundTimer = Timer()
        mBackgroundTimer?.schedule(object : TimerTask() {
            override fun run() {
                Handler(Looper.getMainLooper()).post { updateBackground(mBackgroundUri) }
            }
        }, 300)
    }
}

data class CardViewHolder(
    val imageView: ImageView,
    val titleView: TextView,
    val descView: TextView,
    val playButton: Button,
    val myListButton: Button
)

class TravelVideoCardPresenter : Presenter() {
    override fun onCreateViewHolder(parent: ViewGroup): Presenter.ViewHolder {
        val context = parent.context
        val layout = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(ContextCompat.getColor(context, R.color.default_background))
            setPadding(32, 32, 32, 32)
            layoutParams = ViewGroup.LayoutParams(600, ViewGroup.LayoutParams.WRAP_CONTENT)
        }
        val imageView = ImageView(context).apply {
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 340
            )
            scaleType = ImageView.ScaleType.CENTER_CROP
        }
        val titleView = TextView(context).apply {
            textSize = 24f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setPadding(0, 24, 0, 8)
        }
        val descView = TextView(context).apply {
            textSize = 16f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setPadding(0, 0, 0, 24)
        }
        val buttonLayout = LinearLayout(context).apply {
            orientation = LinearLayout.HORIZONTAL
        }
        val playButton = Button(context).apply {
            text = "Play"
            setPadding(20)
        }
        val myListButton = Button(context).apply {
            text = "My List"
            setPadding(20)
        }
        buttonLayout.addView(playButton)
        buttonLayout.addView(myListButton)
        layout.addView(imageView)
        layout.addView(titleView)
        layout.addView(descView)
        layout.addView(buttonLayout)
        layout.tag = CardViewHolder(imageView, titleView, descView, playButton, myListButton)
        return Presenter.ViewHolder(layout)
    }

    override fun onBindViewHolder(viewHolder: Presenter.ViewHolder, item: Any) {
        val travelVideo = item as TravelVideo
        val holderObj = viewHolder.view.tag as CardViewHolder
        val imageView = holderObj.imageView
        val titleView = holderObj.titleView
        val descView = holderObj.descView
        val playButton = holderObj.playButton
        val myListButton = holderObj.myListButton

        // Set video details
        titleView.text = travelVideo.title
        descView.text = travelVideo.description

        // Load local drawable resource instead of URL
        Glide.with(imageView.context)
            .load(travelVideo.landscapeImageResId)
            .centerCrop()
            .error(R.drawable.default_background)
            .into(imageView)

        // VWO FME Integration

        // Set play button text and color from VWO
        playButton.text = VwoFmeManager.getPlayButtonText()
        playButton.setBackgroundColor(VwoFmeManager.getPlayButtonColor())

        // Show/hide My List button based on VWO flag
        if (VwoFmeManager.isWatchlistEnabled()) {
            myListButton.visibility = View.VISIBLE
        } else {
            myListButton.visibility = View.GONE
        }

        // Set click listeners with VWO event tracking
        playButton.setOnClickListener {
            VwoFmeManager.trackPlayButtonClick(travelVideo.title)
            Toast.makeText(imageView.context, "Playing ${travelVideo.title}", Toast.LENGTH_SHORT).show()
        }

        myListButton.setOnClickListener {
            VwoFmeManager.trackMyListButtonClick(travelVideo.title)
            Toast.makeText(imageView.context, "Added ${travelVideo.title} to My List", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onUnbindViewHolder(viewHolder: Presenter.ViewHolder) {
        // No-op
    }
}

