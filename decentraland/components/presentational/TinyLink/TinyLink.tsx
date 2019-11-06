import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";

import { Button } from "native-base";
import { openURL, showError } from "@helpers";

const openLink = async url => {
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open link`);
  }
};

export default function TinyLink({ text, url }) {
  const onPress = () => {
    openLink(url);
  };
  return (
    <Button transparent onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
}

// TODO: Migrate me to TypeScript types
TinyLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    color: Colors.linkColor,
    fontSize: responsiveFontSize(2),
    padding: responsiveHeight(1),
    textAlign: "center",
  },
});
