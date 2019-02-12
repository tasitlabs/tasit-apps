import React from "react";
import { connect } from "react-redux";
import { setLandsForSale, selectLandToBuy } from "../actions";
import PropTypes from "prop-types";
import LandsForSaleList from "@presentational/LandsForSaleList";
import LandsForSaleListItem from "@presentational/LandsForSaleListItem";

import ContractsAddresses from "@constants/ContractsAddresses";
const { ESTATE_ADDRESS, MARKETPLACE_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC721, Marketplace } = Action;
const { Estate } = ERC721;
const { Decentraland } = Marketplace;

export class ListLandsForSaleScreen extends React.Component {
  estateContract = new Estate(ESTATE_ADDRESS);
  marketplaceContract = new Decentraland(MARKETPLACE_ADDRESS);

  componentDidMount = async () => {
    const { setLandsForSale } = this.props;
    const landsForSale = await this._getLandsForSale();
    setLandsForSale(landsForSale);
  };

  // Note: This function is assuming that:
  // - All estates have a sell order
  // - The total supply of estates is small
  // TODO: Rewrite this function when we move to testnet
  _getLandsForSale = async () => {
    const orders = [];
    const totalSupply = await this.estateContract.totalSupply();

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++) {
      const order = this._getLandForSale(estateId);
      orders.push(order);
    }

    return await Promise.all(orders);
  };

  _getLandForSale = async estateId => {
    const estateName = await this.estateContract.getMetadata(estateId);
    const [
      orderId,
      seller,
      price,
      expiresAt,
    ] = await this.marketplaceContract.auctionByAssetId(estateId);

    const hasOrder = parseInt(orderId, 16) !== 0;
    if (!hasOrder) throw Error(`Estate (id:${estateId}) has no sell order.`);

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    const priceMana = Number(price.toString()) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

    return {
      id: orderId,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      // TODO: Create an enum type for identify asset
      asset: {
        id: estateId,
        name: estateName,
        img: imgUrl,
      },
    };
  };

  _renderItem = ({ item: landForSale }) => {
    const { navigation, selectLandToBuy } = this.props;
    const handlePress = () => {
      selectLandToBuy(landForSale);
      navigation.navigate("BuyLandScreen");
    };

    return (
      <LandsForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  render() {
    const { landsForSale } = this.props;
    return (
      <LandsForSaleList
        landsForSale={landsForSale}
        renderItem={this._renderItem}
      />
    );
  }
}

ListLandsForSaleScreen.propTypes = {
  landsForSale: PropTypes.array.isRequired,
  setLandsForSale: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { landsForSale } = state;
  return { landsForSale };
};

const mapDispatchToProps = {
  setLandsForSale,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandsForSaleScreen);
