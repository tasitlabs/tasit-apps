import React from "react";
import { Image, Button, StyleSheet, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class EthereumQuestion extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.questionText}>
					{`Are you new to Ethereum?

          `}
				</Text>
				<Button
					title="Yep"
					onPress={() => this.props.navigation.navigate("EthereumSignUp")}
				/>
				<Text>
					{`
          `}
				</Text>
				<Button title="Nope" onPress={() => {}} />
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
	questionText: {
		padding: 10,
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "gray",
	},
});
