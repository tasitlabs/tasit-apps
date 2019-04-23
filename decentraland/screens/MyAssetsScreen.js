import React from "react";
import { connect } from "react-redux";
import { removeFromMyAssetsList, appendToMyAssetsList } from "../redux/actions";
import PropTypes from "prop-types";
import MyAssetsList from "@presentational/MyAssetsList";
import MyAssetsListItem from "@presentational/MyAssetsListItem";
import { listsAreEqual, getContracts, logWarn } from "@helpers";
import { generateAssetFromId } from "@helpers/decentraland";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";
import MyAssetStatus from "@constants/MyAssetStatus";
const { BOUGHT } = MyAssetStatus;

export class MyAssetsScreen extends React.Component {
  componentDidMount = async () => {
    const {
      account,
      myAssets: assetsFromState,
      removeFromMyAssetsList,
      appendToMyAssetsList,
    } = this.props;
    if (account) {
      const { address } = account;

      // Note: If a stored asset doesn't have a status, assuming 'bought'.
      const boughtAssets = assetsFromState
        .map(asset => (!asset.status ? { ...asset, status: BOUGHT } : asset))
        .filter(asset => asset.status === BOUGHT);

      const assetsFromBlockchain = await this._getAssetsFromBlockchain(address);
      const shouldUpdate = !listsAreEqual(assetsFromBlockchain, boughtAssets);
      if (shouldUpdate) {
<<<<<<< HEAD
        this._logAssetsInconsistency(assetsFromBlockchain, boughtAssets);
=======
        // TODO: Add some UI indication that something unexpected happened
        logWarn(
          `Account's assets from blockchain aren't the same as the ones stored on the app.`
        );
>>>>>>> be85215bf97edb9c9ec4a201f2183f829b9f6a28
        removeFromMyAssetsList(boughtAssets);
        appendToMyAssetsList(assetsFromBlockchain);
      }
    }
  };

  _logAssetsInconsistency = (fromBlockchain, fromState) => {
    const fromBlockchainIds = fromBlockchain.map(asset => asset.id);
    const fromStateIds = fromState.map(asset => asset.id);

    const addedIds = fromBlockchainIds.filter(id => !fromStateIds.includes(id));
    const removedIds = fromStateIds.filter(
      id => !fromBlockchainIds.includes(id)
    );

    // TODO: Add some UI indication that something unexpected happened
    logWarn(`Assets from blockchain aren't the same as the stored on the app.`);

    if (addedIds.length > 0)
      logWarn(`Some assets added to MyLandScreen. IDs: [${addedIds}]`);

    if (removedIds.length > 0)
      logWarn(`Some assets removed from MyLandScreen. IDs: [${removedIds}]`);
  };

  _getAssetsFromBlockchain = async address => {
    const listOfPromises = await this._getAssetsOf(address);
    const fromBlockchain = await Promise.all([...listOfPromises]);
    // Note: The UI shows land the user bought ordered by purchase date (desc)
    return fromBlockchain.reverse();
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
      const generateAsset = async land => {
        const { id: assetId, nftAddress, transactionHash: actionId } = land;
        const status = BOUGHT;

        const asset = await generateAssetFromId(
          estateContract,
          landContract,
          assetId,
          nftAddress
        );

        return { ...asset, actionId, status };
      };

      const assetPromise = generateAsset(land);
      assets.push(assetPromise);
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
  removeFromMyAssetsList,
  appendToMyAssetsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAssetsScreen);
