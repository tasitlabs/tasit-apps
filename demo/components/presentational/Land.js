import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function Land({ land }) {
  return (
    <View style={styles.landContainer}>
      <Image source={land.img} />
      <Text>{land.name}</Text>
      <Text>
        {land.priceMana} MANA (~${land.priceUsd})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  landContainer: {
    width: 224,
  },
});
