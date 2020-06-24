import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from "@tasit/account";
import * as Random from 'expo-random';
// ...

export default function App() {
  // const randomBytes = await Random.getRandomBytesAsync(16);
  Account.create();
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
