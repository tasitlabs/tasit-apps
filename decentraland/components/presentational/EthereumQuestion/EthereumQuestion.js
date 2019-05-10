import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Button from "@shared-presentational/Button";
import Colors from "@shared-constants/Colors";
import LargeText from "@presentational/LargeText";

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

EthereumQuestion.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(4),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
