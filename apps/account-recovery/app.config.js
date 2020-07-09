import 'dotenv-flow/config';

export default () => {
  return {
    name: "Account Recovery",
    description: "This app shows how you can use contract-based account functionality from tasit to set up account recovery for the user.",
    slug: "account-recovery",
    version: "0.0.30",
    orientation: "portrait",
    icon: "./assets/images/TasitAccountRecovery1024.png",
    scheme: "account-recovery",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/TasitAccoutRecoverySplash.png",
      resizeMode: "contain",
      backgroundColor: "#07FFC2"
    },
    updates: {
      "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      "supportsTablet": true,
      "bundleIdentifier": "io.tasit.account-recovery",
      "buildNumber": "0.0.30"
    },
    android: {
      "package": "io.tasit.account-recovery",
      "versionCode": 30
    },
    web: {
      "favicon": "./assets/images/TasitFavicon.png"
    },
    extra: {
      baseURL: process.env.BASE_URL,
    },
  }
}
