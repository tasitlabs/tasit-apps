import { applyMiddleware } from "redux";
import {
  SET_ACCOUNT,
  SET_ACCOUNT_CREATION_STATUS,
  UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS,
  ADD_TO_MY_ASSETS_LIST,
  REMOVE_MY_ASSET_FROM_LIST,
  SET_MY_ASSETS_LIST,
} from "./actions";
import { storeEphemeralAccount, storeMyAssets } from "@helpers/storage";

const storer = store => next => async action => {
  const { type } = action;
  const result = next(action);
  const nextState = store.getState();
  const { accountInfo, myAssets } = nextState;
  const { account } = accountInfo;
  const { list: myAssetsList } = myAssets;

  switch (type) {
    case SET_ACCOUNT: {
      await storeEphemeralAccount(account);
      break;
    }
    case SET_ACCOUNT_CREATION_STATUS: {
      break;
    }
    case UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS: {
      break;
    }
    case ADD_TO_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case REMOVE_MY_ASSET_FROM_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case SET_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
  }

  return result;
};

export default applyMiddleware(storer);
