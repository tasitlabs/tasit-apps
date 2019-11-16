import React from "react";
import MyProfile from "../../components/presentational/MyProfile";
import { connect } from "react-redux";

import {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "../../constants/AccountCreationStatus";

import ActionStatus from "../../types/ActionStatus";

const creationSteps = [
  {
    name: "Account created",
    creationStatus: GENERATING_ACCOUNT,
    percentage: 0.25,
  },
  {
    creationStatus: FUNDING_WITH_ETH,
    name: "Funded with ETH",
    percentage: 0.25,
  },
  {
    creationStatus: FUNDING_WITH_MANA,
    name: "Funded with MANA tokens",
    percentage: 0.25,
  },
  {
    creationStatus: APPROVING_MARKETPLACE,
    name: "Linked to marketplace",
    percentage: 0.25,
  },
];

const stepWasDone = (step, accountInfo): boolean => {
  const { creationActions, account } = accountInfo;
  const { creationStatus } = step;
  const statusWithAction = [
    FUNDING_WITH_ETH,
    FUNDING_WITH_MANA,
    APPROVING_MARKETPLACE,
  ];
  if (creationStatus === GENERATING_ACCOUNT) {
    const isAccountCreated = account !== null;
    return isAccountCreated;
  } else if (statusWithAction.includes(creationStatus)) {
    const hasAnAction = creationActions[creationStatus] !== undefined;
    return hasAnAction;
  }
};

import { NavigationStackProp } from "react-navigation-stack";

type MyProfileScreenProps = {
  accountInfo?: object;
  navigation: NavigationStackProp;
};

export class MyProfileScreen extends React.Component<MyProfileScreenProps, {}> {
  render(): JSX.Element {
    const { accountInfo } = this.props;

    const onConnectClick = (): boolean =>
      this.props.navigation.navigate("EthereumSignInScreen");

    const onUpgradeSecurityClick = (): boolean =>
      this.props.navigation.navigate("EthereumUpgradeSecurityScreen");

    const creationStepsWithStatus = creationSteps.map(step => {
      const wasDone = stepWasDone(step, accountInfo);
      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      const status = wasDone ? ActionStatus.DONE : ActionStatus.MISSING;
      return { ...step, status };
    });

    return (
      <MyProfile
        progress={this._getPercentage(creationStepsWithStatus)}
        creationSteps={creationStepsWithStatus}
        onConnectClick={onConnectClick}
        onUpgradeSecurityClick={onUpgradeSecurityClick}
      />
    );
  }

  _getPercentage(creationSteps): number {
    const percentage = creationSteps
      .filter(step => step.status === ActionStatus.DONE)
      .reduce((total, step) => total + step.percentage, 0);
    return percentage;
  }
}

const mapStateToProps = (state): object => {
  const { accountInfo } = state;
  return { accountInfo };
};

export default connect(mapStateToProps)(MyProfileScreen);
