import { combineReducers } from "redux";
import { SET_ACCOUNT, CLAIM_SELL_ORDER } from "./actions";

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

const demoApp = combineReducers({
  account,
  claimedSellOrder,
});

export default demoApp;
