import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromAction,
  getNetworkName,
} from "@helpers";

const supportedNetworks = ["ropsten"];

const _openLinkOf = async action => {
  const url = await buildBlockchainUrlFromAction(action);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open action link`);
  }
};

export default function LinkToBlockchain(props) {
  const { action } = props;

  // Note: Use 'ropsten' network for tests on development env
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (!isNetworkSupported || !action) return null;

  const openLink = () => _openLinkOf(action);
  return (
    <Button transparent onPress={openLink}>
      <Icon name="eye" />
    </Button>
  );
}

LinkToBlockchain.propTypes = {
  action: PropTypes.object,
};
