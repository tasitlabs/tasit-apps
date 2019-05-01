import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

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

  render() {
    const { onSignUp } = this.props;

    return (
      <React.Fragment>
        <View style={styles.userRow}>
          <View style={styles.userInputView}>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.userInput}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              placeholder="username"
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

EthereumSignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  userRow: { flexDirection: "row" },
  userInputView: { flex: 1, alignItems: "center" },
  userInput: {
    justifyContent: "flex-start",
    width: responsiveWidth(28),
    fontSize: responsiveFontSize(3),
  },
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
