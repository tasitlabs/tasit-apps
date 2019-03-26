import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  SET_LAND_FOR_SALE_LIST,
  REMOVE_LAND_FOR_SALE,
  ADD_LAND_FOR_SALE_TO_LIST,
  SET_SETUP_IN_PROGRESS,
  SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS,
} from "./actions";

function accountInfo(
  state = { account: null, setupInProgress: false },
  action
) {
  const { type, account, inProgress: setupInProgress } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_SETUP_IN_PROGRESS:
      return { ...state, setupInProgress };
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

const decentralandApp = combineReducers({
  accountInfo,
  selectedLandToBuy,
  assetsForSale,
});

export default decentralandApp;
