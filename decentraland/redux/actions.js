export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_SETUP_IN_PROGRESS = "SET_SETUP_IN_PROGRESS"; // deprecated
export const SET_ACCOUNT_FUNDED_WITH_ETHERS = "SET_ACCOUNT_FUNDED_WITH_ETHERS"; // deprecated
export const SET_ACCOUNT_FUNDED_WITH_MANA = "SET_ACCOUNT_FUNDED_WITH_MANA"; // deprecated
export const SET_ACCOUNT_APPROVED_MARKETPLACE =
  "SET_ACCOUNT_APPROVED_MARKETPLACE"; // deprecated
export const SET_ACCOUNT_CREATION_STATUS = "SET_ACCOUNT_CREATION_STATUS";
export const SELECT_LAND_TO_BUY = "SELECT_LAND_TO_BUY";
export const SET_LAND_FOR_SALE_LIST = "SET_LAND_FOR_SALE_LIST";
export const REMOVE_LAND_FOR_SALE = "REMOVE_LAND_FOR_SALE";
export const ADD_LAND_FOR_SALE_TO_LIST = "ADD_LAND_FOR_SALE_TO_LIST";
export const SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS =
  "SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS";
export const ADD_TO_MY_ASSETS_LIST = "ADD_TO_MY_ASSETS_LIST";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

// deprecated
export function setSetupInProgress(inProgress) {
  return { type: SET_SETUP_IN_PROGRESS, inProgress };
}

// deprecated
export function setAccountFundedWithEthers(fundedWithEthers) {
  return { type: SET_ACCOUNT_FUNDED_WITH_ETHERS, fundedWithEthers };
}

// deprecated
export function setAccountFundedWithMana(fundedWithMana) {
  return { type: SET_ACCOUNT_FUNDED_WITH_MANA, fundedWithMana };
}

// deprecated
export function setAccountApprovedMarketplace(approvedMarketplace) {
  return { type: SET_ACCOUNT_APPROVED_MARKETPLACE, approvedMarketplace };
}

export function setAccountCreationStatus(creationStatus) {
  return { type: SET_ACCOUNT_CREATION_STATUS, creationStatus };
}

export function selectLandToBuy(landForSale) {
  return { type: SELECT_LAND_TO_BUY, landForSale };
}

export function setLandForSaleList(list) {
  return { type: SET_LAND_FOR_SALE_LIST, list };
}

export function addLandForSaleToList(landForSale) {
  return { type: ADD_LAND_FOR_SALE_TO_LIST, landForSale };
}

export function setLoadingAssetsForSaleInProgress(loadingInProgress) {
  return { type: SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS, loadingInProgress };
}

export function removeLandForSale(landForSale) {
  return { type: REMOVE_LAND_FOR_SALE, landForSale };
}

export function addToMyAssetsList(myAsset) {
  return { type: ADD_TO_MY_ASSETS_LIST, myAsset };
}
