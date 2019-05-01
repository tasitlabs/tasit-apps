export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_ACCOUNT_CREATION_STATUS = "SET_ACCOUNT_CREATION_STATUS";
export const UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS =
  "UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS";
export const SET_ACCOUNT_CREATION_ACTIONS = "SET_ACCOUNT_CREATION_ACTIONS";
export const SELECT_LAND_TO_BUY = "SELECT_LAND_TO_BUY";
export const REMOVE_LAND_FOR_SALE = "REMOVE_LAND_FOR_SALE";
export const APPEND_LAND_FOR_SALE_TO_LIST = "APPEND_LAND_FOR_SALE_TO_LIST";
export const PREPEND_LAND_FOR_SALE_TO_LIST = "PREPEND_LAND_FOR_SALE_TO_LIST";
export const SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS =
  "SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS";
export const PREPEND_TO_MY_ASSETS_LIST = "PREPEND_TO_MY_ASSETS_LIST";
export const APPEND_TO_MY_ASSETS_LIST = "APPEND_TO_MY_ASSETS_LIST";
export const REMOVE_FROM_MY_ASSETS_LIST = "REMOVE_FROM_MY_ASSETS_LIST";
export const SET_MY_ASSETS_LIST = "SET_MY_ASSETS_LIST";
export const ADD_USER_ACTION = "ADD_USER_ACTION";
export const UPDATE_USER_ACTION_STATUS = "UPDATE_USER_ACTION_STATUS";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function setAccountCreationStatus(creationStatus) {
  return { type: SET_ACCOUNT_CREATION_STATUS, creationStatus };
}

export function updateActionIdForAccountCreationStatus(creationStatusAction) {
  return {
    type: UPDATE_ACTION_ID_FOR_ACCOUNT_CREATION_STATUS,
    creationStatusAction,
  };
}

export function setAccountCreationActions(creationActions) {
  return { type: SET_ACCOUNT_CREATION_ACTIONS, creationActions };
}

export function selectLandToBuy(landForSale) {
  return { type: SELECT_LAND_TO_BUY, landForSale };
}

export function appendLandForSaleToList(landForSale) {
  return { type: APPEND_LAND_FOR_SALE_TO_LIST, landForSale };
}

export function prependLandForSaleToList(landForSale) {
  return { type: PREPEND_LAND_FOR_SALE_TO_LIST, landForSale };
}

export function setLoadingAssetsForSaleInProgress(loadingInProgress) {
  return { type: SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS, loadingInProgress };
}

export function removeLandForSale(landForSale) {
  return { type: REMOVE_LAND_FOR_SALE, landForSale };
}

export function prependToMyAssetsList(myAsset) {
  return { type: PREPEND_TO_MY_ASSETS_LIST, myAsset };
}

export function appendToMyAssetsList(itemOrList) {
  return { type: APPEND_TO_MY_ASSETS_LIST, itemOrList };
}

export function removeFromMyAssetsList(itemOrList) {
  return { type: REMOVE_FROM_MY_ASSETS_LIST, itemOrList };
}

export function setMyAssetsList(myAssets) {
  return { type: SET_MY_ASSETS_LIST, myAssets };
}

export function addUserAction(userAction) {
  return { type: ADD_USER_ACTION, userAction };
}

export function updateUserActionStatus(actionIdAndStatus) {
  return { type: UPDATE_USER_ACTION_STATUS, actionIdAndStatus };
}
