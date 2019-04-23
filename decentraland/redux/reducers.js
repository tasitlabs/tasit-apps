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

// Reducing boilerplate from reducers
// Refs: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#reducing-boilerplate
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

//
// accountInfo reducer
//
const setAccount = (state, action) => {
  const { account } = action;
  return { ...state, account };
};
const setAccountCreationStatus = (state, action) => {
  const { creationStatus } = action;
  return { ...state, creationStatus };
};
const updateActionIdForAccountCreationStatus = (state, action) => {
  const { creationStatusAction } = action;
  const { status, actionId } = creationStatusAction;
  let { creationActions } = state;
  creationActions = { ...creationActions, [status]: actionId };
  return { ...state, creationActions };
};
const setAccountCreationActions = (state, action) => {
  const { creationActions } = action;
  return { ...state, creationActions };
};

const accountInfo = createReducer(
  {
    account: null,
    creationStatus: NOT_STARTED,
    creationActions: {},
  },
  {
    [SET_ACCOUNT]: setAccount,
    [SET_ACCOUNT_CREATION_STATUS]: setAccountCreationStatus,
    [UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS]: updateActionIdForAccountCreationStatus,
    [SET_ACCOUNT_CREATION_ACTIONS]: setAccountCreationActions,
  }
);

//
// selectedLandToBuy reducer
//
const selectLandToBuy = (state, action) => {
  const { landForSale } = action;
  return landForSale;
};

const selectedLandToBuy = createReducer(null, {
  [SELECT_LAND_TO_BUY]: selectLandToBuy,
});

//
// assetsForSale reducer
//
const prependLandForSaleToList = (state, action) => {
  const { landForSale } = action;
  return { ...state, list: [landForSale, ...state.list] };
};

const appendLandForSaleToList = (state, action) => {
  const { landForSale } = action;
  return { ...state, list: [...state.list, landForSale] };
};

const removeLandForSale = (state, action) => {
  const { landForSale } = action;
  let { list: assetsForSale } = state;
  const list = removeFromList(assetsForSale, landForSale);
  return { ...state, list };
};

const setLoadingAssetsForSaleInProgress = (state, action) => {
  const { loadingInProgress } = action;
  return { ...state, loadingInProgress };
};

const assetsForSale = createReducer(
  { list: [], loadingInProgress: true },
  {
    [PREPEND_LAND_FOR_SALE_TO_LIST]: prependLandForSaleToList,
    [APPEND_LAND_FOR_SALE_TO_LIST]: appendLandForSaleToList,
    [REMOVE_LAND_FOR_SALE]: removeLandForSale,
    [SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS]: setLoadingAssetsForSaleInProgress,
  }
);

//
// myAssets reducer
//
const prependToMyAssetsList = (state, action) => {
  const { myAsset } = action;
  return { ...state, list: [myAsset, ...state.list] };
};

const appendToMyAssetsList = (state, action) => {
  const { itemOrList } = action;
  const toAppend = toListIfNot(itemOrList);
  return { ...state, list: [...state.list, ...toAppend] };
};

const removeFromMyAssetsList = (state, action) => {
  const { itemOrList } = action;
  const { list: myAssets } = state;
  const toRemove = itemOrList;
  const list = removeFromList(myAssets, toRemove);
  return { ...state, list };
};

const setMyAssetsList = (state, action) => {
  const { myAssets } = action;
  const list = myAssets === null ? [] : myAssets;
  return { ...state, list };
};

const setActionIdForMyAsset = (state, action) => {
  const { myAssetAndActionIds } = action;
  const { myAssetId: toUpdateId, actionId } = myAssetAndActionIds;
  const { list: myAssets } = state;
  const entriesToUpdate = { actionId };
  const list = updateListItem(myAssets, toUpdateId, entriesToUpdate);
  return { ...state, list };
};

const updateMyAssetStatus = (state, action) => {
  const { myAssetAndStatus } = action;
  const { myAssetId: toUpdateId, status } = myAssetAndStatus;
  const { list: myAssets } = state;
  const entriesToUpdate = { status };
  const list = updateListItem(myAssets, toUpdateId, entriesToUpdate);
  return { ...state, list };
};

const myAssets = createReducer(
  { list: [] },
  {
    [PREPEND_TO_MY_ASSETS_LIST]: prependToMyAssetsList,
    [APPEND_TO_MY_ASSETS_LIST]: appendToMyAssetsList,
    [REMOVE_FROM_MY_ASSETS_LIST]: removeFromMyAssetsList,
    [SET_MY_ASSETS_LIST]: setMyAssetsList,
    [SET_ACTION_ID_FOR_MY_ASSET]: setActionIdForMyAsset,
    [UPDATE_MY_ASSET_STATUS]: updateMyAssetStatus,
  }
);

//
// All reducers
//
const decentralandApp = combineReducers({
  accountInfo,
  selectedLandToBuy,
  assetsForSale,
  myAssets,
});

export default decentralandApp;
