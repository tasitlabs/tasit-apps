/*
 * action types
 */

export const SET_ACCOUNT = "SET_ACCOUNT";
export const CLAIM_ASSET = "CLAIM_ASSET";

/*
 * action creators
 */

export function setAccount(account) {
  return { type: SET_ACCOUNT, account };
}

export function claimAsset(sellOrderId) {
  return { type: CLAIM_ASSET, sellOrderId };
}
