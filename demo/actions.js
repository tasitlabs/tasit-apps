export const SET_ACCOUNT = "SET_ACCOUNT";
export const SELECT_LAND_TO_BUY = "SELECT_LAND_TO_BUY";
export const SET_LAND_FOR_SALE_LIST = "SET_LAND_FOR_SALE_LIST";
export const REMOVE_LAND_FOR_SALE = "REMOVE_LAND_FOR_SALE";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function selectLandToBuy(landForSale) {
  return { type: SELECT_LAND_TO_BUY, landForSale };
}

export function setLandForSaleList(landForSaleList) {
  return { type: SET_LAND_FOR_SALE_LIST, landForSaleList };
}

// Should rename that to removeLandForSaleFromUI or is it obvious?
export function removeLandForSale(landForSale) {
  return { type: REMOVE_LAND_FOR_SALE, landForSale };
}
