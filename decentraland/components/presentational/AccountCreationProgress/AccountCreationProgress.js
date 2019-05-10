import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import AccountCreationStatus from "@constants/AccountCreationStatus";
import LinkToBlockchain from "@presentational/LinkToBlockchain";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Colors from "@constants/Colors";

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

export function AccountCreationProgress({ status, actions }) {
  const waitingForAccountSetup =
    status !== NOT_STARTED && status !== READY_TO_USE;

  if (!waitingForAccountSetup) return null;

  let statusToShow = [status];

  if (status === FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE)
    statusToShow = [FUNDING_WITH_MANA, APPROVING_MARKETPLACE];

  return statusToShow.map(status => {
    const waitingMessage = generateWaitingMessage(status);
    const { [status]: actionId } = actions;
    return (
      <ProgressMessageAndLink
        key={status}
        waitingMessage={waitingMessage}
        actionId={actionId}
      />
    );
  });
}

AccountCreationProgress.propTypes = {
  status: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export function ProgressMessageAndLink({ waitingMessage, actionId }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={2}>
          {waitingMessage}
        </Text>
      </View>
      <View>
        <LinkToBlockchain actionId={actionId} />
      </View>
    </View>
  );
}

ProgressMessageAndLink.propTypes = {
  waitingMessage: PropTypes.string,
  actionId: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: Colors.textColor,
  },
  textContainer: {
    maxWidth: responsiveWidth(80),
  },
});

export default AccountCreationProgress;
