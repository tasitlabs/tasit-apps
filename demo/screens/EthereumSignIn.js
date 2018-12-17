import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LargeText from "../components/presentational/LargeText";
import Colors from "../constants/Colors";

export default class EthereumSignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LargeText>{`Cool. Let's start by hooking this app with your wallet.`}</LargeText>
        <View style={styles.buttonView}>
          <Button title="Connect with WalletConnect" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 30,
  },
});
