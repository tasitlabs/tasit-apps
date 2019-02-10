export const SET_ACCOUNT = "SET_ACCOUNT";
export const CLAIM_SELL_ORDER = "CLAIM_SELL_ORDER";
export const SET_SELL_ORDERS = "SET_SELL_ORDERS";
export const REMOVE_SELL_ORDER = "REMOVE_SELL_ORDER";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function claimSellOrder(sellOrder) {
  return { type: CLAIM_SELL_ORDER, sellOrder };
}

export function setSellOrders(sellOrders) {
  return { type: SET_SELL_ORDERS, sellOrders };
}

export function removeSellOrder(sellOrder) {
  return { type: REMOVE_SELL_ORDER, sellOrder };
}
