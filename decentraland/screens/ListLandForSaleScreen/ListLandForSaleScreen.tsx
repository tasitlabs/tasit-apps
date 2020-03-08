import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GlobalState } from "../../types/GlobalState";

import {
  appendLandForSaleToList,
  selectLandToBuy,
  setLoadingAssetsForSaleInProgress,
} from "../../redux/actions";
import LandForSaleList from "../../components/presentational/LandForSaleList";
import LandForSaleListItem from "../../components/presentational/LandForSaleListItem";
import {
  showError,
  showInfo,
  getContracts,
  addressesAreEqual,
} from "../../helpers";
import { generateAssetFromId } from "../../helpers/decentraland";
import { Root } from "native-base";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

import { NavigationStackProp } from "react-navigation-stack";

interface AssetsForSale {
  list: any;
  loadingInProgress: boolean;
}

interface SelectedState {
  assetsForSale: AssetsForSale;
}

// Note: This screen fetches data
export const ListLandForSaleScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { assetsForSale } = useSelector<GlobalState, SelectedState>(state => {
    const { assetsForSale } = state;
    return { assetsForSale };
  });

  useEffect(() => {
    const effectFunction = async (): Promise<void> => {
      try {
        showInfo("Loading land for sale...");
        const assetsForSale = await _getAllAssetsForSale();

        const loadingAssetsOnScreen = assetsForSale.map(promise => {
          const loadAssetOnScreen = async (): Promise<void> => {
            const assetForSale = await promise;
            dispatch(appendLandForSaleToList(assetForSale));
          };
          return loadAssetOnScreen();
        });
        await Promise.all([...loadingAssetsOnScreen]);
        dispatch(setLoadingAssetsForSaleInProgress(false));
      } catch (err) {
        showError(err);
      }
    };
    effectFunction();
  });

  // Note: Returns a list of Promises
  const _getAllAssetsForSale = async (): Promise<Promise<any>[]> => {
    const decentralandUtils = new DecentralandUtils();
    const { getAllAssetsForSale: getAllOpenSellOrders } = decentralandUtils;
    const openSellOrders = await getAllOpenSellOrders();
    const contracts = getContracts();
    const { landContract } = contracts;
    // Showing only parcels for now because of all estates are with blank images
    const parcelsForSale = [];
    let order;

    for (order of openSellOrders) {
      const { nftAddress } = order;
      const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
      if (isParcel) parcelsForSale.push(order);
    }

    const assetsForSale = [];
    // Note: Getting only the first 10 assets for now
    // See more: https://github.com/tasitlabs/tasit/issues/155
    const listSize = 10;
    let parcel;
    for (parcel of parcelsForSale.slice(0, listSize)) {
      const assetForSalePromise = _toAssetForSale(parcel);
      assetsForSale.push(assetForSalePromise);
    }
    return assetsForSale;
  };

  const _toAssetForSale = async (sellOrder): Promise<object> => {
    const contracts = getContracts();
    const { estateContract, landContract } = contracts;
    const {
      id,
      nftAddress,
      assetId,
      seller,
      priceInWei,
      expiresAt,
    } = sellOrder;
    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
    // TODO: Use TasitSDK Utils to deal with BigNumbers (will be implemented on v0.2.0)
    const priceManaInWei = `${priceInWei}`;
    const strPriceManaLength = priceManaInWei.length - 18;
    const strRoundedPriceMana = priceManaInWei.substring(0, strPriceManaLength);
    const priceMana = strRoundedPriceMana;

    const priceUSD = (Number(priceMana) / manaPerUsd).toFixed(2);

    const asset = await generateAssetFromId(
      estateContract,
      landContract,
      assetId,
      nftAddress
    );

    const assetForSale = {
      id,
      priceManaInWei,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      asset,
    };
    return assetForSale;
  };

  const _renderItem = ({ item: landForSale, navigation }): JSX.Element => {
    // TODO: Consider moving this handlePress function directly into the
    // LandForSaleListItem component. No clear reason a callback is needed
    // to modify this screen, and there's no reason to do dependency injection
    // to override a default for a general LandForSaleListItem. This is
    // all it's used for.

    const handlePress = (): void => {
      dispatch(selectLandToBuy(landForSale));
      navigation.navigate("BuyLandScreen");
    };

    return (
      <LandForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  const { list, loadingInProgress } = assetsForSale;
  // Note: The initial route component from react-navigation
  // Should add the NativaBase `Root` component.
  // See more: https://github.com/tasitlabs/tasit/pull/237#issuecomment-479124236
  // Tech debt: Move from here to the App.js component.
  return (
    <Root>
      <LandForSaleList
        landForSaleList={list}
        renderItem={_renderItem}
        loadingInProgress={loadingInProgress}
      />
    </Root>
  );
};

export default ListLandForSaleScreen;
