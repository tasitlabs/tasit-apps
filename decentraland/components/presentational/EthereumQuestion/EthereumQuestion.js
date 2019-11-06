import React from "react";
import { StyleSheet, View } from "react-native";

import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "@presentational/LargeText";
import Button from "@presentational/Button";
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

// TODO: Migrate me to TypeScript types
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
