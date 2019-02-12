import React from "react";
import { connect } from "react-redux";
import { removeSellOrder } from "../actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";

import ContractsABIs from "@constants/ContractsABIs";
const { estateABI, marketplaceABI } = ContractsABIs;
import ContractsAddresses from "@constants/ContractsAddresses";
const { estateAddress, marketplaceAddress } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { Contract } = Action;
import { approveManaSpending, manaFaucetTo } from "./helpers";

export class BuyLandScreen extends React.Component {
  // TODO: Switch to new DecentralandEstate() once the SDK includes that
  estateContract = new Contract(estateAddress, estateABI);
  marketplaceContract = new Contract(marketplaceAddress, marketplaceABI);

  _onOrderExecution = sellOrder => {
    const { navigation, account, removeSellOrder } = this.props;

    if (!account) {
      navigation.navigate("OnboardingHomeScreen");
    } else {
      const afterSuccessfulExecution = () => {
        // Should rename that to remove___FromUI or is it obvious?
        removeSellOrder(sellOrder);
      };
      this._executeOrder(sellOrder, account, afterSuccessfulExecution);
      navigation.navigate("ListLandsForSaleScreen");
    }
  };

  _executeOrder = async (sellOrder, account, afterSuccessfulExecution) => {
    const { asset } = sellOrder;
    const { priceMana } = sellOrder;
    const priceInWei = Number(priceMana) * 1e18;

    const ONE = 1e18;
    const TEN = 10e18;

    // TODO: Go deep on gas handling.
    // Without that, VM returns a revert error instead of out of gas error.
    // See: https://github.com/tasitlabs/TasitSDK/issues/173
    const gasParams = {
      gasLimit: 7e6,
      gasPrice: 1e9,
    };

    const marketplaceAddress = this.marketplaceContract.getAddress();
    const estateAddress = this.estateContract.getAddress();

    await manaFaucetTo(account, TEN);

    // TODO: Move this out to an explicit approval flow?
    await approveManaSpending(account, marketplaceAddress, ONE);

    this.marketplaceContract.setWallet(account);

    const fingerprint = await this.estateContract.getFingerprint(asset.id);

    const executeOrder = this.marketplaceContract.safeExecuteOrder(
      estateAddress,
      asset.id,
      priceInWei.toString(),
      fingerprint.toString(),
      gasParams
    );

    await executeOrder.waitForNonceToUpdate();

    // TODO: This function should be called inside of the eventListener
    // that catches the safeExecuteOrder successful event.
    afterSuccessfulExecution();
  };

  render() {
    const { claimedSellOrder: sellOrder } = this.props;

    return (
      <BuyLand
        sellOrder={sellOrder}
        onOrderExecution={() => this._onOrderExecution(sellOrder)}
      />
    );
  }
}

BuyLandScreen.propTypes = {
  account: PropTypes.object,
  claimedSellOrder: PropTypes.object.isRequired,
  removeSellOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { account, claimedSellOrder } = state;
  return { account, claimedSellOrder };
};

const mapDispatchToProps = {
  removeSellOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyLandScreen);
