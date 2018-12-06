import React from "react";
import { Image, Button, StyleSheet, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class OnboardingHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/icon.png")} />
        <Text style={styles.text}>
          {`Let's get you set up with a secure way to store this land!`}
        </Text>
        <View style={styles.buttonView}>
          <Button
            title="Get started"
            onPress={() => this.props.navigation.navigate("EthereumQuestion")}
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
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 30,
  },
});
