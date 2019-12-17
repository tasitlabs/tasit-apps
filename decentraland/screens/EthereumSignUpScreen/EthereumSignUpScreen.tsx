import React from "react";
import { connect } from "react-redux";

import { Account } from "tasit-sdk";

import {
  setAccount,
  setAccountCreationStatus,
  updateActionIdForAccountCreationStatus,
} from "../../redux/actions";

import EthereumSignUp from "../../components/presentational/EthereumSignUp";

import {
  approveManaSpending,
  showInfo,
  showError,
  fundAccountWithEthers,
  fundAccountWithMana,
} from "../../helpers";

import { ActionObject } from "../../types/ActionObject";
import { AccountObject } from "../../types/AccountObject";

import AccountCreationStatus from "../../constants/AccountCreationStatus";

import { NavigationStackProp } from "react-navigation-stack";

const {
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

type EthereumSignUpScreenProps = {
  setAccount: (...args: any[]) => any;
  setAccountCreationStatus: (...args: any[]) => any;
  updateActionIdForAccountCreationStatus: (...args: any[]) => any;
  navigation: NavigationStackProp;
  landToBuy: any;
};

export const EthereumSignUpScreen: React.FunctionComponent<EthereumSignUpScreenProps> = ({
  setAccount,
  setAccountCreationStatus,
  updateActionIdForAccountCreationStatus,
  navigation,
  landToBuy,
}) => {
  const _onboarding = async (): Promise<void> => {
    try {
      // The pattern for each step is:
      // 1. alert with good info as soon as it's true
      // 2. update app state with action in progress if applicable
      // 3. persist any important side effects we may need
      //    later if applicable
      // 4. Change UI progress state on-screen
      // const createAnAccount = async (): Promise<object> => {

      // const createAnAccount = (): AccountObject => {
      const createAnAccountAsync = async (): Promise<AccountObject> => {
        console.info("About to call createAccount");

        // Note: The timeout for account creation is about ~20 secs.
        // See more: https://github.com/tasitlabs/tasit/issues/42

        // Note that we aren't awaiting this function anymore
        // TODO: Think more about this based on how Account.create
        // works in the Tasit SDK
        // Note: This is where we tweak whether account creation is blocking or not

        // const account = Account.create();
        const account = await Account.create();
        // TODO: Decide on sync vs. async function for account creation

        showInfo(`Account generated`);
        setAccount(account);
        setAccountCreationStatus(FUNDING_WITH_ETH);
        return account;
      };

      const fundWithEthers = async (accountAddress): Promise<void> => {
        const action: ActionObject = fundAccountWithEthers(accountAddress);

        // TODO: Type this action object
        await action.send();
        console.info("Sent the ETH transfer action");
        const actionId = action.getId();
        console.info({ actionId });
        updateActionIdForAccountCreationStatus({
          status: FUNDING_WITH_ETH,
          actionId,
        });
        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Account funded with ETH`);
        setAccountCreationStatus(FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE);
      };

      const fundWithMana = async (accountAddress: string): Promise<void> => {
        const action = fundAccountWithMana(accountAddress);
        await action.send();
        const actionId = action.getId();
        updateActionIdForAccountCreationStatus({
          status: FUNDING_WITH_MANA,
          actionId,
        });
        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Account funded with MANA`);
        setAccountCreationStatus(APPROVING_MARKETPLACE);
      };

      const approveMarketplace = async (
        account: AccountObject
      ): Promise<void> => {
        const action = approveManaSpending(account);
        await action.send();
        const actionId = action.getId();
        updateActionIdForAccountCreationStatus({
          status: APPROVING_MARKETPLACE,
          actionId,
        });

        await action.waitForOneConfirmation();
        // TODO: Change me to pub/sub style
        showInfo(`Marketplace approved`);
        setAccountCreationStatus(FUNDING_WITH_MANA);
      };

      ///
      // Main control flow
      ///

      // TODO: Consider switching back to await-style with the underlying
      // async call chain here to get the old behavior back
      // const account = createAnAccount();
      const account: AccountObject = await createAnAccountAsync();

      const { address: accountAddress } = account;
      await fundWithEthers(accountAddress);
      await Promise.all([
        fundWithMana(accountAddress),
        approveMarketplace(account),
      ]);
      landToBuy
        ? showInfo(`Now you can buy land!`)
        : showInfo(`Your account is set up now!`);
      setAccountCreationStatus(READY_TO_USE);
    } catch (error) {
      showError(error);
    }
  };

  const _onUsernameSubmit = (): void => {
    setAccountCreationStatus(GENERATING_ACCOUNT);

    // Note: A trick to force `_onboarding()` function to running async
    (async (): Promise<void> => {})().then((): void => {
      // Should run async but isn't when calling Account.create() or createFromPrivateKey()
      // See more: https://github.com/tasitlabs/tasit/issues/42#issuecomment-462534793
      _onboarding();
    });

    landToBuy
      ? navigation.navigate("BuyLandScreen")
      : navigation.navigate("MyProfileScreen");
  };

  return <EthereumSignUp onUsernameSubmit={_onUsernameSubmit} />;
};

const mapStateToProps = (state: { landToBuy: any }): object => {
  const { landToBuy } = state;
  return { landToBuy };
};

const mapDispatchToProps = {
  setAccount,
  setAccountCreationStatus,
  updateActionIdForAccountCreationStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthereumSignUpScreen);
