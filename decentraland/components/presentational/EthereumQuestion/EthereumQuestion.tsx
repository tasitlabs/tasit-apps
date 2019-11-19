import React from "react";
import { StyleSheet, View } from "react-native";

import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "../LargeText";
import Button from "../Button";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(4),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});

interface EthereumQuestionProps {
  onSignUp: (...args: any[]) => any;
  onSignIn: (...args: any[]) => any;
}

const EthereumQuestion: React.FunctionComponent<EthereumQuestionProps> = props => {
  return (
    <View style={styles.container}>
      <LargeText>{`Are you new to Ethereum?`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Yep" onPress={props.onSignUp} />
      </View>
      <View style={styles.buttonView}>
        <Button title="Nope" onPress={props.onSignIn} />
      </View>
    </View>
  );
};

export default EthereumQuestion;
