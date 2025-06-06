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

object TravelVideoList {
    val list: List<TravelVideo> by lazy {
        setupTravelVideos()
    }

    private fun setupTravelVideos(): List<TravelVideo> {
        return listOf(
            TravelVideo(
                title = "New Zealand",
                description = "Explore the majestic scenery and adventure activities in New Zealand.",
                landscapeImageResId = R.drawable.new_zealand
            ),
            TravelVideo(
                title = "Japan's Gems",
                description = "Discover the lesser-known but breathtaking spots in Japan.",
                landscapeImageResId = R.drawable.japan
            ),
            TravelVideo(
                title = "Wild Alaska",
                description = "Explore the rugged wilderness and stunning landscapes of Alaska.",
                landscapeImageResId = R.drawable.alaska
            ),
            TravelVideo(
                title = "South America",
                description = "Experience the vibrant cultures and diverse landscapes of South America.",
                landscapeImageResId = R.drawable.south_america
            ),
            TravelVideo(
                title = "Europe by Train",
                description = "Travel through Europe's iconic cities and countryside by train.",
                landscapeImageResId = R.drawable.europe
            ),
            TravelVideo(
                title = "Culture of India",
                description = "Immerse yourself in the rich culture and history of India.",
                landscapeImageResId = R.drawable.india
            ),
            TravelVideo(
                title = "Safari in Africa",
                description = "Join us on a thrilling safari adventure in Africa's wildlife reserves.",
                landscapeImageResId = R.drawable.africa
            ),
            TravelVideo(
                title = "Canadian Rockies",
                description = "Witness the breathtaking beauty of the Canadian Rockies.",
                landscapeImageResId = R.drawable.canada
            ),
            TravelVideo(
                title = "Wonders of Iceland",
                description = "Join us on a journey through Iceland's stunning landscapes and natural wonders.",
                landscapeImageResId = R.drawable.iceland
            ),
            TravelVideo(
                title = "Australia",
                description = "Experience the diverse wildlife and iconic landmarks of Australia.",
                landscapeImageResId = R.drawable.australia
            )
        )
    }
} 