import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  CLAIM_SELL_ORDER,
  SET_SELL_ORDERS,
  REMOVE_SELL_ORDER,
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

function claimedSellOrder(state = null, action) {
  const { type, sellOrder } = action;
  switch (type) {
    case CLAIM_SELL_ORDER:
      return sellOrder;
    default:
      return state;
  }
}

function sellOrders(state = [], action) {
  const { type, sellOrders, sellOrder } = action;
  switch (type) {
    case SET_SELL_ORDERS:
      return sellOrders;
    case REMOVE_SELL_ORDER:
      return state.filter(val => val !== sellOrder);
    default:
      return state;
  }
}

const demoApp = combineReducers({
  account,
  claimedSellOrder,
  sellOrders,
});

export default demoApp;
