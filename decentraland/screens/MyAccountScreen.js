import React from "react";
import MyAccount from "@presentational/MyAccount";
import { connect } from "react-redux";
import {
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "@constants/AccountCreationStatus";
import { MISSING, DONE } from "@constants/ActionStatus";
import PropTypes from "prop-types";

const StepsWithAction = [
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

    const creationSteps = [];

    creationSteps.push({
      name: "Account created",
      creationStatus: null,
      status: isAccountCreated ? DONE : MISSING,
      percentage: 0.25,
    });

    StepsWithAction.forEach(stepWithAction => {
      const { name, creationStatus, percentage } = stepWithAction;

      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      const status = creationActions[creationStatus] ? DONE : MISSING;

      const creationStep = { name, creationStatus, status, percentage };
      creationSteps.push(creationStep);
    });

    return (
      <MyAccount
        progress={this._getPercentage(isAccountCreated, creationSteps)}
        creationSteps={creationSteps.map(cs => {
          return {
            name: cs.name,
            action: cs.creationStatus,
            status: cs.status,
          };
        })}
      />
    );
  }

  _getPercentage(isAccountCreated, creationSteps) {
    let total = 0;
    creationSteps.forEach(creationStep => {
      const { status, percentage } = creationStep;
      const isDone = status === DONE;
      if (isDone) total += percentage;
    });
    return total;
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
