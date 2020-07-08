import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Option 1
// import Account from "@tasit/account";

// Option 2
// import { useAccount } from "@tasit/hooks";

// Option 3
import { hooks } from "tasit";
const { useAccount } = hooks;

import * as Random from "expo-random";
// ...

export default function App() {
  ///
  // Option 1: Use vanilla React hooks + @tasit/account
  ///

  // useEffect(() => {
  //   async function makeAccount() {
  //     const randomBytes = await Random.getRandomBytesAsync(16);

  //     const account = Account.createUsingRandomness(randomBytes);
  //     console.log({ account })
  //     const { address: accountAddress, privateKey } = account;
  //     console.log({ accountAddress });
  //     console.log({ privateKey });

  //   }
  //   makeAccount();
  // }, []); // Just run this once

  ///
  // Option 2: Use the useAccount hook from @tasit/hooks
  ///

  // Note: If your app has a single data store like redux or if it uses
  // Apollo which internally has a single data store, then you could use
  // a useReducer hook (in the case of redux) or a useMutation hook
  // (in the case of Apollo) rather than using useState here.
  const [randomBytes, setRandomBytes] = useState(new Uint8Array());
  // const [randomBytesGenerated, setRandomBytesGenerated] = useState(false);

  console.log("New render");
  console.log({ randomBytes });
  console.log("randomBytes.length");
  console.log(randomBytes.length);

  useEffect(() => {
    let isMounted = true;
    async function makeRandomBytes() {
      const randomBytesThatWereGenerated = await Random.getRandomBytesAsync(16);
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

  console.log({ address });

  const addressDefined = address !== "";

  return (
    <View style={styles.container}>
      <Text>{addressDefined ? "Ready" : "Not ready"}</Text>
      <Text>{randomBytesGenerated ? "Generated" : "Not generated"}</Text>
      <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
