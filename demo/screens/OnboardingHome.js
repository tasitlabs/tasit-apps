import React from "react";
import { Image, Button, StyleSheet, View } from "react-native";
import LargeText from "@presentational/LargeText";
import Colors from "@constants/Colors";

export default class OnboardingHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/icon.png")} />
        <LargeText>{`Let's get you set up with a secure way to store this land!`}</LargeText>
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
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 30,
  },
});
