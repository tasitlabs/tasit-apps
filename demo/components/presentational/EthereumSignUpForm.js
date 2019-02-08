import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { setAccount } from "../../actions";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Button from "./Button";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
const accountPrivateKey =
  "0x4f09311114f0ff4dfad0edaa932a3e01a4ee9f34da2cbd087aa0e6ffcb9eb322";

export class EthereumSignUpForm extends React.Component {
  // Note: As same as Account.create(), this functions isn't running as async.
  // Timeout Between button click and screen change (afterSignUp()) is abount 5 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  _createAccount = async () => {
    const { setAccount } = this.props;
    const account = createFromPrivateKey(accountPrivateKey);
    setAccount(account);
  };

  _onContinue = () => {
    const { afterSignUp } = this.props;

    // Should run async but isn't when calling Account.create() or createFromPrivateKey()
    this._createAccount();

    afterSignUp();
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
              onChangeText={() => {}}
              value={""}
              placeholder="username"
            />
          </View>
          <View style={styles.ensView}>
            <Text style={styles.ensText}>{`.tasitid.eth`}</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button title="Continue" onPress={() => this._onContinue()} />
        </View>
      </React.Fragment>
    );
  }
}

EthereumSignUpForm.propTypes = {
  afterSignUp: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpForm);

const styles = StyleSheet.create({
  userRow: { flexDirection: "row" },
  userInputView: { flex: 1, alignItems: "flex-end" },
  userInput: {
    justifyContent: "flex-start",
    width: responsiveWidth(28),
    fontSize: responsiveFontSize(3),
  },
  ensView: { flex: 1 },
  ensText: { justifyContent: "flex-end", fontSize: responsiveFontSize(3) },
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
