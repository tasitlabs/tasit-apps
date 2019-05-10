import React from "react";
import { StyleSheet } from "react-native";
import RNButton from "react-native-button";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

// Responsive percents
const FONT_SIZE = 1.8;
const BUTTON_HEIGHT = 1.5;

// TODO: Change to NativeBase button component
// https://github.com/tasitlabs/tasit/issues/204
export default function Button(props) {
  let { title, onPress, disabled } = props;
  if (disabled === undefined) disabled = false;

  const onPressHandler = disabled ? () => {} : onPress;

  title = title.toUpperCase();

  return (
    <RNButton
      containerStyle={
        disabled ? containerStyles.disabled : containerStyles.enabled
      }
      style={disabled ? buttonStyles.disabled : buttonStyles.enabled}
      onPress={onPressHandler}
      activeOpacity={1}
    >
      {title}
    </RNButton>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const containerStyles = StyleSheet.create({
  enabled: {
    padding: responsiveHeight(BUTTON_HEIGHT),
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: Colors.buttonBackground,
  },
  disabled: {
    padding: responsiveHeight(BUTTON_HEIGHT),
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: Colors.disabledButtonBackground,
  },
});

const buttonStyles = StyleSheet.create({
  disabled: {
    fontSize: responsiveFontSize(FONT_SIZE),
    color: Colors.disabledButtonTextColor,
  },
  enabled: {
    fontSize: responsiveFontSize(FONT_SIZE),
    color: Colors.buttonTextColor,
  },
});
