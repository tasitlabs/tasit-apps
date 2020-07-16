import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import AccountInfo from "./components/AccountInfo";
import { Text, View } from "../../shared/components/Themed";

import { hooks } from "tasit";
const { useAccount } = hooks;

import { AccountContext } from "../../shared/context/AccountContext";

import useRandomBytes from "../../shared/hooks/useRandomBytes";

export default function AccountScreen(): JSX.Element {
  const {
    randomBytes,
    // isLoading: isLoadingBytes
  } = useRandomBytes(16);
  const randomBytesGenerated = randomBytes.length !== 0;

  const { setAccount } = useContext(AccountContext);

  const address = useAccount({
    randomBytes,
    randomBytesGenerated,
  });

  setAccount(address);

  // TODO: Put the address in React context for use on other screens

  const addressDefined: boolean = address !== "";

  // console.log({
  //   randomBytes,
  //   // isLoadingBytes
  // });

  if (!randomBytesGenerated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading bytes</Text>
      </View>
    );
  }

  if (!addressDefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Generating account</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <AccountInfo address={address} />
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
