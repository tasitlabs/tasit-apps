import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  REMOVE_LAND_FOR_SALE,
  APPEND_LAND_FOR_SALE_TO_LIST,
  PREPEND_LAND_FOR_SALE_TO_LIST,
  SET_ACCOUNT_CREATION_STATUS,
  UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS,
  SET_ACCOUNT_CREATION_ACTIONS,
  SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS,
  PREPEND_TO_MY_ASSETS_LIST,
  APPEND_TO_MY_ASSETS_LIST,
  REMOVE_FROM_MY_ASSETS_LIST,
  SET_MY_ASSETS_LIST,
  SET_ACTION_ID_FOR_MY_ASSET,
  UPDATE_MY_ASSET_STATUS,
} from "./actions";
import { removeFromList, updateListItem, toListIfNot } from "@helpers";

import AccountCreationStatus from "@constants/AccountCreationStatus";
const { NOT_STARTED } = AccountCreationStatus;

function accountInfo(
  state = {
    account: null,
    creationStatus: NOT_STARTED,
    creationActions: {},
  },
  action
) {
  const {
    type,
    account,
    creationStatus,
    creationStatusAction,
    creationActions,
  } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_ACCOUNT_CREATION_STATUS:
      return { ...state, creationStatus };
    case UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS: {
      const { status, actionId } = creationStatusAction;
      let { creationActions } = state;
      creationActions = { ...creationActions, [status]: actionId };
      return { ...state, creationActions };
    }
    case SET_ACCOUNT_CREATION_ACTIONS: {
      return { ...state, creationActions };
    }
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
    case PREPEND_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [landForSale, ...state.list] };
    case APPEND_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [...state.list, landForSale] };
    case REMOVE_LAND_FOR_SALE: {
      let { list: assetsForSale } = state;
      const list = removeFromList(assetsForSale, landForSale);
      return { ...state, list };
    }
    case SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS:
      return { ...state, loadingInProgress };
    default:
      return state;
  }
}

function myAssets(state = { list: [] }, action) {
  const {
    type,
    myAsset,
    myAssets,
    myAssetAndActionIds,
    myAssetAndStatus,
    itemOrList,
  } = action;

  switch (type) {
    case PREPEND_TO_MY_ASSETS_LIST:
      return { ...state, list: [myAsset, ...state.list] };
    case APPEND_TO_MY_ASSETS_LIST: {
      const toAppend = toListIfNot(itemOrList);
      return { ...state, list: [...state.list, ...toAppend] };
    }
    case REMOVE_FROM_MY_ASSETS_LIST: {
      const { list: myAssets } = state;
      const toRemove = itemOrList;
      const list = removeFromList(myAssets, toRemove);
      return { ...state, list };
    }
    case SET_MY_ASSETS_LIST: {
      const list = myAssets === null ? [] : myAssets;
      return { ...state, list };
    }
    case SET_ACTION_ID_FOR_MY_ASSET: {
      const { myAssetId: toUpdateId, actionId } = myAssetAndActionIds;
      const { list: myAssets } = state;
      const entriesToUpdate = { actionId };
      const list = updateListItem(myAssets, toUpdateId, entriesToUpdate);
      return { ...state, list };
    }
    case UPDATE_MY_ASSET_STATUS: {
      const { myAssetId: toUpdateId, status } = myAssetAndStatus;
      const { list: myAssets } = state;
      const entriesToUpdate = { status };
      const list = updateListItem(myAssets, toUpdateId, entriesToUpdate);
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
