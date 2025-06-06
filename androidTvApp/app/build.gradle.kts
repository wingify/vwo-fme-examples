import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.example.tvseriesapp"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.tvseriesapp"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        // Read VWO configuration from local.properties
        val properties = Properties()
        val localPropertiesFile = rootProject.file("local.properties")
        if (localPropertiesFile.exists()) {
            properties.load(localPropertiesFile.inputStream())
        }
        
        buildConfigField("String", "VWO_SDK_KEY", "\"${properties.getProperty("vwo.sdk.key", "")}\"")
        buildConfigField("String", "VWO_ACCOUNT_ID", "\"${properties.getProperty("vwo.account.id", "")}\"")
        buildConfigField("String", "VWO_FLAG_ANDROID_TV", "\"${properties.getProperty("vwo.flag.android_tv", "")}\"")
        buildConfigField("String", "VWO_EVENT_PLAY", "\"${properties.getProperty("vwo.event.play", "")}\"")
        buildConfigField("String", "VWO_VARIABLE_PLAY_TEXT", "\"${properties.getProperty("vwo.variable.play_text", "")}\"")
        buildConfigField("String", "VWO_VARIABLE_PLAY_COLOR", "\"${properties.getProperty("vwo.variable.button_color", "")}\"")
        buildConfigField("String", "VWO_VARIABLE_WATCHLIST_ENABLED", "\"${properties.getProperty("vwo.variable.watchlist_enabled", "")}\"")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        buildConfig = true
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.leanback)
    implementation(libs.glide)
    implementation(libs.fme.android)

    // VWO FME SDK
    implementation(libs.fme.android)
}