import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";

export default class EthereumSignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {`Cool. Let's start by hooking this app with your wallet.`}
        </Text>
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
  text: {
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textColor,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 30,
  },
});
