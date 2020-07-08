// https://medium.com/@dushyant_db/how-to-import-files-from-outside-of-root-directory-with-react-native-metro-bundler-18207a348427
// Enable these settings when you want to use the one on the local machine

// const path = require('path');

// const extraNodeModules = {
//   "@tasit/account": path.resolve(__dirname + "/../../../tasit-sdk/packages/account"),
//   "@tasit/action": path.resolve(__dirname + "/../../../tasit-sdk/packages/action"),
//   "@tasit/contracts": path.resolve(__dirname + "/../../../tasit-sdk/packages/contracts"),
//   "@tasit/contract-based-account": path.resolve(__dirname + "/../../../tasit-sdk/packages/contract-based-account"),
//   "@tasit/hooks": path.resolve(__dirname + "/../../../tasit-sdk/packages/hooks"),
//   "tasit": path.resolve(__dirname + "/../../../tasit-sdk/packages/tasit"),
//   // https://github.com/facebook/metro/issues/7
//   react: `${__dirname}/node_modules/react`,
//   "react-native": `${__dirname}/node_modules/react-native`,
// };

// const watchFolders = [
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/account"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/action"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/contracts"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/contract-based-account"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/hooks"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/tasit"),
// ];

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     extraNodeModules: new Proxy(extraNodeModules, {
//       get: (target, name) =>
//         //redirects dependencies referenced from common/ to local node_modules
//         name in target
//           ? target[name]
//           : path.join(process.cwd(), `node_modules/${name}`),
//     }),
//   },
//   watchFolders,
// };