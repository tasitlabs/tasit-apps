import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";

import ContractsAddresses from "@constants/ContractsAddresses";
const { ESTATE_ADDRESS, MARKETPLACE_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC721, Marketplace } = Action;
const { Estate } = ERC721;
const { Decentraland: DecentralandMarketplace } = Marketplace;

export class ListLandForSaleScreen extends React.Component {
  estateContract = new Estate(ESTATE_ADDRESS);
  marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);

  componentDidMount = async () => {
    try {
      const { setLandForSaleList } = this.props;
      const landForSaleList = await this._getLandForSaleList();
      setLandForSaleList(landForSaleList);
    } catch (err) {
      console.error(err);
    }
  };

  // Note: This function is assuming that:
  // - All estates have a sell order
  // - The total supply of estates is small
  // TODO: Rewrite this function when we move to testnet
  _getLandForSaleList = async () => {
    const orders = [];
    const totalSupply = await this.estateContract.totalSupply();

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++) {
      const order = this._getLandForSale(estateId);
      orders.push(order);
    }

    if (orders.length == 0)
      console.warn("There isn't any land for sale right now.");

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
      <LandForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  render() {
    const { landForSaleList } = this.props;
    return (
      <LandForSaleList
        landForSaleList={landForSaleList}
        renderItem={this._renderItem}
      />
    );
  }
}

ListLandForSaleScreen.propTypes = {
  landForSaleList: PropTypes.array.isRequired,
  setLandForSaleList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { landForSaleList } = state;
  return { landForSaleList };
};

const mapDispatchToProps = {
  setLandForSaleList,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
