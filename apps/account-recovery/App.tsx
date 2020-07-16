import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./shared/hooks/useCachedResources";
import useColorScheme from "./shared/hooks/useColorScheme";
import Navigation from "./shared/navigation";

import { AccountContextProvider } from "./shared/context/AccountContext";

import Constants from "expo-constants";

import { Alert } from "react-native";

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { manifest } = Constants;
  const { extra } = manifest;
  const { network } = extra;
  console.log({ network });

  // Alert.alert(
  //   "Network",
  //   network
  // );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AccountContextProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AccountContextProvider>
    );
  }
}
