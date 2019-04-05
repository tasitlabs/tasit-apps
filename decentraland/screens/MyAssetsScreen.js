import React from "react";
import { connect } from "react-redux";
import { setMyAssetsList } from "../redux/actions";
import PropTypes from "prop-types";
import MyAssetsList from "@presentational/MyAssetsList";
import MyAssetsListItem from "@presentational/MyAssetsListItem";
import { listsAreEqual, getContracts } from "@helpers";
import { generateAssetFromId } from "@helpers/decentraland";
import { storeMyAssets } from "@helpers/storage";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

export class MyAssetsScreen extends React.Component {
  componentDidMount = async () => {
    const { account, myAssets: assetsFromState, setMyAssetsList } = this.props;
    if (account) {
      const { address } = account;
      const assetsFromBlockchain = await this._getAssetsFromBlockchain(address);
      const shouldUpdate = !listsAreEqual(
        assetsFromBlockchain,
        assetsFromState
      );
      if (shouldUpdate) {
        // TODO: Maybe move these two set/store operations into a single function
        setMyAssetsList(assetsFromBlockchain);
        storeMyAssets(assetsFromBlockchain);
      }
    }
  };

  _getAssetsFromBlockchain = async address => {
    const listOfPromises = await this._getAssetsOf(address);
    const fromBlockchain = await Promise.all([...listOfPromises]);
    return fromBlockchain;
  };

  // Note: Returns a list of Promises
  _getAssetsOf = async address => {
    const decentralandUtils = new DecentralandUtils();
    const { getAssetsOf: getLandOf } = decentralandUtils;

    const contracts = getContracts();
    const { estateContract, landContract } = contracts;

    const listOfLand = await getLandOf(address);
    const assets = [];

    for (let land of listOfLand) {
      const { id: assetId, nftAddress } = land;

      let asset = generateAssetFromId(
        estateContract,
        landContract,
        assetId,
        nftAddress
      );

      assets.push(asset);
    }

    return assets;
  };

  _renderItem = ({ item: asset }) => {
    return <MyAssetsListItem asset={asset} />;
  };

  render() {
    const { myAssets } = this.props;

    return (
      <MyAssetsList myAssetsList={myAssets} renderItem={this._renderItem} />
    );
  }
}

MyAssetsScreen.propTypes = {
  myAssets: PropTypes.array.isRequired,
  account: PropTypes.object,
};

const mapStateToProps = state => {
  const { myAssets, accountInfo } = state;
  const { account } = accountInfo;
  const { list: myAssetsList } = myAssets;
  return { myAssets: myAssetsList, account };
};

const mapDispatchToProps = {
  setMyAssetsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAssetsScreen);
