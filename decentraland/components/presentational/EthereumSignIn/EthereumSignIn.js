import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import LargeText from "@presentational/LargeText";
import WalletButton from "@presentational/WalletButton";
import Colors from "@constants/Colors";

export default function EthereumSignIn(props) {
  return (
    <View style={styles.container}>
      <LargeText>{`Cool. Let's start by hooking this app with your wallet.`}</LargeText>
      <WalletButton onConnect={props.onConnect} />
    </View>
  );
}

EthereumSignIn.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
