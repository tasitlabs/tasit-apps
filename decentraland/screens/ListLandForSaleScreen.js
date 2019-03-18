import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { addressesAreEqual, showError } from "./helpers";

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
      const landForSaleList = await this._getAssetsForSale();
      setLandForSaleList(landForSaleList);
    } catch (err) {
      showError(err);
    }
  };

  _getAssetsForSale = async () => {
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
    const { nftAddress } = assetForSale;
    const isParcel = addressesAreEqual(nftAddress, LAND_ADDRESS);
    const isEstate = addressesAreEqual(nftAddress, ESTATE_ADDRESS);

    if (isEstate) {
      return await this._prepareEstateForSale(assetForSale);
    } else if (isParcel) {
      return await this._prepareParcelForSale(assetForSale);
    } else {
      throw new Error(`The asset should be a Parcel or an Estate.`);
    }
  };

  _prepareEstateForSale = async estateForSale => {
    const { id, assetId, seller, priceInWei, expiresAt } = estateForSale;
    const { estateContract } = this;
    const estateId = Number(assetId);

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    const priceMana = Number(`${priceInWei}`) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const name = await estateContract.getMetadata(assetId);
    const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

    return {
      id,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      type: ESTATE,
      asset: {
        id: estateId,
        name,
        img: imgUrl,
      },
    };
  };

  _prepareParcelForSale = async parcelForSale => {
    const {
      id,
      assetId: parcelId,
      seller,
      priceInWei,
      expiresAt,
    } = parcelForSale;
    const { landContract } = this;

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    const priceMana = Number(`${priceInWei}`) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const namePromise = landContract.tokenMetadata(parcelId);
    const coordsPromise = landContract.decodeTokenId(parcelId);
    const [name, coords] = await Promise.all([namePromise, coordsPromise]);
    const [x, y] = coords;
    const imgUrl = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;

    return {
      id,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      type: PARCEL,
      asset: {
        id: parcelId,
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
