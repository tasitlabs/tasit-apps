import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { Button, Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromAction,
  getNetworkName,
} from "@helpers";

const _openLinkOf = async action => {
  const url = await buildBlockchainUrlFromAction(action);
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

const _onPress = action => {
  const supportedNetworks = ["ropsten"];
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (isNetworkSupported) _openLinkOf(action);
  else _openLinkInfo();
};

export default function LinkToBlockchain(props) {
  const { action } = props;
  if (!action) return null;

  return (
    <Button transparent onPress={_onPress}>
      <Icon name="eye" />
    </Button>
  );
}

LinkToBlockchain.propTypes = {
  action: PropTypes.object,
};
