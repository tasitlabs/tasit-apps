import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Account } from "tasit-sdk";
import Button from "@presentational/Button";

export default class EthereumSignUpForm extends React.Component {
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
              onChangeText={() => {}}
              value={""}
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
