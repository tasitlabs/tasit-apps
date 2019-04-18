import React from "react";
import { connect } from "react-redux";
import {
  removeLandForSale,
  prependLandForSaleToList,
  removeMyAssetFromList,
  addToMyAssetsList,
  setActionIdForMyAsset,
} from "../redux/actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";
import { showError, showInfo, getContracts } from "@helpers";
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

  _buy = async landForSale => {
    const { props, _executeOrder } = this;
    const {
      navigation,
      accountInfo,
      removeLandForSale,
      prependLandForSaleToList,
      removeMyAssetFromList,
      addToMyAssetsList,
      setActionIdForMyAsset,
    } = props;
    const { account } = accountInfo;
    const { asset } = landForSale;
    const { id: assetId, type } = asset;

    if (type !== ESTATE && type !== PARCEL) showError(`Unknown asset.`);

    const typeDescription = type == ESTATE ? "Estate" : "Parcel";

    const onSuccess = async () => {
      // TODO: This function should be called inside of the eventListener
      // that catches the safeExecuteOrder successful event.
      await action.waitForNonceToUpdate();

      showInfo(`${typeDescription} bought successfully.`);
    };

    const onError = (assetForSale, message) => {
      const { asset } = assetForSale;
      showError(message);
      removeMyAssetFromList(asset);
      prependLandForSaleToList(assetForSale);
    };

    showInfo(`Buying the ${typeDescription.toLowerCase()}...`);

    const action = await _executeOrder(landForSale, account, onError);

    // Optimistic UI update
    removeLandForSale(landForSale);
    addToMyAssetsList(asset);

    navigation.navigate("ListLandForSaleScreen");

    const actionId = await action.getId();
    setActionIdForMyAsset(assetId, actionId);

    onSuccess();
  };

  _executeOrder = async (sellOrder, account, onError) => {
    try {
      const { priceManaInWei: priceInWei, asset } = sellOrder;
      const { id: assetId, type } = asset;
      const contracts = getContracts();
      const { marketplaceContract, estateContract, landContract } = contracts;

      const nftAddress =
        type === ESTATE
          ? estateContract.getAddress()
          : landContract.getAddress();
      // LANDRegistry contract doesn't implement getFingerprint function
      const fingerprint =
        type === ESTATE ? await estateContract.getFingerprint(assetId) : "0x";

      marketplaceContract.setWallet(account);
      const action = marketplaceContract.safeExecuteOrder(
        nftAddress,
        `${assetId}`,
        `${priceInWei}`,
        `${fingerprint}`,
        gasParams
      );

      return action;
    } catch (error) {
      // Note: The current version isn't supporting `failing` events
      // See more:
      // https://github.com/tasitlabs/tasit/issues/151
      // https://github.com/tasitlabs/tasit/issues/233
      onError(sellOrder, error.message);
    }
  };

  render() {
    const { selectedLandToBuy: landForSale, accountInfo } = this.props;
    const { creationStatus, creationActions } = accountInfo;

    return (
      <BuyLand
        landForSale={landForSale}
        onBuy={() => this._onBuy(landForSale)}
        accountCreationStatus={creationStatus}
        accountCreationActions={creationActions}
      />
    );
  }
}

BuyLandScreen.propTypes = {
  accountInfo: PropTypes.object,
  selectedLandToBuy: PropTypes.object.isRequired,
  myAssets: PropTypes.array.isRequired,
  removeLandForSale: PropTypes.func.isRequired,
  prependLandForSaleToList: PropTypes.func.isRequired,
  removeMyAssetFromList: PropTypes.func.isRequired,
  addToMyAssetsList: PropTypes.func.isRequired,
  setActionIdForMyAsset: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { accountInfo, selectedLandToBuy, myAssets } = state;
  const { list: myAssetsList } = myAssets;
  return { accountInfo, selectedLandToBuy, myAssets: myAssetsList };
};

const mapDispatchToProps = {
  removeLandForSale,
  prependLandForSaleToList,
  addToMyAssetsList,
  removeMyAssetFromList,
  setActionIdForMyAsset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyLandScreen);
