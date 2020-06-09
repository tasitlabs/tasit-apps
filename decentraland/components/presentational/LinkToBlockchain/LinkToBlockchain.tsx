import React from "react";

import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromActionId,
  buildBlockchainUrlFromAddress,
  getNetworkName,
} from "../../../helpers";
import Colors from "../../../constants/Colors";

const _openLinkOfAction = async (actionId: any): Promise<void> => {
  const url = buildBlockchainUrlFromActionId(actionId);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open action link`);
  }
};

const _openLinkOfAddress = async (address: string): Promise<void> => {
  const url = buildBlockchainUrlFromAddress(address);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open address link`);
  }
};

const _openLinkInfo = (type: string): void => {
  const title = "";
  const message = `Shows the ${type} details on the real chains.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

const _onPress = (type: string, actionId?: any, address?: string): void => {
  const supportedNetworks = ["ropsten", "rinkeby"];
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);
  console.log({ isNetworkSupported });
  console.log({ type });

  if (isNetworkSupported && type === "action") _openLinkOfAction(actionId);
  if (isNetworkSupported && type === "address") _openLinkOfAddress(address);
  else _openLinkInfo(type);
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.linkColor,
  },
  touchable: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

interface LinkToBlockchainProps {
  actionId?: string;
  address?: string;
  type: string;
}

const LinkToBlockchain: React.FunctionComponent<LinkToBlockchainProps> = ({
  actionId,
  address,
  type,
}) => {
  if (!type) return null;
  if (!address && !actionId) return null;

  const onPress = (): void => {
    _onPress(type, actionId, address);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <Icon name="eye" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default LinkToBlockchain;
