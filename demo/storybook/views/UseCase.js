import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export function UseCase(props) {
  const style = {
    ...styles.component,
    ...{ padding: props.noPad ? 0 : 10 },
    ...{
      backgroundColor: props.noBackground
        ? "rgba(0,0,0,0)"
        : styles.component.backgroundColor,
    },
    ...props.style,
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.useCaseWrapper}>
          <Text style={styles.useCase}>{}</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{props.text}</Text>
        </View>
        {props.usage && <Text style={styles.usage}>{props.usage}</Text>}
      </View>
      <View style={style}>{props.children}</View>
    </View>
  );
}

UseCase.propTypes = {
  text: PropTypes.string.isRequired,
  usage: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  noPad: PropTypes.bool,
  noBackground: PropTypes.bool,
};

/* eslint-disable react-native/no-color-literals */
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#eee",
    paddingBottom: 15,
  },
  title: {
    fontWeight: "600",
    color: "#3d3d3d",
  },
  titleWrapper: {},
  useCaseWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  useCase: {
    fontSize: 10,
    color: "#666",
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
  usage: {
    color: "#666",
    fontSize: 10,
    paddingTop: 0,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
  },
  component: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
/* eslint-enable react-native/no-color-literals */
