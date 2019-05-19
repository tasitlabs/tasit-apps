import React from "react";
import { StyleSheet, View } from "react-native";
import LargeText from "@presentational/LargeText";
import WalletButton from "@presentational/WalletButton";
import Colors from "@constants/Colors";

export default function EthereumSignIn() {
  return (
    <View style={styles.container}>
      <LargeText>{`Cool. Let's start by hooking this app with your wallet.`}</LargeText>
      <WalletButton
        appName="Gnosis Safe"
        appSlug="gnosis-safe-smart-wallet"
        scheme="gnosis-safe"
      />
      <WalletButton
        appName="Tasit Wallet"
        appSlug="tasit-wallet"
        scheme="tasit-wallet"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
