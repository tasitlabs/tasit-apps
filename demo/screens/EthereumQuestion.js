import React from "react";
import { Image, Button, StyleSheet, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class EthereumQuestion extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{`Are you new to Ethereum?`}</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 20,
  },
});
