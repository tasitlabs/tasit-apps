import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import SellOrder from "./SellOrder";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function SellOrderExecute(props) {
  const { sellOrder, onOrderExecution } = props;
  return (
    <View style={styles.container}>
      <SellOrder sellOrder={sellOrder} />
      <View style={styles.buttonView}>
        <Button title="Buy" onPress={onOrderExecution} />
      </View>
    </View>
  );
}

SellOrderExecute.propTypes = {
  sellOrder: PropTypes.object.isRequired,
  onOrderExecution: PropTypes.func.isRequired,
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
