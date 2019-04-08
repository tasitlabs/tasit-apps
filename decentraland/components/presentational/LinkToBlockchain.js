import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "native-base";
import { showError, openURL, buildBlockchainUrlFromAction } from "@helpers";

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

  //const networkName = getNetworkName();
  const networkName = "ropsten";
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
