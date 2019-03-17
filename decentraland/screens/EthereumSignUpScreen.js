import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount } from "../redux/actions";
import EthereumSignUp from "@presentational/EthereumSignUp";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";
import { approveManaSpending, showInfo, showError } from "./helpers";
import ContractsAddresses from "@constants/ContractsAddresses";
const {
  MANA_ADDRESS,
  MARKETPLACE_ADDRESS,
  GNOSIS_SAFE_ADDRESS,
} = ContractsAddresses;
import { ContractBasedAccount } from "tasit-sdk";
const { GnosisSafe } = ContractBasedAccount;

export class EthereumSignUpScreen extends React.Component {
  // Note: As same as Account.create(), this functions isn't running as async.
  // Timeout Between button click and screen change (afterSignUp()) is abount 5 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  _createAccount = async () => {
    // Note: A real app wouldn't be using a preset private key and hardcoding it!
    // We're only doing this temporarily while using a hardcoded account with ETH and tokens
    const accountPrivateKey =
      "0x4f09311114f0ff4dfad0edaa932a3e01a4ee9f34da2cbd087aa0e6ffcb9eb322";
    const account = createFromPrivateKey(accountPrivateKey);
    return account;
  };

  _fundAccount = async accountAddress => {
    const SMALL_AMOUNT = `${1e17}`; // 0.1
    const TEN = `${10e18}`;

    const gnosisSafeOwnerPrivKey =
      "0xee0c6b1a7adea9f87b1a422eb06b245fc714b8eca4c8c0578d6cf946beba86f1";
    const gnosisSafeOwner = createFromPrivateKey(gnosisSafeOwnerPrivKey);

    const gnosisSafe = new GnosisSafe(GNOSIS_SAFE_ADDRESS, gnosisSafeOwner);
    gnosisSafe.setSigners([gnosisSafeOwner]);

    const transferEthersAction = gnosisSafe.transferEther(
      accountAddress,
      SMALL_AMOUNT
    );
    await transferEthersAction.waitForNonceToUpdate();

    const transferManaAction = gnosisSafe.transferERC20(
      MANA_ADDRESS,
      accountAddress,
      TEN
    );
    await transferManaAction.waitForNonceToUpdate();
  };

  _approveAccount = async account => {
    const ONE = 1e18;
    await approveManaSpending(account, MARKETPLACE_ADDRESS, ONE);
  };

  // TODO: Use Gnosis Safe
  _onboarding = async () => {
    try {
      const { setAccount } = this.props;
      const account = await this._createAccount();
      showInfo(`Account created.`);
      setAccount(account);

      const { address: accountAddress } = account;
      await this._fundAccount(accountAddress);
      showInfo(`Account funded.`);

      await this._approveAccount(account);
      showInfo(`Account approved.`);
    } catch (error) {
      showError(error);
    }
  };

  _onSignUp = () => {
    // Should run async but isn't when calling Account.create() or createFromPrivateKey()
    this._onboarding();

    this.props.navigation.navigate("BuyLandScreen");
  };

  render() {
    return <EthereumSignUp onSignUp={this._onSignUp} />;
  }
}

EthereumSignUpScreen.propTypes = {
  setAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
