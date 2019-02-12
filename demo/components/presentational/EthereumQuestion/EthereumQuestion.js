import React from "react";
<<<<<<< HEAD
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "@presentational/LargeText";
import Button from "@presentational/Button";
import Colors from "@constants/Colors";
=======
import { Button, StyleSheet, View } from "react-native";
import LargeText from "./LargeText";
import Colors from "../../constants/Colors";
>>>>>>> Screen/Presentational components refactoring

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

<<<<<<< HEAD
EthereumQuestion.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
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
    marginTop: responsiveHeight(4),
=======
    marginTop: 20,
>>>>>>> Screen/Presentational components refactoring
  },
});
