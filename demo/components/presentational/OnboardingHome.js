import React from "react";
<<<<<<< HEAD
import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "./LargeText";
import Button from "./Button";
import Colors from "@constants/Colors";
=======
import { Image, Button, StyleSheet, View } from "react-native";
import LargeText from "./LargeText";
import Colors from "../../constants/Colors";
>>>>>>> Screen/Presentational components refactoring

export default function OnboardingHome(props) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Image source={require("../../assets/images/icon.png")} />
=======
      <Image source={require("../assets/images/icon.png")} />
>>>>>>> Screen/Presentational components refactoring
      <LargeText>{`Let's get you set up with a secure way to store this land!`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Get started" onPress={props.onPress} />
      </View>
    </View>
  );
}

<<<<<<< HEAD
OnboardingHome.propTypes = {
  onPress: PropTypes.func.isRequired,
};

=======
>>>>>>> Screen/Presentational components refactoring
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
<<<<<<< HEAD
    marginTop: responsiveHeight(5),
=======
    marginTop: 30,
>>>>>>> Screen/Presentational components refactoring
  },
});
