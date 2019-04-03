import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  REMOVE_LAND_FOR_SALE,
  ADD_LAND_FOR_SALE_TO_LIST,
  SET_ACCOUNT_CREATION_STATUS,
  SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS,
  ADD_TO_MY_ASSETS_LIST,
  REMOVE_MY_ASSET_FROM_LIST,
} from "./actions";

import AccountCreationStatus from "@constants/AccountCreationStatus";
const { NOT_STARTED } = AccountCreationStatus;

function accountInfo(
  state = {
    account: null,
    setupInProgress: false,
    fundedWithEthers: false,
    fundedWithMana: false,
    marketplaceApproved: false,
    creationStatus: NOT_STARTED,
  },
  action
) {
  const { type, account, creationStatus } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_ACCOUNT_CREATION_STATUS:
      return { ...state, creationStatus };
    default:
      return state;
  }
}

function selectedLandToBuy(state = null, action) {
  const { type, landForSale } = action;
  switch (type) {
    case SELECT_LAND_TO_BUY:
      return landForSale;
    default:
      return state;
  }
}

function assetsForSale(state = { list: [], loadingInProgress: true }, action) {
  const { type, landForSale, loadingInProgress } = action;
  switch (type) {
    case ADD_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [landForSale, ...state.list] };
    case REMOVE_LAND_FOR_SALE: {
      let { list: assetsForSale } = state;
      const toRemove = landForSale;
      const list = assetsForSale.filter(asset => asset !== toRemove);
      return { ...state, list };
    }
    case SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS:
      return { ...state, loadingInProgress };
    default:
      return state;
  }
}

function myAssets(state = { list: [] }, action) {
  const { type, myAsset } = action;
  switch (type) {
    case ADD_TO_MY_ASSETS_LIST:
      return { ...state, list: [myAsset, ...state.list] };
    case REMOVE_MY_ASSET_FROM_LIST: {
      const { list: myAssets } = state;
      const toRemove = myAsset;
      const list = myAssets.filter(asset => asset !== toRemove);
      return { ...state, list };
    }
    default:
      return state;
  }
}

const decentralandApp = combineReducers({
  accountInfo,
  selectedLandToBuy,
  assetsForSale,
  myAssets,
});

export default decentralandApp;
