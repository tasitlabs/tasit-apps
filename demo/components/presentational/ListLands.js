import React from "react";
import { ListView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "@constants/Colors";

export default function ListLands(props) {
  return (
    <ListView
      style={styles.container}
      dataSource={props.dataSource}
      renderRow={props.renderRow}
    />
  );
}

ListLands.propTypes = {
  dataSource: PropTypes.any.isRequired,
  renderRow: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
