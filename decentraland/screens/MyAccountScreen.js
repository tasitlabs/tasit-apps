import React from "react";
import MyAccount from "@presentational/MyAccount";
import { connect } from "react-redux";
import AccountCreationActions from "@constants/AccountCreationActions";
import { MISSING, DONE } from "@constants/ActionStatus";
import PropTypes from "prop-types";

export class MyAccountScreen extends React.Component {
  render() {
    const { accountInfo } = this.props;
    const creationSteps = [];

    creationSteps.push({
      name: "Account created",
      action: null,
      status: !accountInfo.account ? MISSING : DONE,
    });

    Object.keys(AccountCreationActions).forEach(action => {
      const creationAction = {
        name: AccountCreationActions[action].name,
        action,
      };
      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      if (accountInfo.creationActions.hasOwnProperty(action)) {
        creationAction.status = DONE;
      } else {
        creationAction.status = MISSING;
      }
      creationSteps.push(creationAction);
    });
    const isAccountCreated = !!accountInfo.account;
    return (
      <MyAccount
        progress={this._getPercentage(isAccountCreated, creationSteps)}
        creationActions={creationSteps}
      />
    );
  }

  _getPercentage(isAccountCreated, creationSteps) {
    let percentage = isAccountCreated ? 0.25 : 0;
    creationSteps.forEach(accountAction => {
      const isDone = accountAction.status === DONE;
      const hasDefinedActionPercentage = AccountCreationActions.hasOwnProperty(
        accountAction.action
      );
      if (isDone && hasDefinedActionPercentage) {
        percentage += AccountCreationActions[accountAction.action].percentage;
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
