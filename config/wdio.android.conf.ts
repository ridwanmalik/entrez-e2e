import dotenv from "dotenv"
import path from "path"

dotenv.config()

import { config } from "./wdio.conf"

// ── Android capabilities (UiAutomator2) ─────────────────────────────────────
config.capabilities = [
  {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",

    // Device identification — prefer UDID for real devices (avoids ambiguity)
    "appium:deviceName": process.env.ANDROID_DEVICE_NAME || "Android Device",
    "appium:udid": process.env.ANDROID_UDID || undefined,
    "appium:platformVersion": process.env.ANDROID_PLATFORM_VERSION || "",

    // APK under test — omit 'appium:app' when app is already installed on device
    ...(process.env.APP_PATH ? { "appium:app": path.resolve(process.env.APP_PATH) } : {}),
    "appium:appPackage": process.env.APP_PACKAGE || "com.pounce.ssds.dev",
    "appium:appActivity": process.env.APP_ACTIVITY || "com.pounce.ssds.MainActivity",

    // Session lifecycle
    // noReset: true = don't reinstall (required when APP_PATH is not set)
    "appium:noReset": !process.env.APP_PATH,
    "appium:fullReset": false,           // true = wipe device data (use only when needed)
    // forceAppLaunch: kill the app and start fresh from appActivity every session.
    // Without this, Appium may just foreground whatever screen the app was last on.
    "appium:forceAppLaunch": true,
    "appium:newCommandTimeout": 240,

    // Permissions & UX
    "appium:autoGrantPermissions": true, // Auto-dismiss Android permission dialogs
    "appium:disableWindowAnimation": true, // Faster, more reliable element detection

    // UiAutomator2 server timeouts
    "appium:uiautomator2ServerLaunchTimeout": 60000,
    "appium:uiautomator2ServerInstallTimeout": 60000,

    // Suppress known non-critical errors on some Android versions
    "appium:ignoreHiddenApiPolicyError": true,
  },
]

export { config }
