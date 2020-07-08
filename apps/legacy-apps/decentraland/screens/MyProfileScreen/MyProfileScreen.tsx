import React from "react";
import MyProfile from "../../components/presentational/MyProfile";
import { useSelector } from "react-redux";

import { GlobalState } from "../../types/GlobalState";

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

const stepWasDone = (
  step: { name?: string; creationStatus: any; percentage?: number },
  accountInfo: AccountInfo
): boolean => {
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

interface AccountInfo {
  account: string;
  creationActions: any;
}

type MyProfileScreenProps = {
  navigation: NavigationStackProp;
};

function _getPercentage(
  creationSteps: {
    status: ActionStatus;
    name: string;
    creationStatus: string;
    percentage: number;
  }[]
): number {
  const percentage = creationSteps
    .filter(
      (step: { status: ActionStatus }) => step.status === ActionStatus.DONE
    )
    .reduce(
      (total: number, step: { percentage: number }) => total + step.percentage,
      0
    );
  return percentage;
}

export const MyProfileScreen: React.FunctionComponent<MyProfileScreenProps> = ({
  navigation,
}) => {
  const { accountInfo } = useSelector<GlobalState, GlobalState>(state => state);

  const onConnectClick = (): boolean =>
    navigation.navigate("EthereumSignInScreen");

  const { account } = accountInfo;

  const onUpgradeSecurityClick = (): boolean =>
    account
      ? navigation.navigate("EthereumUpgradeSecurityScreen")
      : navigation.navigate("OnboardingHomeScreen");

  const creationStepsWithStatus = creationSteps.map(step => {
    const wasDone = stepWasDone(step, accountInfo);
    // TODO: As soon as we store action status in redux, this logic will change
    // transaction pending, confirmed once, confirmed many times, failed, etc.
    const status = wasDone ? ActionStatus.DONE : ActionStatus.MISSING;
    return { ...step, status };
  });

  return (
    <MyProfile
      progress={_getPercentage(creationStepsWithStatus)}
      creationSteps={creationStepsWithStatus}
      onConnectClick={onConnectClick}
      onUpgradeSecurityClick={onUpgradeSecurityClick}
      securityLabel={account ? "Upgrade security more" : "Upgrade security"}
    />
  );
};

export default MyProfileScreen;
