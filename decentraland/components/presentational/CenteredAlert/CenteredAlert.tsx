import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import LargeText from "../LargeText";

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});

type CenteredAlertProps = {
  text: string;
};

const CenteredAlert: React.FunctionComponent<CenteredAlertProps> = React.memo(
  ({ text }) => {
    return (
      <View style={styles.emptyContainer}>
        <LargeText>{text}</LargeText>
      </View>
    );
  }
);

export default CenteredAlert;
