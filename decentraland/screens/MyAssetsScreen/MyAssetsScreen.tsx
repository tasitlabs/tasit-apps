import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GlobalState } from "../../types/GlobalState";

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

interface UserActionObject {
  assetId: string;
  status: string;
}

interface AssetsAndActionsObject {
  assetsFromBlockchain: AssetObject[];
  actionsFromBlockchain: object;
}

interface SelectedState {
  myAssets: AssetObject[];
  account?: AccountObject;
  userActions: UserActionObject[];
}

// Note: This screen fetches data
export const MyAssetsScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { myAssets: assetsFromState, account, userActions } = useSelector<
    GlobalState,
    SelectedState
  >(state => {
    const { myAssets, accountInfo, userActions } = state;
    const { account } = accountInfo;
    const { list: myAssetsList } = myAssets;
    return { myAssets: myAssetsList, account, userActions };
  });

  useEffect(() => {
    const useEffectFunction = async (): Promise<void> => {
      if (account) {
        const { address } = account;
        const boughtAssets = _getBoughtAssetsFromState();

        const {
          assetsFromBlockchain,
          actionsFromBlockchain,
        } = await _getAssetsAndActionsFromBlockchain(address);

        const shouldUpdate = !listsAreEqual(assetsFromBlockchain, boughtAssets);
        if (shouldUpdate) {
          // TODO: Add some UI indication that something unexpected happened
          _logAssetsInconsistency(assetsFromBlockchain, boughtAssets);
          dispatch(removeFromMyAssetsList(boughtAssets));
          dispatch(appendToMyAssetsList(assetsFromBlockchain));
          dispatch(addUserAction(actionsFromBlockchain));
        }
      }
    };
    useEffectFunction();
  });

  const _getAssetsAndActionsFromBlockchain = async (
    address
  ): Promise<AssetsAndActionsObject> => {
    const assetsFromBlockchain = await _getAssetsFromBlockchain(address);
    let actionsFromBlockchain = {};
    assetsFromBlockchain.forEach((asset: AssetObject) => {
      const { actionId, id: assetId } = asset;

      const userAction = { [actionId]: { assetId, status: SUCCESSFUL } };
      actionsFromBlockchain = { ...actionsFromBlockchain, userAction };
    });
    assetsFromBlockchain.forEach(asset => delete asset.actionId);
    return { assetsFromBlockchain, actionsFromBlockchain };
  };

  const _getBoughtAssetsFromState = (): object[] => {
    const boughtAssets = assetsFromState.filter((asset): boolean => {
      const { id: assetId } = asset;
      const assetAction = userActions.find(
        action => action.assetId === assetId
      );
      return assetAction && assetAction.status === SUCCESSFUL;
    });
    return boughtAssets;
  };

  const _logAssetsInconsistency = (fromBlockchain, fromState): void => {
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

  const _getAssetsFromBlockchain = async (address): Promise<AssetObject[]> => {
    const listOfPromises = await _getAssetsOf(address);
    const fromBlockchain = await Promise.all([...listOfPromises]);
    // Note: The UI shows land the user bought ordered by purchase date (desc)
    return fromBlockchain.reverse();
  };

  // Note: Returns a list of Promises
  const _getAssetsOf = async (address): Promise<Promise<AssetObject>[]> => {
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

  const _renderItem = ({ item: assetAndUserAction }): JSX.Element => {
    const { asset } = assetAndUserAction;
    let { userAction } = assetAndUserAction;
    if (!userAction) userAction = {};
    return <MyAssetsListItem asset={asset} userAction={userAction} />;
  };

  return (
    <MyAssetsList
      myAssets={assetsFromState}
      userActions={userActions}
      renderItem={_renderItem}
    />
  );
};

export default MyAssetsScreen;
