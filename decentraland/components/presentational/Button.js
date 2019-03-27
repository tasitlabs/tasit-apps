import React from "react";
import { StyleSheet } from "react-native";
import RNButton from "react-native-button";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

// TODO: Change to NativeBase button component
// https://github.com/tasitlabs/tasit/issues/204
export default function Button(props) {
  let { title, onPress, disabled } = props;
  if (!disabled) disabled = false;
  if (!onPress) onPress = () => {};
  title = title.toUpperCase();

  return (
    <RNButton
      containerStyle={
        disabled ? disabledStyles.container : enabledStyles.container
      }
      style={disabled ? disabledStyles.button : enabledStyles.button}
      onPress={onPress}
      activeOpacity={1}
    >
      {title}
    </RNButton>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const enabledStyles = StyleSheet.create({
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

const disabledStyles = StyleSheet.create({
  button: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.disabledButtonColor,
  },
  container: {
    padding: responsiveHeight(1.5),
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: Colors.disabledButtonBackground,
  },
});
