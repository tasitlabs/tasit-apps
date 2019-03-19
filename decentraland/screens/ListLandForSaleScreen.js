import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import {
  prepareParcelForSale,
  prepareEstateForSale,
  addressesAreEqual,
  showError,
  showInfo,
  getContracts,
} from "./helpers";

import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

export class ListLandForSaleScreen extends React.Component {
  componentDidMount = async () => {
    try {
      const { setLandForSaleList } = this.props;
      showInfo("Loading assets for sale...");
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
      let assetForSale = await this._prepareAssetForSale(order);
      assetsForSale.push(assetForSale);
    }
    return assetsForSale;
  };

  _prepareAssetForSale = async assetForSale => {
    const { nftAddress } = assetForSale;
    let contracts = getContracts();
    const { estateContract, landContract } = contracts;

    const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
    const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());

    if (isEstate) {
      return await prepareEstateForSale(estateContract, assetForSale);
    } else if (isParcel) {
      return await prepareParcelForSale(landContract, assetForSale);
    } else {
      throw new Error(`The asset should be a parcel of land or an estate.`);
    }
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
