import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";
import { Account } from "tasit-sdk";

export default class EthereumSignUpForm extends React.Component {
  state = {
    text: "",
    address: "",
  };

  createAccount = async () => {
    // TODO: Remove await when SDK 0.0.3 is out
    const wallet = await Account.create();
    this.setState({ address: wallet.address });
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.userRow}>
          <View style={styles.userInputView}>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
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
          <Button title="Continue" onPress={() => this.createAccount()} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
