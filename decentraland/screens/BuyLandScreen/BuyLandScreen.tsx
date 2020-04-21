import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from "react-navigation";

import { GlobalState } from "../../types/GlobalState";

import {
  removeLandForSale,
  prependLandForSaleToList,
  removeFromMyAssetsList,
  prependToMyAssetsList,
  addUserAction,
  updateUserActionStatus,
} from "../../redux/actions";

import BuyLand from "../../components/presentational/BuyLand";

import { showError, showInfo, getContracts } from "../../helpers";

import { ESTATE, PARCEL } from "../../constants/AssetTypes";
import { PENDING, SUCCESSFUL } from "../../constants/UserActionStatus";

interface AccountInfoObject {
  account: any;
  creationStatus: string;
  creationActions: any[];
}

interface SelectedState {
  accountInfo: AccountInfoObject;
  landToBuy: any;
  myAssets: any[];
}

import { NavigationStackProp } from "react-navigation-stack";

type BuyLandScreenProps = {
  navigation: NavigationStackProp;
};

export const BuyLandScreen: React.FunctionComponent<BuyLandScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const { accountInfo, landToBuy: landForSale } = useSelector<
    GlobalState,
    SelectedState
  >(state => {
    const { accountInfo, landToBuy, myAssets } = state;
    const { list: myAssetsList } = myAssets;
    return { accountInfo, landToBuy, myAssets: myAssetsList };
  });

  const _onBuy = (landForSale): void => {
    try {
      const { account } = accountInfo;
      if (!account) _setupAccount();
      else _buy(landForSale);
    } catch (err) {
      showError(err);
    }
  };

  const _setupAccount = (): void => {
    navigation.navigate("OnboardingHomeScreen");
  };

  const _buy = async (landForSale): Promise<void> => {
    const { account } = accountInfo;
    const { asset, id: landId } = landForSale;

    console.info("landForSaleId", landId);
    const { id: assetId, type } = asset;
    if (type !== ESTATE && type !== PARCEL) showError(`Unknown asset.`);
    const typeDescription = type == ESTATE ? "Estate" : "Parcel";

    const onError = (assetForSale, message): void => {
      console.info("onError triggered", message);
      const { asset } = assetForSale;
      showError(message);
      dispatch(removeFromMyAssetsList(asset));
      // TODO: We encountered an error state where the land for
      // sale was still in the list, which means prepending it
      // was redundant and triggering another error.
      // Decide whether to have prependLandForSaleToList
      // dedupe before prepending, or whether to ensure that even in
      // error states the land has been removed before getting here
      dispatch(prependLandForSaleToList(assetForSale));
    };

    showInfo(`Buying the ${typeDescription.toLowerCase()}...`);
    const action = await _executeOrder(landForSale, account, onError);

    const onSuccess = async (): Promise<void> => {
      // TODO: This function should be called inside of the eventListener
      // that catches the safeExecuteOrder successful event.
      await action.waitForOneConfirmation();
      // TODO: Change me to pub/sub style
      const actionId = await action.getId();
      console.info("actionId", actionId);
      dispatch(updateUserActionStatus({ actionId, status: SUCCESSFUL }));
      showInfo(`${typeDescription} bought successfully.`);
    };

    // TODO: Possibly remove this await to ensure land for sale
    // is optimistically removed, or remove the land before this line
    // if that won't cause a disruptive re-render of the component
    await action.send();

    console.info("action", action);
    // Optimistic UI update
    dispatch(removeLandForSale(landForSale));
    dispatch(prependToMyAssetsList(asset));

    // Back to top of current Stack before navigate
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("MyAssetsScreen");

    const actionId = await action.getId();
    console.info({ actionId });
    const userAction = { [actionId]: { status: PENDING, assetId } };
    dispatch(addUserAction(userAction));
    onSuccess();
  };

  const _executeOrder = async (
    sellOrder,
    account,
    onError
  ): Promise<object> => {
    try {
      const { priceManaInWei: priceInWei, asset } = sellOrder;
      const { id: assetId, type } = asset;
      const contracts = getContracts();
      const { marketplaceContract, estateContract, landContract } = contracts;

      const nftAddress =
        type === ESTATE
          ? estateContract.getAddress()
          : landContract.getAddress();

      // LANDRegistry contract doesn't implement getFingerprint function
      const fingerprint =
        type === ESTATE ? await estateContract.getFingerprint(assetId) : "0x";
      marketplaceContract.setAccount(account);
      // TODO: Add extra param back in to reproduce the error
      // state that we should handle better

      const action = marketplaceContract.safeExecuteOrder(
        nftAddress,
        `${assetId}`,
        `${priceInWei}`,
        `${fingerprint}`
      );

      return action;
    } catch (error) {
      console.info("Caught error in _executeOrder");
      // Note: The current version isn't supporting `failing` events
      // See more:
      // https://github.com/tasitlabs/tasit/issues/151
      // https://github.com/tasitlabs/tasit/issues/233
      onError(sellOrder, error.message);
    }
  };

  const { creationStatus, creationActions } = accountInfo;
  return (
    <BuyLand
      landForSale={landForSale}
      onBuy={(): void => _onBuy(landForSale)}
      accountCreationStatus={creationStatus}
      accountCreationActions={creationActions}
    />
  );
};

export default BuyLandScreen;
