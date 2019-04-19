import React from "react";
import MyAccount from "@presentational/MyAccount";
import { connect } from "react-redux";
import {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "@constants/AccountCreationStatus";
import { MISSING, DONE } from "@constants/ActionStatus";
import PropTypes from "prop-types";

const creationSteps = [
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

export class MyAccountScreen extends React.Component {
  render() {
    const { accountInfo } = this.props;
    const { creationActions, account } = accountInfo;
    const isAccountCreated = account !== null;

    const accountStep = {
      name: "Account created",
      creationStatus: GENERATING_ACCOUNT,
      status: isAccountCreated ? DONE : MISSING,
      percentage: 0.25,
    };

    let creationStepsWithStatus = creationSteps.map(stepWithAction => {
      const { creationStatus } = stepWithAction;

      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      const status = creationActions[creationStatus] ? DONE : MISSING;

      const creationStep = { ...stepWithAction, status };

      return creationStep;
    });

    creationStepsWithStatus = [accountStep, ...creationStepsWithStatus];

    return (
      <MyAccount
        progress={this._getPercentage(creationStepsWithStatus)}
        creationSteps={creationStepsWithStatus}
      />
    );
  }

  _getPercentage(creationSteps) {
    const percentage = creationSteps
      .filter(step => step.status === DONE)
      .reduce((total, step) => total + step.percentage, 0);

    return percentage;
  }
}

MyAccountScreen.propTypes = {
  accountInfo: PropTypes.object,
};

const mapStateToProps = state => {
  const { accountInfo } = state;
  return { accountInfo };
};

export default connect(mapStateToProps)(MyAccountScreen);
