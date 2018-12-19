import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LargeText from "./LargeText";
import Colors from "@constants/Colors";

export default function EthereumQuestion(props) {
  return (
    <View style={styles.container}>
      <LargeText>{`Are you new to Ethereum?`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Yep" onPress={props.onSignUp} />
      </View>
      <View style={styles.buttonView}>
        <Button title="Nope" onPress={props.onSignIn} />
      </View>
    </View>
  );
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
    marginTop: 20,
  },
});
