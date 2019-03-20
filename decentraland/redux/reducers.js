import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  SET_LAND_FOR_SALE_LIST,
  REMOVE_LAND_FOR_SALE,
  ADD_LAND_FOR_SALE_TO_LIST,
  SET_ACCOUNT_FUNDED,
  SET_MARKETPLACE_APPROVED,
} from "./actions";

function accountInfo(
  state = { account: null, funded: false, marketplaceApproved: false },
  action
) {
  const {
    type,
    account,
    isFunded: funded,
    isApproved: marketplaceApproved,
  } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_ACCOUNT_FUNDED:
      return { ...state, funded };
    case SET_MARKETPLACE_APPROVED:
      return { ...state, marketplaceApproved };
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

function landForSaleList(state = [], action) {
  const { type, landForSaleList, landForSale } = action;
  switch (type) {
    case SET_LAND_FOR_SALE_LIST:
      return landForSaleList;
    case ADD_LAND_FOR_SALE_TO_LIST:
      return [...state, landForSale];
    case REMOVE_LAND_FOR_SALE:
      return state.filter(val => val !== landForSale);
    default:
      return state;
  }
}

const decentralandApp = combineReducers({
  accountInfo,
  selectedLandToBuy,
  landForSaleList,
});

export default decentralandApp;
