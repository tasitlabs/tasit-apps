import React from "react";
import { connect } from "react-redux";
import {
  removeFromMyAssetsList,
  appendToMyAssetsList,
  addUserAction,
} from "../../redux/actions";
import MyAssetsList from "../../components/presentational/MyAssetsList";
import MyAssetsListItem from "../../components/presentational/MyAssetsListItem";
import { listsAreEqual, getContracts, logInfo, logWarn } from "../../helpers";
import { generateAssetFromId } from "../../helpers/decentraland";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";
import { SUCCESSFUL } from "../../constants/UserActionStatus";

interface AccountObject {
  address: string;
}

interface AssetObject {
  actionId: string;
  id: string;
}

interface AssetsAndActionsObject {
  assetsFromBlockchain: AssetObject[];
  actionsFromBlockchain: object[];
}

type MyAssetsScreenProps = {
  myAssets: any[];
  account?: AccountObject;
  userActions: any;
  removeFromMyAssetsList: (...args: any[]) => any;
  appendToMyAssetsList: (...args: any[]) => any;
  addUserAction: (...args: any[]) => any;
};

export class MyAssetsScreen extends React.Component<MyAssetsScreenProps, {}> {
  componentDidMount = async () => {
    const {
      account,
      removeFromMyAssetsList,
      appendToMyAssetsList,
      addUserAction,
    } = this.props;

    if (account) {
      const { address } = account;
      const boughtAssets = this._getBoughtAssetsFromState();

      const {
        assetsFromBlockchain,
        actionsFromBlockchain,
      } = await this._getAssetsAndActionsFromBlockchain(address);

      const shouldUpdate = !listsAreEqual(assetsFromBlockchain, boughtAssets);
      if (shouldUpdate) {
        // TODO: Add some UI indication that something unexpected happened
        this._logAssetsInconsistency(assetsFromBlockchain, boughtAssets);
        removeFromMyAssetsList(boughtAssets);
        appendToMyAssetsList(assetsFromBlockchain);
        addUserAction(actionsFromBlockchain);
      }
    }
  };

  _getAssetsAndActionsFromBlockchain = async (
    address
  ): Promise<AssetsAndActionsObject> => {
    const assetsFromBlockchain = await this._getAssetsFromBlockchain(address);
    let actionsFromBlockchain = {};
    assetsFromBlockchain.forEach((asset: AssetObject) => {
      const { actionId, id: assetId } = asset;

      const userAction = { [actionId]: { assetId, status: SUCCESSFUL } };
      actionsFromBlockchain = { ...actionsFromBlockchain, userAction };
    });
    assetsFromBlockchain.forEach(asset => delete asset.actionId);
    return { assetsFromBlockchain, actionsFromBlockchain };
  };

  _getBoughtAssetsFromState = (): object[] => {
    const { myAssets: assetsFromState, userActions } = this.props;
    const boughtAssets = assetsFromState.filter(asset => {
      const { id: assetId } = asset;
      const assetAction = userActions.find(
        action => action.assetId === assetId
      );
      return assetAction && assetAction.status === SUCCESSFUL;
    });
    return boughtAssets;
  };

  _logAssetsInconsistency = (fromBlockchain, fromState): void => {
    const fromBlockchainIds = fromBlockchain.map(asset => asset.id);
    const fromStateIds = fromState.map(asset => asset.id);
    const addedIds = fromBlockchainIds.filter(id => !fromStateIds.includes(id));
    const removedIds = fromStateIds.filter(
      id => !fromBlockchainIds.includes(id)
    );
    logInfo(
      `Account's assets from blockchain aren't the same as the ones stored on the app.`
    );
    if (addedIds.length > 0)
      logInfo(`Some assets added to MyLandScreen. IDs: [${addedIds}]`);
    if (removedIds.length > 0)
      logWarn(`Some assets removed from MyLandScreen. IDs: [${removedIds}]`);
  };

  _getAssetsFromBlockchain = async (address): Promise<AssetObject[]> => {
    const listOfPromises = await this._getAssetsOf(address);
    const fromBlockchain = await Promise.all([...listOfPromises]);
    // Note: The UI shows land the user bought ordered by purchase date (desc)
    return fromBlockchain.reverse();
  };

  // Note: Returns a list of Promises
  _getAssetsOf = async (address): Promise<Promise<any>[]> => {
    const decentralandUtils = new DecentralandUtils();
    const { getAssetsOf: getLandOf } = decentralandUtils;
    const contracts = getContracts();
    const { estateContract, landContract } = contracts;
    const listOfLand = await getLandOf(address);
    const assets = [];
    let land;

    for (land of listOfLand) {
      const generateAsset = async (land): Promise<object> => {
        const { id: assetId, nftAddress, transactionHash: actionId } = land;
        const asset = await generateAssetFromId(
          estateContract,
          landContract,
          assetId,
          nftAddress
        );
        return { ...asset, actionId };
      };

      const assetPromise = generateAsset(land);
      assets.push(assetPromise);
    }
    return assets;
  };

  _renderItem = ({ item: assetAndUserAction }): JSX.Element => {
    const { asset } = assetAndUserAction;
    let { userAction } = assetAndUserAction;
    if (!userAction) userAction = {};
    return <MyAssetsListItem asset={asset} userAction={userAction} />;
  };

  render(): JSX.Element {
    const { myAssets, userActions } = this.props;
    return (
      <MyAssetsList
        myAssets={myAssets}
        userActions={userActions}
        renderItem={this._renderItem}
      />
    );
  }
}
const mapStateToProps = (state): object => {
  const { myAssets, accountInfo, userActions } = state;
  const { account } = accountInfo;
  const { list: myAssetsList } = myAssets;
  return { myAssets: myAssetsList, account, userActions };
};
const mapDispatchToProps = {
  removeFromMyAssetsList,
  appendToMyAssetsList,
  addUserAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAssetsScreen);
