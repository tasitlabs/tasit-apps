import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import AccountCreationStatus from "@constants/AccountCreationStatus";
import LinkToBlockchain from "./LinkToBlockchain";
import { responsiveWidth } from "react-native-responsive-dimensions";

const {
  NOT_STARTED,
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

const generateWaitingMessage = status => {
  let waitingMessage = "";
  switch (status) {
    case NOT_STARTED:
      break;
    case GENERATING_ACCOUNT:
      waitingMessage = "Generating account...";
      break;
    case FUNDING_WITH_ETH:
      waitingMessage = "Funding account with ETH...";
      break;
    case FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE:
      waitingMessage = "Funding account with MANA and approving marketplace...";
      break;
    case FUNDING_WITH_MANA:
      waitingMessage = "Funding account with MANA...";
      break;
    case APPROVING_MARKETPLACE:
      waitingMessage = "Approving marketplace...";
      break;
    case READY_TO_USE:
      break;
    default:
  }

  return waitingMessage;
};

export default function AccountCreationProgress(props) {
  const { status, action } = props;

  const waitingForAccountSetup =
    status !== NOT_STARTED && status !== READY_TO_USE;

  if (!waitingForAccountSetup) return null;

  const waitingMessage = generateWaitingMessage(status);
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text adjustsFontSizeToFit={true} numberOfLines={2}>
          {waitingMessage}
        </Text>
      </View>
      <View>
        <LinkToBlockchain action={action} />
      </View>
    </View>
  );
}

AccountCreationProgress.propTypes = {
  status: PropTypes.string.isRequired,
  action: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    maxWidth: responsiveWidth(80),
  },
});
