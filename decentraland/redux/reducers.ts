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
  ADD_USER_ACTION,
  UPDATE_USER_ACTION_STATUS,
} from "./actions";
import { removeFromList, isInList, toListIfNot } from "../helpers";

import AccountCreationStatus from "../constants/AccountCreationStatus";
const { NOT_STARTED } = AccountCreationStatus;

// Reducing boilerplate from reducers
// Refs: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#reducing-boilerplate
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action): object {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

//
// accountInfo reducer
//
const setAccount = (state: {}, action: { account: any }): object => {
  const { account } = action;
  return { ...state, account };
};

const setAccountCreationStatus = (
  state: {},
  action: { creationStatus: any }
): object => {
  const { creationStatus } = action;
  return { ...state, creationStatus };
};

const updateActionIdForAccountCreationStatus = (
  state: { creationActions?: any },
  action: { creationStatusAction: any }
): object => {
  const { creationStatusAction } = action;
  const { status, actionId } = creationStatusAction;
  let { creationActions } = state;
  creationActions = { ...creationActions, [status]: actionId };
  return { ...state, creationActions };
};
const setAccountCreationActions = (
  state: {},
  action: { creationActions: any }
): object => {
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
// landToBuy reducer
//
const selectLandToBuy = (state: any, action: { landForSale: any }): object => {
  const { landForSale } = action;
  return landForSale;
};

const landToBuy = createReducer(null, {
  [SELECT_LAND_TO_BUY]: selectLandToBuy,
});

//
// assetsForSale reducer
//
const prependLandForSaleToList = (
  state: { list?: any },
  action: { landForSale: any }
): object => {
  const { landForSale } = action;
  const { id } = landForSale;
  const { list: assetsForSale } = state;
  console.info("previous for sale list length", assetsForSale.length);
  console.info("prepend landForSale id", id);

  // TODO: Consider having this function ensure that landForSale
  // isn't already in the list before adding it
  return { ...state, list: [landForSale, ...state.list] };
};

const appendLandForSaleToList = (
  state: { list?: any },
  action: { landForSale: any }
): object => {
  const { landForSale } = action;
  const { id } = landForSale;
  // const { list: assetsForSale } = state;
  // console.info("previous for sale list length", assetsForSale.length);
  console.info("append landForSale id", id);
  // Note: Having list be an object enforces unique keys
  // TODO: Have it be an object elsewhere OR
  // make sure the list is purged so we couldn't get to the state
  // with duplicate keys in an array
  // in the first place
  // Only ran into issues here when the effect to trigger this
  // was being called on every mount rather than just
  // when it needed to be
  // if (isInList(state.list, landForSale)) {
  //   // console.log("Already in list")
  //   return { ...state }
  // } else {

  return { ...state, list: [...state.list, landForSale] };
  // return { ...state, list: { ...state.list, landForSale } };
  // }
};

const removeLandForSale = (
  state: { list?: any },
  action: { landForSale: any }
): object => {
  const { landForSale } = action;
  const { id } = landForSale;
  console.info("remove landForSale id", id);
  const { list: assetsForSale } = state;
  console.info("previous for sale list length", assetsForSale.length);
  const list = removeFromList(assetsForSale, landForSale);
  return { ...state, list };
};

const setLoadingAssetsForSaleInProgress = (
  state: {},
  action: { loadingInProgress: any }
): object => {
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
const prependToMyAssetsList = (
  state: { list?: any },
  action: { myAsset: any }
): object => {
  const { myAsset } = action;
  const { list: myAssets } = state;
  console.info("previous my assets list", myAssets);
  console.info("prepend myAsset", myAsset);
  return { ...state, list: [myAsset, ...state.list] };
};

const appendToMyAssetsList = (
  state: { list?: any },
  action: { itemOrList: any }
): object => {
  const { itemOrList } = action;
  const { list: myAssets } = state;
  console.info("previous my assets list", myAssets);
  const toAppend = toListIfNot(itemOrList);
  console.info("append myAsset item or list", toAppend);
  return { ...state, list: [...state.list, ...toAppend] };
};

const removeFromMyAssetsList = (
  state: { list?: any },
  action: { itemOrList: any }
): object => {
  const { itemOrList } = action;
  const { list: myAssets } = state;
  console.info("previous my assets list", myAssets);
  const toRemove = itemOrList;
  console.info("remove myAsset", toRemove);
  const list = removeFromList(myAssets, toRemove);
  return { ...state, list };
};

const setMyAssetsList = (state: {}, action: { myAssets: any }): object => {
  const { myAssets } = action;
  const list = myAssets === null ? [] : myAssets;
  return { ...state, list };
};

const myAssets = createReducer(
  { list: [] },
  {
    [PREPEND_TO_MY_ASSETS_LIST]: prependToMyAssetsList,
    [APPEND_TO_MY_ASSETS_LIST]: appendToMyAssetsList,
    [REMOVE_FROM_MY_ASSETS_LIST]: removeFromMyAssetsList,
    [SET_MY_ASSETS_LIST]: setMyAssetsList,
  }
);

//
// userActions reducer
//
const addUserAction = (state: {}, action: { userAction: any }): object => {
  const { userAction } = action;
  return { ...state, ...userAction };
};

const updateUserActionStatus = (
  state: object,
  action: { actionIdAndStatus: any }
): object => {
  const { actionIdAndStatus } = action;
  const { actionId, status } = actionIdAndStatus;

  let userActionProps = state[actionId];
  if (!userActionProps) return state;

  userActionProps = { ...userActionProps, status };
  return { ...state, [actionId]: userActionProps };
};

const userActions = createReducer(
  {},
  {
    [ADD_USER_ACTION]: addUserAction,
    [UPDATE_USER_ACTION_STATUS]: updateUserActionStatus,
  }
);

//
// All reducers
//
const decentralandApp = combineReducers({
  accountInfo,
  landToBuy,
  assetsForSale,
  myAssets,
  userActions,
});

export default decentralandApp;
