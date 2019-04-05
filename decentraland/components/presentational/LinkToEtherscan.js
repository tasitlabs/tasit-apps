import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "native-base";
import {
  showError,
  openURL,
  getNetworkName,
  getTransactionHashFromAction,
} from "@helpers";

const supportedNetworks = ["ropsten"];

const _openEtherscanOf = async action => {
  const networkName = getNetworkName();
  const transactionHash = await getTransactionHashFromAction(action);
  const url = `https://${networkName}.etherscan.io/tx/${transactionHash}`;

  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open Etherscan for ${transactionHash}`);
  }
};

export default function LinkToEtherscan(props) {
  const { action } = props;

  //const networkName = getNetworkName();
  const networkName = "ropsten";
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (!isNetworkSupported || !action) return null;

  const openEtherscan = () => _openEtherscanOf(action);
  return (
    <Button transparent onPress={openEtherscan}>
      <Icon name="eye" />
    </Button>
  );
}

LinkToEtherscan.propTypes = {
  action: PropTypes.object,
};
