import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Account: {
            screens: {
              AccountScreen: "one",
            },
          },
          ContractBasedAccount: {
            screens: {
              ContractBasedAccountScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
