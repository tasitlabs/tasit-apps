import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Land from "./Land";
import Colors from "@constants/Colors";

export default function LandClaim(props) {
  return (
    <View style={styles.container}>
      <Land land={props.land} />
      <View style={styles.buttonView}>
        <Button
          style={styles.claimButton}
          title="Claim"
          onPress={props.onClaim}
        />
      </View>
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
  buttonView: {
    flexDirection: "row",
    marginTop: 30,
  },
});
