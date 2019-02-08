export const SET_ACCOUNT = "SET_ACCOUNT";
export const CLAIM_SELL_ORDER = "CLAIM_SELL_ORDER";

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function claimSellOrder(sellOrder) {
  return { type: CLAIM_SELL_ORDER, sellOrder };
}
