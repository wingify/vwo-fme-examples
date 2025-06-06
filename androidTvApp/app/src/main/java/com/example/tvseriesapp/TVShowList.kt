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

object TVShowList {
    val list: List<TVShow> by lazy {
        setupTVShows()
    }

    private fun setupTVShows(): List<TVShow> {
        return listOf(
            TVShow(
                title = "Breaking Bad",
                description = "A high school chemistry teacher turned methamphetamine producer.",
                portraitImageResId = R.drawable.breaking_bad_portrait,
                landscapeImageResId = R.drawable.breaking_bad_landscape
            ),
            TVShow(
                title = "Game of Thrones",
                description = "Noble families vie for control of the Iron Throne.",
                portraitImageResId = R.drawable.game_of_thrones_portrait,
                landscapeImageResId = R.drawable.game_of_thrones_landscape
            ),
            TVShow(
                title = "Stranger Things",
                description = "Kids uncover supernatural mysteries in their small town.",
                portraitImageResId = R.drawable.stranger_things_portrait,
                landscapeImageResId = R.drawable.stranger_things_landscape
            ),
            TVShow(
                title = "The Mandalorian",
                description = "A lone bounty hunter in the outer reaches of the galaxy.",
                portraitImageResId = R.drawable.mandalorian_portrait,
                landscapeImageResId = R.drawable.mandalorian_landscape
            ),
            TVShow(
                title = "The Crown",
                description = "The reign of Queen Elizabeth II and the British royal family.",
                portraitImageResId = R.drawable.the_crown_portrait,
                landscapeImageResId = R.drawable.the_crown_landscape
            ),
            TVShow(
                title = "Westworld",
                description = "A futuristic theme park with android hosts.",
                portraitImageResId = R.drawable.westworld_portrait,
                landscapeImageResId = R.drawable.westworld_landscape
            ),
            TVShow(
                title = "The Witcher",
                description = "A monster hunter struggles to find his place in the world.",
                portraitImageResId = R.drawable.the_witcher_portrait,
                landscapeImageResId = R.drawable.the_witcher_landscape
            ),
            TVShow(
                title = "Better Call Saul",
                description = "The trials of a small-time lawyer before he became Saul Goodman.",
                portraitImageResId = R.drawable.better_call_saul_portrait,
                landscapeImageResId = R.drawable.better_call_saul_landscape
            ),
            TVShow(
                title = "Black Mirror",
                description = "Anthology series exploring dark aspects of technology.",
                portraitImageResId = R.drawable.black_mirror_portrait,
                landscapeImageResId = R.drawable.black_mirror_landscape
            ),
            TVShow(
                title = "The Last Of Us",
                description = "A hardened survivor and a young girl navigate a post-apocalyptic world ravaged by a fungal pandemic.",
                portraitImageResId = R.drawable.the_last_of_us_portrait,
                landscapeImageResId = R.drawable.the_last_of_us_landscape
            )
        )
    }
} 