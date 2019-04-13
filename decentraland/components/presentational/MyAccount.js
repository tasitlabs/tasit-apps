import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import LargeText from "./LargeText";
import Colors from "@constants/Colors";

export default function MyAccount(props) {

  return (
    <View style={styles.container}>
      <LargeText>MyAccount</LargeText>
    </View>
  );
}

MyAccount.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  }
});
