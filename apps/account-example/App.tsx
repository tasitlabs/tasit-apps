import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from "@tasit/account";
import { useAccount, AccountOptions } from "@tasit/hooks";
import * as Random from 'expo-random';
// ...

export default function App() {
  useEffect(() => {
    async function makeAccount() {
      const randomBytes = await Random.getRandomBytesAsync(16);

      // Using Account
      const account = Account.createUsingRandomness(randomBytes);
      console.log({ account })
      const { address: accountAddress, privateKey } = account;
      console.log({ accountAddress });
      console.log({ privateKey });
      
      // Using useAccount hook
      const options: AccountOptions = {
        randomBytes
      }
      const [address, addressDefined] = useAccount(options);
    }
    makeAccount();
  }, []); // Our effect doesn't use any variables in the component scope

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
