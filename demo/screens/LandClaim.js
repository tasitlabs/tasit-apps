import React from "react";
import { ListView, Image, StyleSheet, View, Text, Button } from "react-native";
import Land from "../presentational/Land";

export default class Lands extends React.Component {
	render() {
		const { navigation } = this.props;
		const land = navigation.getParam("land", {
			id: -1,
			name: "Not found",
			img: require("../assets/images/icon.png"),
			priceMana: 0,
			priceUsd: 0,
		});
		return (
			<View style={styles.container}>
				<Land land={land} />
				<View style={styles.buttonView}>
					<Button
						style={styles.claimButton}
						title="Claim"
						onPress={() => this.props.navigation.navigate("OnboardingHome")}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonView: {
		flexDirection: "row",
		marginTop: 30,
	},
});
