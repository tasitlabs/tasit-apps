import React from "react";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";

export function Story(props) {
  return (
    <View style={style}>
      <ScrollView>{props.children}</ScrollView>
    </View>
  );
}

Story.propTypes = {
  children: PropTypes.node,
};

const style = {
  flex: 1,
};
