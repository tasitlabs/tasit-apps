import React from "react";
import MyAccount from "@presentational/MyAccount";
import { connect } from "react-redux";
import AccountCreationActions from "@constants/AccountCreationActions";
import ActionStatus from "../constants/ActionStatus";
import PropTypes from "prop-types";

export class MyAccountScreen extends React.Component {
  static navigationOptions = {
    title: "My Account",
  };

  render() {
    const { accountInfo } = this.props;
    const creationActions = [];
    creationActions.push({
      name: "Account created",
      action: null,
      status: !accountInfo.account ? ActionStatus.MISSING : ActionStatus.DONE,
    });
    Object.keys(AccountCreationActions).forEach(action => {
      const creationAction = {
        name: AccountCreationActions[action].name,
        action,
      };
      // TODO: As soon as we store action status in redux, this logic will change
      // transaction pending, confirmed once, confirmed many times, failed, etc.
      if (accountInfo.creationActions.hasOwnProperty(action)) {
        creationAction.status = ActionStatus.DONE;
      } else {
        creationAction.status = ActionStatus.MISSING;
      }
      creationActions.push(creationAction);
    });
    return (
      <MyAccount
        progress={this._getPercentage(!!accountInfo.account, creationActions)}
        creationActions={creationActions}
      />
    );
  }

  _getPercentage(isAccountCreated, accountActions) {
    let percentage = isAccountCreated ? 0.2 : 0;
    accountActions.forEach(accountAction => {
      if (
        accountAction.status === ActionStatus.DONE &&
        AccountCreationActions.hasOwnProperty(accountAction.action)
      ) {
        percentage += AccountCreationActions[accountAction.action].percentage;
      }
    });
    return Math.round(percentage);
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
