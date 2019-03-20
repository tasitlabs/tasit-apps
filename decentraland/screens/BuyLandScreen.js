import React from "react";
import { connect } from "react-redux";
import { removeLandForSale } from "../redux/actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";
import { showError, showInfo, getContracts } from "./helpers";

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
  _onBuy = landForSale => {
    try {
      const { accountInfo } = this.props;
      const { account } = accountInfo;
      if (!account) this._setupAccount();
      // The _buy function assumes that the account is created, funded and allowed
      // The user will get back to this else case after going through an account setup flow
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
    const { navigation, accountInfo, removeLandForSale } = props;
    const { account } = accountInfo;
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
      const contracts = getContracts();
      const { marketplaceContract, estateContract, landContract } = contracts;

      let nftAddress;
      let fingerprint;
      if (type == ESTATE) {
        nftAddress = estateContract.getAddress();
        fingerprint = await estateContract.getFingerprint(assetId);
      } else if (type == PARCEL) {
        nftAddress = landContract.getAddress();
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

      if (type == ESTATE) showInfo(`Estate bought successfully.`);
      else if (type == PARCEL) showInfo(`Parcel bought successfully.`);
      else showError(`Unknown asset bought successfully.`);

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
  accountInfo: PropTypes.object,
  selectedLandToBuy: PropTypes.object.isRequired,
  removeLandForSale: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { accountInfo, selectedLandToBuy } = state;
  return { accountInfo, selectedLandToBuy };
};

const mapDispatchToProps = {
  removeLandForSale,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyLandScreen);
