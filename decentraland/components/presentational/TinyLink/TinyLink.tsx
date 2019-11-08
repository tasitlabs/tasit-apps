import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../../../constants/Colors";

import { Button } from "native-base";
import { openURL, showError } from "../../../helpers";

const styles = StyleSheet.create({
  text: {
    color: Colors.linkColor,
    fontSize: responsiveFontSize(2),
    padding: responsiveHeight(1),
    textAlign: "center",
  },
});

const openLink = async (url): Promise<void> => {
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open link`);
  }
};

interface TinyLinkProps {
  text: string;
  url: string;
}

const TinyLink: React.SFC<TinyLinkProps> = ({ text, url }) => {
  const onPress = (): void => {
    openLink(url);
  };

  return (
    <Button transparent onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
};

export default TinyLink;
