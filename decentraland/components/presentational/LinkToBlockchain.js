import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { Button, Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromActionId,
  getNetworkName,
} from "@helpers";

const _openLinkOf = async actionId => {
  const url = buildBlockchainUrlFromActionId(actionId);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open action link`);
  }
};

const _openLinkInfo = () => {
  const title = "";
  const message = `Shows the action details on the real chains.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

const _onPress = actionId => {
  const supportedNetworks = ["ropsten"];
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (isNetworkSupported) _openLinkOf(actionId);
  else _openLinkInfo();
};

export default function LinkToBlockchain({ actionId }) {
  if (!actionId) return null;

  const onPress = () => {
    _onPress(actionId);
  };

  return (
    <Button transparent onPress={onPress}>
      <Icon name="eye" />
    </Button>
  );
}

LinkToBlockchain.propTypes = {
  actionId: PropTypes.string,
};
