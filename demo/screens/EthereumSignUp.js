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
				<Text style={styles.questionText}>
					{`Cool. Let's start by picking your Tasit username.
          `}
				</Text>
				<View style={{ flexDirection: "row" }}>
					<View style={{ flex: 1, alignItems: "flex-end" }}>
						<TextInput
							style={{ justifyContent: "flex-start", width: 90, fontSize: 20 }}
							onChangeText={text => this.setState({ text })}
							value={this.state.text}
							placeholder="username"
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Text
							style={{ justifyContent: "flex-end", fontSize: 20 }}
						>{`.tasitid.eth`}</Text>
					</View>
				</View>

				<View style={{ flexDirection: "row", marginTop: 30 }}>
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
	questionText: {
		padding: 10,
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "gray",
	},
});
