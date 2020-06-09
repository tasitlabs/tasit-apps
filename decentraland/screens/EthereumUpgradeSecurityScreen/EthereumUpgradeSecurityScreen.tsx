import React from "react";
import { connect } from "react-redux";

import EthereumUpgradeSecurity from "../../components/stateful/EthereumUpgradeSecurity";

interface EthereumUpgradeSecurityScreenProps {
  account: any;
}

const EthereumUpgradeSecurityScreen: React.FunctionComponent<EthereumUpgradeSecurityScreenProps> = ({
  account,
}) => {
  return <EthereumUpgradeSecurity account={account} />;
};

const mapStateToProps = (state: { accountInfo: any }): object => {
  const { accountInfo } = state;
  // Object {
  //   "account": null,
  //   "creationActions": Object {},
  //   "creationStatus": "NOT_STARTED",
  // }
  const { account } = accountInfo;
  return { account };
};

export default connect(mapStateToProps)(EthereumUpgradeSecurityScreen);
