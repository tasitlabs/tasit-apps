import React from "react";
import { Image, Button, StyleSheet, View, Text, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class EthereumSignUp extends React.Component {
	state = {
		text: "",
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{`Cool. Let's start by picking your Tasit username.`}
				</Text>
				<View style={styles.userRow}>
					<View style={styles.userInputView}>
						<TextInput
							style={styles.userInput}
							onChangeText={text => this.setState({ text })}
							value={this.state.text}
							placeholder="username"
						/>
					</View>
					<View style={styles.ensView}>
						<Text style={styles.ensText}>{`.tasitid.eth`}</Text>
					</View>
				</View>
				<View style={styles.buttonView}>
					<Button title="Continue" onPress={() => {}} />
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
	text: {
		padding: 10,
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "gray",
	},
	userRow: { flexDirection: "row" },
	userInputView: { flex: 1, alignItems: "flex-end" },
	userInput: { justifyContent: "flex-start", width: 90, fontSize: 20 },
	ensView: { flex: 1 },
	ensText: { justifyContent: "flex-end", fontSize: 20 },
	buttonView: {
		flexDirection: "row",
		marginTop: 30,
	},
});
