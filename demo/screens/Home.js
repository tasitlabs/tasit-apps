import React from "react";
import { Image, Button, StyleSheet, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Account } from "tasit-sdk";
import ListLands from "./ListLands";
import LandClaim from "./LandClaim";

class Home extends React.Component {
	componentDidMount = async () => {
		let wallet = await Account.create();
		console.log(wallet.address);
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={require("../assets/images/icon.png")} />
				<Text style={styles.tasitText}>
					{`Tasit
          `}
				</Text>
				<Button
					title="Decentraland"
					onPress={() => this.props.navigation.navigate("ListLands")}
				/>
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
	tasitText: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		color: "gray",
	},
});

const AppNavigator = createStackNavigator(
	{
		Home: Home,
		ListLands: ListLands,
		LandClaim: LandClaim,
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "#f4511e",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		},
	}
);

export default createAppContainer(AppNavigator);
