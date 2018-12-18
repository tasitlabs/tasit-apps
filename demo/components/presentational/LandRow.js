import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import Land from "./Land";

export default function LandRow(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.row}>
        <Land land={props.land} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 15,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
