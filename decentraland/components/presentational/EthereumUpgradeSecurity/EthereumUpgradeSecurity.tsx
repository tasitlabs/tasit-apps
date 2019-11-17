import React, { useState, useEffect } from "react";

import { Text } from "react-native";

interface EthereumUpgradeSecurityProps {}

const EthereumUpgradeSecurity: React.SFC<EthereumUpgradeSecurityProps> = () => {
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
    return <Text>Loading...</Text>;
  }
  return isDeployed ? <Text>Deployed</Text> : <Text>Not yet deployed</Text>;
};

export default EthereumUpgradeSecurity;
