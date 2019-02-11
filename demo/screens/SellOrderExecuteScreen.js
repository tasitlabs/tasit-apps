import React from "react";
import { connect } from "react-redux";
import { removeSellOrder } from "../actions";
import SellOrderExecute from "@presentational/SellOrderExecute";
import PropTypes from "prop-types";
import ContractsABIs from "@constants/ContractsABIs";
const { manaABI, estateABI, marketplaceABI } = ContractsABIs;
import ContractsAddresses from "@constants/ContractsAddresses";
const { manaAddress, estateAddress, marketplaceAddress } = ContractsAddresses;
import { Action } from "tasit-sdk";
const { Contract } = Action;
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export class SellOrderExecuteScreen extends React.Component {
  // TODO: Switch to new DecentralandEstate() once the SDK includes that
  estateContract = new Contract(estateAddress, estateABI);
  marketplaceContract = new Contract(marketplaceAddress, marketplaceABI);
  manaContract = new Contract(manaAddress, manaABI);

  _onOrderExecution = sellOrder => {
    const { navigation } = this.props;
    navigation.navigate("ListSellOrdersScreen");
    this._executeOrder(sellOrder);
  };

  _executeOrder = async sellOrder => {
    const { account, removeSellOrder } = this.props;
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

    await this._manaFaucetTo(account, TEN);

    await this._approveManaSpending(account, marketplaceAddress, ONE);

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

    // TODO: This function should be called inside of the eventLister
    // that catch the safeExecuteOrder successfull event.
    removeSellOrder(sellOrder);
  };

  _approveManaSpending = async (fromAccount, toAddress, value) => {
    this.manaContract.setWallet(fromAccount);
    const approvalAction = this.manaContract.approve(
      toAddress,
      value.toString()
    );

    await approvalAction.waitForNonceToUpdate();
  };

  _manaFaucetTo = async (beneficiary, amountInWei) => {
    const ownerPrivKey =
      "0x11d943d7649fbdeb146dc57bd9cfc80b086bfab2330c7b25651dbaf382392f60";
    const ownerWallet = createFromPrivateKey(ownerPrivKey);

    this.manaContract.setWallet(ownerWallet);
    const mintManaToBuyer = this.manaContract.mint(
      beneficiary.address,
      amountInWei.toString()
    );
    await mintManaToBuyer.waitForNonceToUpdate();
  };

  render() {
    const { claimedSellOrder: sellOrder } = this.props;

    return (
      <SellOrderExecute
        sellOrder={sellOrder}
        onOrderExecution={() => this._onOrderExecution(sellOrder)}
      />
    );
  }
}

SellOrderExecuteScreen.propTypes = {
  account: PropTypes.object.isRequired,
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
)(SellOrderExecuteScreen);
