import React from "react";
import {
  Image,
  Button,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import LargeText from "./LargeText";
import Colors from "@constants/Colors";

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} />
      <LargeText>{`Tasit`}</LargeText>
      <Button title="Decentraland" onPress={props.onPress} />
      <LargeText>{`Decentraland`}</LargeText>
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
