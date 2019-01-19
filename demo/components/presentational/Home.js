import React from "react";
import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import LargeText from "./LargeText";
import Button from "./Button";
import Colors from "@constants/Colors";

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icon.png")} />
      <LargeText>{`Tasit`}</LargeText>
      <Button title={`Decentraland`} onPress={props.onPress} />
    </View>
  );
}

Home.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
