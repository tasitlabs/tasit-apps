const path = require("path");

module.exports = {
  // Both lines extracted from: https://medium.com/react-native-training/sharing-code-between-react-web-and-react-native-applications-7f451af26378
  // Tech-debt: Use same var for the shared dir (Why using resolve instead of join?)
  //
  // For React Native version 0.57
  projectRoot: path.resolve(__dirname),
  // tell the builder to also look in the shared directory for imports
  watchFolders: [path.resolve(__dirname, "../shared")],
  resolver: {
    extraNodeModules: {
      "react-native": path.resolve(
        __dirname,
        "../shared",
        "node_modules/react-native"
      ),
      react: path.resolve(__dirname, "../shared", "node_modules/react"),
    },
  },
  // It appears the getProjectRoots is no longer useful:
  // https://github.com/facebook/metro/issues/7#issuecomment-430008657
  getProjectRoots() {
    var shared = path.join(__dirname, "../shared");
    console.log("shared", shared);
    return [
      // Keep your project directory.
      __dirname,
      shared, // path to the external module
    ];
  },
};
