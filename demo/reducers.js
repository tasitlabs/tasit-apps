import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  SET_LANDS_FOR_SALE,
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

function landsForSale(state = [], action) {
  const { type, landsForSale, landForSale } = action;
  switch (type) {
    case SET_LANDS_FOR_SALE:
      return landsForSale;
    case REMOVE_LAND_FOR_SALE:
      return state.filter(val => val !== landForSale);
    default:
      return state;
  }
}

const demoApp = combineReducers({
  account,
  selectedLandToBuy,
  landsForSale,
});

export default demoApp;
