// // https://medium.com/@dushyant_db/how-to-import-files-from-outside-of-root-directory-with-react-native-metro-bundler-18207a348427
// // Enable these settings when you want to use the one on the local machine

// const path = require('path');

// const extraNodeModules = {
//   "@tasit/hooks": path.resolve(__dirname + "/../../../tasit-sdk/packages/hooks"),
//   "@tasit/account": path.resolve(__dirname + "/../../../tasit-sdk/packages/account"),
//   // https://github.com/facebook/metro/issues/7
//   react: `${__dirname}/node_modules/react`,
//   "react-native": `${__dirname}/node_modules/react-native`,
// };

// const watchFolders = [
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/hooks"),
//   path.resolve(__dirname + "/../../../tasit-sdk/packages/account"),
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
