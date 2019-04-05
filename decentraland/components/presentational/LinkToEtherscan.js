import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "native-base";
import { showError, openURL } from "@helpers";

const _openEtherscanOf = async address => {
  const url = `https://etherscan.io/address/${address}`;

  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open Etherscan for ${address}`);
  }
};

export default function LinkToEtherscan(props) {
  const { account } = props;

  if (account) {
    const { address } = account;
    const openEtherscan = () => _openEtherscanOf(address);
    return (
      <Button transparent onPress={openEtherscan}>
        <Icon name="eye" />
      </Button>
    );
  }

  return null;
}

LinkToEtherscan.propTypes = {
  account: PropTypes.object,
};
