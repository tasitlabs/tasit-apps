import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { showError } from "./helpers";

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

  // TODO: Use DecentralandUtils
  _getOpenSellOrders = async () => {
    const parcelForSale = {
      id: "0x3ab9bf0080d368f3dd14b65e7372688d81e3471893688b4a54bc8b386c8cd04f",
      assetId:
        "0xffffffffffffffffffffffffffffffec00000000000000000000000000000024",
      seller: "0x8a5D5298dcceA526754064b8094e663162E1dBEa",
      nftAddress: "0x332BfB4d705d3Ce37c4Bf06141c7104984e91E79",
      priceInWei: "0x0de0b6b3a7640000",
      expiresAt: "0x016994e06125",
    };
    const estateForSale = {
      id: "0xe9d19d19ac9dcbbf24371b10b23d8dc1355963eb8b5b9ac59e192e3d6cd92de2",
      assetId: "0x05",
      seller: "0x8a5D5298dcceA526754064b8094e663162E1dBEa",
      nftAddress: "0xCa4A5347C1E0460567b299a69135100fb98ebdA7",
      priceInWei: "0x0de0b6b3a7640000",
      expiresAt: "0x016994e06125",
    };

    const openSellOrders = [parcelForSale, estateForSale];
    const assetsForSale = [];

    for (let order of openSellOrders) {
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
