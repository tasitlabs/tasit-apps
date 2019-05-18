import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Button from "@presentational/Button";

export default function WalletButton(props) {
  return (
    <View style={styles.buttonView}>
      <Button title="Connect with wallet" onPress={props.onConnect} />
    </View>
  );
}

WalletButton.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
