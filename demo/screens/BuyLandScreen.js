import React from "react";
import { connect } from "react-redux";
import { removeLandForSale } from "../actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";

import ContractsAddresses from "@constants/ContractsAddresses";
const { ESTATE_ADDRESS, MARKETPLACE_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC721, Marketplace } = Action;
const { Estate } = ERC721;
const { Decentraland: DecentralandMarketplace } = Marketplace;
import { approveManaSpending, manaFaucetTo } from "./helpers";

export class BuyLandScreen extends React.Component {
  estateContract = new Estate(ESTATE_ADDRESS);
  marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);

  _onBuy = landForSale => {
    const { account } = this.props;
    if (!account) this._setupAccount();
    else this._buy(landForSale);
  };

  _setupAccount = () => {
    const { navigation } = this.props;
    navigation.navigate("OnboardingHomeScreen");
  };

  _buy = landForSale => {
    const { navigation, account, removeLandForSale } = this.props;
    const onSuccess = () => {
      removeLandForSale(landForSale);
    };
    this._executeOrder(landForSale, account, onSuccess);
    navigation.navigate("ListLandForSaleScreen");
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
    const { selectedLandToBuy: landForSale } = this.props;

    return (
      <BuyLand
        landForSale={landForSale}
        onBuy={() => this._onBuy(landForSale)}
      />
    );
  }
}

BuyLandScreen.propTypes = {
  account: PropTypes.object,
  selectedLandToBuy: PropTypes.object.isRequired,
  removeLandForSale: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { account, selectedLandToBuy } = state;
  return { account, selectedLandToBuy };
};

const mapDispatchToProps = {
  removeLandForSale,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyLandScreen);
