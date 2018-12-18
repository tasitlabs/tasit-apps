import React from "react";
import { ListView, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function ListLands(props) {
  return (
    <ListView
      style={styles.container}
      dataSource={props.dataSource}
      renderRow={props.renderRow}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
