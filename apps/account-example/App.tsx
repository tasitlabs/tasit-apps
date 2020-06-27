import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Account from "@tasit/account";
import { useAccount, AccountOptions } from "@tasit/hooks";
import * as Random from 'expo-random';
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
  const [randomBytesGenerated, setRandomBytesGenerated] = useState(false);

  useEffect(() => {
    async function makeRandomBytes() {
      const randomBytes = await Random.getRandomBytesAsync(3);
      console.log('randomBytes generated');
      setRandomBytes(randomBytes);
      setRandomBytesGenerated(true);      
    }
    makeRandomBytes();
  }, []); // Just run this once

  const [address, addressDefined] = useAccount({
    randomBytes,
    randomBytesGenerated
  });

  return (
    <View style={styles.container}>
      <Text>{addressDefined ? "Ready" : "Not ready"}</Text>
      <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
