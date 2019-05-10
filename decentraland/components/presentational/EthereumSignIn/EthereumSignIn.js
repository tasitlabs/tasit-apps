import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "@presentational/LargeText";
import Button from "@presentational/Button";
import Colors from "@constants/Colors";

export default function EthereumSignIn(props) {
  return (
    <View style={styles.container}>
      <LargeText>{`Cool. Let's start by hooking this app with your wallet.`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Connect with wallet" onPress={props.onConnect} />
      </View>
    </View>
  );
}

EthereumSignIn.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
