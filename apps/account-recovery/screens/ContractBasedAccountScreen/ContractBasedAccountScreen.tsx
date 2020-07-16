import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import ContractBasedAccountInfo from "./components/ContractBasedAccountInfo";
import AccountInfo from "../AccountScreen/components/AccountInfo";
import { Text, View } from "../../shared/components/Themed";

import { hooks } from "tasit";
const { useGnosisSafe } = hooks;

import { AccountContext } from "../../shared/context/AccountContext";

import useRandomBytes from "../../shared/hooks/useRandomBytes";

import Constants from "expo-constants";

export default function ContractBasedAccountScreen(): JSX.Element {
  const {
    randomBytes,
    // isLoading: isLoadingBytes
  } = useRandomBytes(5);

  const { account } = useContext(AccountContext);

  const isLoadingBytes = randomBytes.length === 0;

  const { manifest } = Constants;
  const { extra } = manifest;
  const { baseURL } = extra;
  console.log({ baseURL });

  const {
    address,
    hasError,
    // isLoading: isLoadingSafe
  } = useGnosisSafe(
    [account], // TODO: Use address from the other screen
    1,
    randomBytes,
    baseURL
  );

  const isLoadingSafe = address === "";

  if (isLoadingBytes) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading random bytes</Text>
      </View>
    );
  }
  if (isLoadingSafe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Gnosis Safe</Text>
      </View>
    );
  }
  if (hasError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contract-based account</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <AccountInfo address={account} />
      <ContractBasedAccountInfo address={address} />
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
