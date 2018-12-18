import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LargeText from "@presentational/LargeText";
import Colors from "@constants/Colors";

export default class EthereumQuestion extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LargeText>{`Are you new to Ethereum?`}</LargeText>
        <View style={styles.buttonView}>
          <Button
            title="Yep"
            onPress={() => this.props.navigation.navigate("EthereumSignUp")}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="Nope"
            onPress={() => this.props.navigation.navigate("EthereumSignIn")}
          />
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
    marginTop: 20,
  },
});
