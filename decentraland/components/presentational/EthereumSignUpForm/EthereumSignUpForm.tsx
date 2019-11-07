import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Colors from "../../../constants/Colors";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import Button from "../Button";

interface EthereumSignUpFormProps {
  onSignUp: any; // TODO: Change me to a function type
}

export default class EthereumSignUpForm extends React.Component<
  EthereumSignUpFormProps
> {
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

interface UsernameTextInputProps {
  onChange: any; // TODO: Change me to a function type
  username: string;
}

export const UsernameTextInput: React.SFC<UsernameTextInputProps> = ({
  onChange,
  username,
}) => {
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
};
