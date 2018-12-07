import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default class Land extends React.Component {
  render() {
    const { name, img, priceMana, priceUsd } = this.props.land;
    return (
      <View style={styles.landContainer}>
        <Image source={img} />
        <Text>{name}</Text>
        <Text>
          MANA {priceMana} (~ ${priceUsd})
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landContainer: {
    width: 224,
  },
});
