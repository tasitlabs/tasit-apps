import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import AccountInfo from "./components/AccountInfo";
import { Text, View } from "../../shared/components/Themed";

import { hooks } from "tasit";
const { useAccount } = hooks;

import * as Random from "expo-random";

export default function AccountScreen() {
  const [randomBytes, setRandomBytes] = useState(new Uint8Array());
  const [isLoadingBytes, setIsLoadingBytes] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingBytes(true);
    async function makeRandomBytes() {
      const randomBytesThatWereGenerated = await Random.getRandomBytesAsync(16);
      setIsLoadingBytes(false);
      if (isMounted) {
        console.log("randomBytes generated");
        setRandomBytes(randomBytesThatWereGenerated);
      }
    }
    makeRandomBytes();
    return () => {
      isMounted = false;
    };
  }, []); // Just run this once

  const randomBytesGenerated = randomBytes.length !== 0;

  const address = useAccount({
    randomBytes,
    randomBytesGenerated,
  });

  const addressDefined = address !== "";

  if (isLoadingBytes) {
    return <Text style={styles.title}>Loading...</Text>;
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
