import { combineReducers } from "redux";
import { SET_ACCOUNT, CLAIM_ASSET } from "./actions";

function account(state = null, action) {
  const { type, account } = action;
  switch (type) {
    case SET_ACCOUNT:
      return account;
    default:
      return state;
  }
}

function claimedAsset(state = null, action) {
  const { type, sellOrderId } = action;
  switch (type) {
    case CLAIM_ASSET:
      return sellOrderId;
    default:
      return state;
  }
}

const demoApp = combineReducers({
  account,
  claimedAsset,
});

export default demoApp;
