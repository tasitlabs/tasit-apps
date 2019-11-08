import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

import LandForSale from "../LandForSale";
import Button from "../Button";
import AccountCreationProgress from "../AccountCreationProgress";
import Colors from "../../../constants/Colors";
import AccountCreationStatus from "../../../constants/AccountCreationStatus";
const { NOT_STARTED, READY_TO_USE } = AccountCreationStatus;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});

interface BuyLandProps {
  landForSale: object;
  onBuy: (...args: any[]) => any;
  accountCreationStatus: string;
  accountCreationActions: object;
}

const BuyLand: React.SFC<BuyLandProps> = props => {
  const {
    landForSale,
    onBuy,
    accountCreationStatus,
    accountCreationActions,
  } = props;

  const waitingForAccountSetup =
    accountCreationStatus !== NOT_STARTED &&
    accountCreationStatus !== READY_TO_USE;

  const onPress = waitingForAccountSetup ? (): void => {} : onBuy;
  const buttonDisabled = waitingForAccountSetup ? true : false;

  const buttonTitle =
    accountCreationStatus !== READY_TO_USE ? "Set up account" : "Buy";

  return (
    <View style={styles.container}>
      <LandForSale landForSale={landForSale} />
      <View style={styles.buttonView}>
        <Button
          title={buttonTitle}
          disabled={buttonDisabled}
          onPress={onPress}
        />
      </View>
      <AccountCreationProgress
        status={accountCreationStatus}
        actions={accountCreationActions}
      />
    </View>
  );
};

export default BuyLand;
