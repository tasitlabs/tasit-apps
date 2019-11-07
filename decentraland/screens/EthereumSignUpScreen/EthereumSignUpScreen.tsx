import React from "react";
import { connect } from "react-redux";
import {
  setAccount,
  setAccountCreationStatus,
  updateActionIdForAccountCreationStatus
} from "../../redux/actions";
import EthereumSignUp from "../../components/presentational/EthereumSignUp";
import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
  createAccount
} from "../../helpers";
import AccountCreationStatus from "../../constants/AccountCreationStatus";
const {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE
} = AccountCreationStatus;
type EthereumSignUpScreenProps = {
  setAccount: (...args: any[]) => any,
  setAccountCreationStatus: (...args: any[]) => any,
  updateActionIdForAccountCreationStatus: (...args: any[]) => any
};
export class EthereumSignUpScreen extends React.Component<
  EthereumSignUpScreenProps,
  {}
> {
  _onboarding = async () => {
    try {
      const {
        setAccount,
        setAccountCreationStatus,
        updateActionIdForAccountCreationStatus
      } = this.props;
      // The pattern for each step is:
      // 1. alert with good info as soon as it's true
      // 2. update app state with action in progress if applicable
      // 3. persist any important side effects we may need
      //    later if applicable
      // 4. Change UI progress state on-screen
      const createAnAccount = async () => {
        console.info("About to call createAccount");
        const account = await createAccount();
        showInfo(`Account generated`);
        setAccount(account);
        setAccountCreationStatus(FUNDING_WITH_ETH);
        return account;
      };
      const fundWithEthers = async accountAddress => {
        const action = fundAccountWithEthers(accountAddress);
        await action.send();
        console.info("Sent the ETH transfer action");
        const actionId = await action.getId();
        console.info({ actionId });
        updateActionIdForAccountCreationStatus({
          status: FUNDING_WITH_ETH,
          actionId
        });
        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Account funded with ETH`);
        setAccountCreationStatus(FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE);
      };
      const fundWithMana = async accountAddress => {
        const action = fundAccountWithMana(accountAddress);
        await action.send();
        const actionId = await action.getId();
        updateActionIdForAccountCreationStatus({
          status: FUNDING_WITH_MANA,
          actionId
        });
        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Account funded with MANA`);
        setAccountCreationStatus(APPROVING_MARKETPLACE);
      };
      const approveMarketplace = async account => {
        const action = approveManaSpending(account);
        await action.send();
        const actionId = await action.getId();
        updateActionIdForAccountCreationStatus({
          status: APPROVING_MARKETPLACE,
          actionId
        });
        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Marketplace approved`);
        setAccountCreationStatus(FUNDING_WITH_MANA);
      };
      ///
      // Main control flow
      ///
      const account = await createAnAccount();
      const { address: accountAddress } = account;
      await fundWithEthers(accountAddress);
      await Promise.all([
        fundWithMana(accountAddress),
        approveMarketplace(account)
      ]);
      showInfo(`Now you can buy land!`);
      setAccountCreationStatus(READY_TO_USE);
    } catch (error) {
      showError(error);
    }
  };
  _onSignUp = () => {
    const { setAccountCreationStatus } = this.props;
    setAccountCreationStatus(GENERATING_ACCOUNT);
    // Note: A trick to force `_onboarding()` function to running async
    (async () => {})().then(() => {
      // Should run async but isn't when calling Account.create() or createFromPrivateKey()
      // See more: https://github.com/tasitlabs/tasit/issues/42#issuecomment-462534793
      this._onboarding();
    });
    this.props.navigation.navigate("BuyLandScreen");
  };
  render() {
    return <EthereumSignUp onSignUp={this._onSignUp} />;
  }
}
const mapDispatchToProps = {
  setAccount,
  setAccountCreationStatus,
  updateActionIdForAccountCreationStatus
};
export default connect(null, mapDispatchToProps)(EthereumSignUpScreen);