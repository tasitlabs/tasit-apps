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
      creationStatus: null,
      status: isAccountCreated ? DONE : MISSING,
    });

    Object.keys(AccountCreationActions).forEach(creationStatus => {
      const name = AccountCreationActions[creationStatus].name;

      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      const status = creationActions.hasOwnProperty(creationStatus)
        ? DONE
        : MISSING;

      const creationStep = { name, creationStatus, status };
      creationSteps.push(creationStep);
    });

    return (
      <MyAccount
        progress={this._getPercentage(isAccountCreated, creationSteps)}
        creationActions={creationSteps.map(cs => {
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
    let percentage = isAccountCreated ? 0.25 : 0;
    creationSteps.forEach(creationStep => {
      const { status, creationStatus } = creationStep;
      const isDone = status === DONE;
      const hasDefinedActionPercentage = AccountCreationActions.hasOwnProperty(
        creationStatus
      );
      if (isDone && hasDefinedActionPercentage) {
        percentage += AccountCreationActions[creationStatus].percentage;
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
