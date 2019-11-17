import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Header } from "react-navigation-stack";
import Colors from "../../../constants/Colors";
import LargeText from "../LargeText";
import EthereumSignUpForm from "../EthereumSignUpForm";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});

type EthereumSignUpProps = {
  onUsernameSubmit: () => void;
};

export default class EthereumSignUp extends React.Component<
  EthereumSignUpProps,
  {}
> {
  render(): JSX.Element {
    const OFFSET = responsiveHeight(3);
    const { onUsernameSubmit } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + OFFSET}
        style={styles.container}
        behavior="padding"
      >
        <LargeText>{`Cool. Let's start by picking your Tasit username.`}</LargeText>
        <EthereumSignUpForm onUsernameSubmit={onUsernameSubmit} />
      </KeyboardAvoidingView>
    );
  }
}
