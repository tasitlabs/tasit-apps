import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  SET_LAND_FOR_SALE_LIST,
  REMOVE_LAND_FOR_SALE,
  ADD_LAND_FOR_SALE_TO_LIST,
  SET_SETUP_IN_PROGRESS, // deprecated
  SET_ACCOUNT_FUNDED_WITH_ETHERS, // deprecated
  SET_ACCOUNT_FUNDED_WITH_MANA, // deprecated
  SET_ACCOUNT_APPROVED_MARKETPLACE, // deprecated
  SET_ACCOUNT_CREATION_STATUS,
  SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS,
  ADD_TO_MY_ASSETS_LIST,
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
  const {
    type,
    account,
    inProgress: setupInProgress, // deprecated
    fundedWithEthers, // deprecated
    fundedWithMana, // deprecated
    approvedMarketplace, // deprecated
    creationStatus,
  } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_SETUP_IN_PROGRESS: // deprecated
      return { ...state, setupInProgress };
    case SET_ACCOUNT_FUNDED_WITH_ETHERS: // deprecated
      return { ...state, fundedWithEthers };
    case SET_ACCOUNT_FUNDED_WITH_MANA: // deprecated
      return { ...state, fundedWithMana };
    case SET_ACCOUNT_APPROVED_MARKETPLACE: // deprecated
      return { ...state, approvedMarketplace };
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
  const { type, list, landForSale, loadingInProgress } = action;
  switch (type) {
    case SET_LAND_FOR_SALE_LIST:
      return { ...state, list };
    case ADD_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [...state.list, landForSale] };
    case REMOVE_LAND_FOR_SALE:
      return { ...state, list: state.list.filter(val => val !== landForSale) };
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
