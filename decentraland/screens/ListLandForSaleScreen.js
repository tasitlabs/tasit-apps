import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { showError } from "./helpers";

import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

import ContractsAddresses from "@constants/ContractsAddresses";
const {
  ESTATE_ADDRESS,
  LAND_ADDRESS,
  MARKETPLACE_ADDRESS,
} = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC721, Marketplace } = Action;
const { Estate, Land } = ERC721;
const { Decentraland: DecentralandMarketplace } = Marketplace;

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

export class ListLandForSaleScreen extends React.Component {
  estateContract = new Estate(ESTATE_ADDRESS);
  landContract = new Land(LAND_ADDRESS);
  marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);

  componentDidMount = async () => {
    try {
      const { setLandForSaleList } = this.props;
      const landForSaleList = await this._getLandForSaleList();
      setLandForSaleList(landForSaleList);
    } catch (err) {
      showError(err);
    }
  };

  _getLandForSaleList = async () => {
    const openSellOrders = await this._getOpenSellOrders();
    return openSellOrders;
  };

  _getOpenSellOrders = async () => {
    const decentralandUtils = new DecentralandUtils();
    const { getOpenSellOrders } = decentralandUtils;

    const fromBlock = 0;
    const openSellOrdersEvents = await getOpenSellOrders(fromBlock);
    const assetsForSale = [];

    for (let event of openSellOrdersEvents) {
      let { values: order } = event;
      let assetForSale = await this._prepareLandForSale(order);
      assetsForSale.push(assetForSale);
    }
    return assetsForSale;
  };

  _prepareLandForSale = async assetForSale => {
    const {
      id,
      assetId,
      nftAddress,
      seller,
      priceInWei,
      expiresAt,
    } = assetForSale;
    const { estateContract, landContract } = this;

    const isParcel = nftAddress.toUpperCase() == LAND_ADDRESS.toUpperCase();
    const isEstate = nftAddress.toUpperCase() == ESTATE_ADDRESS.toUpperCase();

    let type;
    let name;
    let imgUrl;

    if (isEstate) {
      type = ESTATE;
      name = await estateContract.getMetadata(assetId);
      imgUrl = `https://api.decentraland.org/v1/estates/${Number(
        assetId
      )}/map.png`;
    } else if (isParcel) {
      type = PARCEL;
      const namePromise = landContract.tokenMetadata(assetId);
      const coordsPromise = landContract.decodeTokenId(assetId);
      let coords;
      [name, coords] = await Promise.all([namePromise, coordsPromise]);
      const [x, y] = coords;
      imgUrl = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;
    } else {
      throw new Error(`The asset should be a Parcel or an Estate.`);
    }

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    const priceMana = Number(`${priceInWei}`) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);

    return {
      id,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      type,
      asset: {
        id: assetId,
        name,
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
