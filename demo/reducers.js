import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  SET_LAND_FOR_SALE_LIST,
  REMOVE_LAND_FOR_SALE,
} from "./actions";

function account(state = null, action) {
  const { type, account } = action;
  switch (type) {
    case SET_ACCOUNT:
      return account;
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
    case REMOVE_LAND_FOR_SALE:
      return state.filter(val => val !== landForSale);
    default:
      return state;
  }
}

const demoApp = combineReducers({
  account,
  selectedLandToBuy,
  landForSaleList,
});

export default demoApp;
