import 'dotenv-flow/config';

export default () => {
  return {
    name: "account-recovery",
    slug: "account-recovery",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "account-recovery",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      "supportsTablet": true
    },
    web: {
      "favicon": "./assets/images/favicon.png"
    },
    extra: {
      baseURL: process.env.BASE_URL,
    },
  }
}
