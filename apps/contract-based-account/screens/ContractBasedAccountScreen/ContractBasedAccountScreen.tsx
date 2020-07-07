import * as React from "react";
import { StyleSheet } from "react-native";

import ContractBasedAccountInfo from "./components/ContractBasedAccountInfo";
import { Text, View } from "../../shared/components/Themed";

import { hooks } from "tasit";
const { useGnosisSafe } = hooks;

export default function ContractBasedAccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contract-based account</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ContractBasedAccountInfo address="{feature coming soon}" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
