import React from "react";
import { connect } from "react-redux";
import SellOrderExecute from "@presentational/SellOrderExecute";
import PropTypes from "prop-types";
import ContractsAddresses from "@constants/ContractsAddresses";
import ContractsABIs from "@constants/ContractsABIs";

const { manaABI, estateABI, marketplaceABI } = ContractsABIs;
const { manaAddress, estateAddress, marketplaceAddress } = ContractsAddresses;
import { Action } from "tasit-sdk";
const { Contract } = Action;
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

const ONE = 1e18;
const TEN = 10e18;

// TODO: Go deep on gas handling.
// Without that, VM returns a revert error instead of out of gas error.
// See: https://github.com/tasitlabs/TasitSDK/issues/173
const gasParams = {
  gasLimit: 7e6,
  gasPrice: 1e9,
};

export class SellOrderExecuteScreen extends React.Component {
  // TODO: Switch to new DecentralandEstate() once the SDK includes that
  estateContract = new Contract(estateAddress, estateABI);
  marketplaceContract = new Contract(marketplaceAddress, marketplaceABI);
  manaContract = new Contract(manaAddress, manaABI);

  // Async here is working
  _onOrderExecution = sellOrder => {
    console.log("clicked");
    const { navigation } = this.props;
    navigation.navigate("ListSellOrdersScreen");
    this._executeOrder(sellOrder);
  };

  // Handler function is called imediattly after button click
  // Detailed log:
  //[22:48:20] clicked
  //[22:48:29] after _manaFaucetTo
  //[22:48:40] after marketplaceApproval
  //[22:48:42] after fingerprint
  //[22:48:51] after executeOrder
  _executeOrder = async sellOrder => {
    console.log("start");
    const { account } = this.props;
    const { asset } = sellOrder;
    const { priceMana } = sellOrder;
    const priceInWei = Number(priceMana) * 1e18;

    await this._manaFaucetTo(account, TEN);
    console.log("after _manaFaucetTo");

    this.manaContract.setWallet(account);
    const marketplaceApproval = this.manaContract.approve(
      this.marketplaceContract.getAddress(),
      ONE.toString()
    );
    await marketplaceApproval.waitForNonceToUpdate();
    console.log("after marketplaceApproval");

    this.marketplaceContract.setWallet(account);
    const fingerprint = await this.estateContract.getFingerprint(asset.id);
    console.log("after fingerprint");

    const executeOrder = this.marketplaceContract.safeExecuteOrder(
      this.estateContract.getAddress(),
      asset.id,
      priceInWei.toString(),
      fingerprint.toString(),
      gasParams
    );
    await executeOrder.waitForNonceToUpdate();
    console.log("after executeOrder");
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
};

const mapStateToProps = state => {
  const { account, claimedSellOrder } = state;
  return { account, claimedSellOrder };
};

export default connect(mapStateToProps)(SellOrderExecuteScreen);
