import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Account } from "tasit-sdk";

class HomeScreen extends React.Component {
	componentDidMount = async () => {
		let wallet = await Account.create();
		console.log(wallet.address);
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Welcome to the Tasit demo app</Text>
			</View>
		);
	}
}

const AppNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default createAppContainer(AppNavigator);
