import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import SellOrder from "./SellOrder";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function SellOrderClaim(props) {
  const { sellOrder, onClaim } = props;
  return (
    <View style={styles.container}>
      <SellOrder land={sellOrder} />
      <View style={styles.buttonView}>
        <Button title="Claim" onPress={onClaim} />
      </View>
    </View>
  );
}

SellOrderClaim.propTypes = {
  sellOrder: PropTypes.object.isRequired,
  onClaim: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
