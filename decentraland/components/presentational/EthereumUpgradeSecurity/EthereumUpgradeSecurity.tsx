import React, { useState, useEffect } from "react";

import { Text } from "react-native";

// interface EthereumUpgradeSecurityProps {}

import CenteredAlert from "../CenteredAlert";

const EthereumUpgradeSecurity: React.FunctionComponent<{}> = () => {
  const [isDeployed, setIsDeployed] = useState(null);

  useEffect(() => {
    function handleDeploymentComplete() {
      setIsDeployed(true);
    }

    // TODO: Hit the API to deploy a new contract

    handleDeploymentComplete();

    return function cleanup() {
      // TODO: Cancel any unwanted remnants of having already made this request
    };
  });

  if (isDeployed === null) {
    return <CenteredAlert text="Loading..." />;
  }
  return isDeployed ? (
    <Text>Deployed</Text>
  ) : (
    <CenteredAlert text="Not yet deployed" />
  );
};

export default EthereumUpgradeSecurity;
