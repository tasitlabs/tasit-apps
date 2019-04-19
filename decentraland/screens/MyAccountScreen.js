import React from "react";
import MyAccount from "@presentational/MyAccount";
import { connect } from "react-redux";
import AccountCreationActions from "@constants/AccountCreationActions";
import { MISSING, DONE } from "@constants/ActionStatus";
import PropTypes from "prop-types";

export class MyAccountScreen extends React.Component {
  render() {
    const { accountInfo } = this.props;
    const { creationActions, account } = accountInfo;
    const isAccountCreated = account !== null;

    const creationSteps = [];

    creationSteps.push({
      name: "Account created",
      action: null,
      status: isAccountCreated ? DONE : MISSING,
    });

    Object.keys(AccountCreationActions).forEach(creationStatus => {
      const creationAction = {
        name: AccountCreationActions[creationStatus].name,
        action: creationStatus,
      };
      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      if (creationActions.hasOwnProperty(creationStatus)) {
        creationAction.status = DONE;
      } else {
        creationAction.status = MISSING;
      }
      creationSteps.push(creationAction);
    });

    return (
      <MyAccount
        progress={this._getPercentage(isAccountCreated, creationSteps)}
        creationActions={creationSteps}
      />
    );
  }

  _getPercentage(isAccountCreated, creationSteps) {
    let percentage = isAccountCreated ? 0.25 : 0;
    creationSteps.forEach(creationStep => {
      const { status, action } = creationStep;
      const isDone = status === DONE;
      const hasDefinedActionPercentage = AccountCreationActions.hasOwnProperty(
        action
      );
      if (isDone && hasDefinedActionPercentage) {
        percentage += AccountCreationActions[action].percentage;
      }
    });
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
