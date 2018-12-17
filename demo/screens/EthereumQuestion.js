import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";

export default class EthereumQuestion extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>Are you new to Ethereum?</Text>
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
  questionText: {
    padding: responsiveHeight(2),
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textColor,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 20,
  },
});
