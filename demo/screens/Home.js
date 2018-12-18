import React from "react";
import { Image, Button, StyleSheet, View } from "react-native";
import LargeText from "../components/presentational/LargeText";
import Colors from "../constants/Colors";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/icon.png")} />
        <LargeText>{`Tasit`}</LargeText>
        <Button
          title="Decentraland"
          onPress={() => this.props.navigation.navigate("ListLands")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
