import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Colors from "@constants/Colors";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Button from "@presentational/Button";

export default class EthereumSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  onUsernameChange = username => this.setState({ username });

  render() {
    const { onSignUp } = this.props;

    return (
      <React.Fragment>
        <View style={styles.userRow}>
          <View style={styles.userInputView}>
            <UsernameTextInput
              onChange={this.onUsernameChange}
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

export function UsernameTextInput({ onChange, username }) {
  return (
    <TextInput
      autoCorrect={false}
      autoFocus={true}
      autoCapitalize="none"
      style={styles.userInput}
      onChangeText={onChange}
      value={username}
      placeholder="username"
      placeholderTextColor={Colors.placeholderTextColor}
      selectionColor={Colors.selection}
      keyboardAppearance="dark"
    />
  );
}

UsernameTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

EthereumSignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

// TODO: Make the input box look a little nicer, maybe with a border

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  userInput: {
    backgroundColor: Colors.formBackground,
    color: Colors.textColor,
    fontSize: responsiveFontSize(3),
    justifyContent: "flex-start",
    width: responsiveWidth(48),
  },
  userInputView: { alignItems: "center", flex: 1 },
  userRow: { flexDirection: "row" },
});
