export const SET_ACCOUNT = "SET_ACCOUNT";
export const SELECT_LAND_TO_BUY = "SELECT_LAND_TO_BUY";
export const SET_LAND_FOR_SALE_LIST = "SET_LAND_FOR_SALE_LIST";
export const REMOVE_LAND_FOR_SALE = "REMOVE_LAND_FOR_SALE";
export const ADD_LAND_FOR_SALE_TO_LIST = "ADD_LAND_FOR_SALE_TO_LIST";
export const SET_SETUP_IN_PROGRESS = "SET_SETUP_IN_PROGRESS";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function setSetupInProgress(inProgress) {
  return { type: SET_SETUP_IN_PROGRESS, inProgress };
}

export function selectLandToBuy(landForSale) {
  return { type: SELECT_LAND_TO_BUY, landForSale };
}

export function setLandForSaleList(landForSaleList) {
  return { type: SET_LAND_FOR_SALE_LIST, landForSaleList };
}

export function addLandForSaleToList(landForSale) {
  return { type: ADD_LAND_FOR_SALE_TO_LIST, landForSale };
}

// Should rename that to removeLandForSaleFromUI or is it obvious?
export function removeLandForSale(landForSale) {
  return { type: REMOVE_LAND_FOR_SALE, landForSale };
}
