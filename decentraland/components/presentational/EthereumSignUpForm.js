import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Colors from "@constants/Colors";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Button from "./Button";

export default class EthereumSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleUsername = username => this.setState({ username });

  render() {
    const { onSignUp } = this.props;

    return (
      <React.Fragment>
        <View style={styles.userRow}>
          <View style={styles.userInputView}>
            <UsernameTextInput
              handleUsername={this.handleUsername}
              username={this.state.username}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button title="Continue" onPress={onSignUp} />
        </View>
      </React.Fragment>
    );
  }
}

export function UsernameTextInput({ handleUsername, username }) {
  return (
    <TextInput
      autoCorrect={false}
      autoCapitalize="none"
      style={styles.userInput}
      onChangeText={handleUsername}
      value={username}
      placeholder="username"
      placeholderTextColor={Colors.placeholderTextColor}
      selectionColor={Colors.selection}
      keyboardAppearance="dark"
    />
  );
}

UsernameTextInput.propTypes = {
  handleUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

EthereumSignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

// TODO: Make the input box look a little nicer, maybe with a border

const styles = StyleSheet.create({
  userRow: { flexDirection: "row" },
  userInputView: { flex: 1, alignItems: "center" },
  userInput: {
    justifyContent: "flex-start",
    width: responsiveWidth(28),
    fontSize: responsiveFontSize(3),
    color: Colors.textColor,
    backgroundColor: Colors.formBackground,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
