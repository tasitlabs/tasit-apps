import React from "react";
import { StyleSheet } from "react-native";
import RNButton from "react-native-button";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function Button(props) {
  return (
    <RNButton
      containerStyle={styles.container}
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={1}
    >
      {props.title.toUpperCase()}
    </RNButton>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.buttonColor,
  },
  container: {
    padding: responsiveHeight(1.5),

    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: Colors.buttonBackground,
  },
});
