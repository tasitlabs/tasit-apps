import React from "react";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import LargeText from "./LargeText";
import Colors from "@constants/Colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icon.png")} />
      <LargeText>{`Tasit Decentraland`}</LargeText>
      <ActivityIndicator size="large" color={Colors.loadingColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
