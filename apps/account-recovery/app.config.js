import 'dotenv-flow/config';

export default () => {
  return {
    name: "Account Recovery",
    description: "This app shows how you can use contract-based account functionality from tasit to set up account recovery for the user.",
    slug: "account-recovery",
    version: "0.0.30",
    orientation: "portrait",
    privacy: "public", // ensures that this shows up at https://expo.io/@tasit/
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
      "bundleIdentifier": "io.tasit.accountrecovery",
      "buildNumber": "0.0.30"
    },
    android: {
      "package": "io.tasit.accountrecovery",
      "versionCode": 30
    },
    web: {
      "favicon": "./assets/images/TasitFavicon.png"
    },
    // env vars from .env files are passed through to the app here
    extra: {
      baseURL: process.env.BASE_URL,
      network: process.env.NETWORK,
    },
  }
}
