import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

val localPropertiesFile = project.rootProject.file("local.properties")
val localProperties = Properties().apply {
    if (localPropertiesFile.exists()) {
        load(localPropertiesFile.inputStream())
    }
}

// Helper function to safely get properties with defaults
fun getProperty(key: String, defaultValue: String) = localProperties.getProperty(key) ?: defaultValue

android {
    namespace = "com.example.fmeexample"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.fmeexample"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        buildConfigField(
            "int",
            "FME_ACCOUNT_ID",
            getProperty("FME_ACCOUNT_ID", "0")
        )
        buildConfigField(
            "String",
            "FME_SDK_KEY",
            "\"${getProperty("FME_SDK_KEY", "")}\""
        )
        buildConfigField(
            "String",
            "FLAG_NAME",
            "\"${getProperty("FLAG_NAME", "")}\""
        )
        buildConfigField(
            "String",
            "EVENT_NAME",
            "\"${getProperty("EVENT_NAME", "")}\""
        )
        buildConfigField(
            "String",
            "VARIABLE_1_KEY",
            "\"${getProperty("VARIABLE_1_KEY", "")}\""
        )
        buildConfigField(
            "String",
            "VARIABLE_2_KEY",
            "\"${getProperty("VARIABLE_2_KEY", "")}\""
        )
        buildConfigField(
            "String",
            "VARIABLE_2_CONTENT",
            "\"${getProperty("VARIABLE_2_CONTENT", "")}\""
        )
        buildConfigField(
            "String",
            "VARIABLE_2_BG",
            "\"${getProperty("VARIABLE_2_BG", "")}\""
        )
        buildConfigField(
            "int",
            "MAX_LOG_MESSAGES",
            getProperty("MAX_LOG_MESSAGES", "200")
        )
        buildConfigField(
            "String",
            "MIXPANEL_PROJECT_TOKEN",
            "\"${getProperty("MIXPANEL_PROJECT_TOKEN", "")}\""
        )
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
        viewBinding = true
        buildConfig = true
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.constraintlayout)
    implementation(libs.androidx.navigation.fragment.ktx)
    implementation(libs.androidx.navigation.ui.ktx)
    implementation(libs.mix.panel)
    implementation(libs.vwo.fme)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}