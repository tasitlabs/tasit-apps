import React from "react";
import { connect } from "react-redux";
import { addLandForSaleToList, selectLandToBuy } from "../redux/actions";
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
      showInfo("Loading assets for sale...");
      await this._loadAssetsForSale();
    } catch (err) {
      showError(err);
    }
  };

  _loadAssetsForSale = async () => {
    const { addLandForSaleToList } = this.props;

    const decentralandUtils = new DecentralandUtils();
    const { getOpenSellOrders } = decentralandUtils;

    const fromBlock = 0;
    const openSellOrdersEvents = await getOpenSellOrders(fromBlock);

    // Note: Getting only the first 10 assets for now
    // See more: https://github.com/tasitlabs/tasit/issues/155
    for (let event of openSellOrdersEvents.slice(0, 10)) {
      let { values: order } = event;
      let assetForSale = await this._prepareAssetForSale(order);
      addLandForSaleToList(assetForSale);
    }
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
  addLandForSaleToList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { landForSaleList } = state;
  return { landForSaleList };
};

const mapDispatchToProps = {
  addLandForSaleToList,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
