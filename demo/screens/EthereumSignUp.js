import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { Header } from "react-navigation";
import Colors from "@constants/Colors";
import LargeText from "@presentational/LargeText";
import EthereumSignUpForm from "@presentational/EthereumSignUpForm";

export default class EthereumSignUp extends React.Component {
  render() {
    const OFFSET = 20;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + OFFSET}
        style={styles.container}
        behavior="padding"
      >
        <LargeText>{`Cool. Let's start by picking your Tasit username.`}</LargeText>
        <EthereumSignUpForm />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
