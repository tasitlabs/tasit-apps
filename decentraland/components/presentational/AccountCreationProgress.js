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
  switch (status) {
    case NOT_STARTED:
      break;
    case GENERATING_ACCOUNT:
      return "Generating account...";
    case FUNDING_WITH_ETH:
      return "Funding account with ETH...";
    case FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE:
      return "Funding account with MANA and approving marketplace...";
    case FUNDING_WITH_MANA:
      return "Funding account with MANA...";
    case APPROVING_MARKETPLACE:
      return "Approving marketplace...";
    case READY_TO_USE:
      break;
  }
  return "";
};

export default function AccountCreationProgress(props) {
  const { status, actions } = props;

  const waitingForAccountSetup =
    status !== NOT_STARTED && status !== READY_TO_USE;

  if (!waitingForAccountSetup) return null;

  let statusToShow = [status];

  if (status === FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE)
    statusToShow = [FUNDING_WITH_MANA, APPROVING_MARKETPLACE];

  return statusToShow.map(status => {
    const waitingMessage = generateWaitingMessage(status);
    const { [status]: action } = actions;
    return (
      <ProgressMessageAndLink
        key={status}
        waitingMessage={waitingMessage}
        action={action}
      />
    );
  });
}

AccountCreationProgress.propTypes = {
  status: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

// Should we extract this component from here?
function ProgressMessageAndLink(props) {
  const { waitingMessage, action } = props;

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

ProgressMessageAndLink.propTypes = {
  waitingMessage: PropTypes.string,
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
