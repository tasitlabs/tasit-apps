import React from "react";
import { ListView, Image, StyleSheet, View, Text } from "react-native";

export default class ListLands extends React.Component {
	renderRow = rowData => {};

	render() {
		const { id, name, img, priceMana, priceUsd } = this.props.land;
		return (
			<View style={styles.landContainer}>
				<Image source={img} />
				<Text>{name}</Text>
				<Text>
					⏣ {priceMana} (~ ${priceUsd})
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
