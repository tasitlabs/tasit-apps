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

export default function EthereumSignIn(props) {
  return (
    <View style={styles.container}>
      <LargeText>{`Cool. Let's start by hooking this app with your wallet.`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Connect with WalletConnect" onPress={props.onConnect} />
      </View>
    </View>
  );
}

<<<<<<< HEAD
EthereumSignIn.propTypes = {
  onConnect: PropTypes.func.isRequired,
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
