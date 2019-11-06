import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Header } from "react-navigation";

import Colors from "@constants/Colors";
import LargeText from "@presentational/LargeText";
import EthereumSignUpForm from "@presentational/EthereumSignUpForm";

export default class EthereumSignUp extends React.Component {
  render() {
    const OFFSET = responsiveHeight(3);
    const { onSignUp } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + OFFSET}
        style={styles.container}
        behavior="padding"
      >
        <LargeText>{`Cool. Let's start by picking your Tasit username.`}</LargeText>
        <EthereumSignUpForm onSignUp={onSignUp} />
      </KeyboardAvoidingView>
    );
  }
}

// TODO: Migrate me to TypeScript types
EthereumSignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
