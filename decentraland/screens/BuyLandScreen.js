import React from "react";
import { connect } from "react-redux";
import { removeLandForSale } from "../redux/actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";
import { showError, showInfo } from "./helpers";

import ContractsAddresses from "@constants/ContractsAddresses";
const {
  ESTATE_ADDRESS,
  MARKETPLACE_ADDRESS,
  LAND_ADDRESS,
} = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC721, Marketplace } = Action;
const { Estate, Land } = ERC721;
const { Decentraland: DecentralandMarketplace } = Marketplace;

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

// TODO: Go deep on gas handling.
// Without that, VM returns a revert error instead of out of gas error.
// See: https://github.com/tasitlabs/TasitSDK/issues/173
const gasParams = {
  gasLimit: 7e6,
  gasPrice: 1e9,
};

export class BuyLandScreen extends React.Component {
  estateContract = new Estate(ESTATE_ADDRESS);
  landContract = new Land(LAND_ADDRESS);
  marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);

  _onBuy = landForSale => {
    try {
      const { account } = this.props;
      if (!account) this._setupAccount();
      else this._buy(landForSale);
    } catch (err) {
      showError(err);
    }
  };

  _setupAccount = () => {
    const { navigation } = this.props;
    navigation.navigate("OnboardingHomeScreen");
  };

  _buy = landForSale => {
    const { props, _executeOrder } = this;
    const { navigation, account, removeLandForSale } = props;
    const onSuccess = () => {
      removeLandForSale(landForSale);
    };

    _executeOrder(landForSale, account, onSuccess);
    navigation.navigate("ListLandForSaleScreen");
  };

  _executeOrder = async (sellOrder, account, afterSuccessfulExecution) => {
    try {
      const { priceMana, asset, type } = sellOrder;
      const { id: assetId } = asset;
      const priceInWei = Number(priceMana) * 1e18;
      const { marketplaceContract, estateContract } = this;

      let nftAddress;
      let fingerprint;
      if (type == ESTATE) {
        nftAddress = ESTATE_ADDRESS;
        fingerprint = await estateContract.getFingerprint(assetId);
      } else if (type == PARCEL) {
        nftAddress = LAND_ADDRESS;
        // LANDRegistry contract doesn't implement getFingerprint function
        fingerprint = "0x";
      }

      marketplaceContract.setWallet(account);
      const action = marketplaceContract.safeExecuteOrder(
        nftAddress,
        `${assetId}`,
        `${priceInWei}`,
        `${fingerprint}`,
        gasParams
      );

      // TODO: This function should be called inside of the eventListener
      // that catches the safeExecuteOrder successful event.
      await action.waitForNonceToUpdate();
      showInfo(`Order executed.`);
      afterSuccessfulExecution();
    } catch (err) {
      showError(err);
    }
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
