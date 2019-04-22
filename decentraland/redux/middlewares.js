import { applyMiddleware } from "redux";
import {
  SET_ACCOUNT,
  SET_ACCOUNT_CREATION_STATUS,
  UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS,
  SET_ACCOUNT_CREATION_ACTIONS,
  PREPEND_TO_MY_ASSETS_LIST,
  APPEND_TO_MY_ASSETS_LIST,
  REMOVE_FROM_MY_ASSETS_LIST,
  SET_MY_ASSETS_LIST,
  SET_ACTION_ID_FOR_MY_ASSET,
  UPDATE_MY_ASSET_STATUS,
} from "./actions";
import {
  storeAccount,
  storeAccountCreationStatus,
  storeAccountCreationActions,
  storeMyAssets,
} from "@helpers/storage";

const storer = store => next => async action => {
  const { type } = action;
  const result = next(action);
  const nextState = store.getState();
  const { accountInfo, myAssets } = nextState;
  const { account, creationStatus, creationActions } = accountInfo;
  const { list: myAssetsList } = myAssets;

  switch (type) {
    case SET_ACCOUNT: {
      await storeAccount(account);
      break;
    }
    case SET_ACCOUNT_CREATION_STATUS: {
      await storeAccountCreationStatus(creationStatus);
      break;
    }
    case UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS: {
      await storeAccountCreationActions(creationActions);
      break;
    }
    case SET_ACCOUNT_CREATION_ACTIONS: {
      await storeAccountCreationActions(creationActions);
      break;
    }
    case PREPEND_TO_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case APPEND_TO_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case REMOVE_FROM_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case SET_MY_ASSETS_LIST: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case SET_ACTION_ID_FOR_MY_ASSET: {
      await storeMyAssets(myAssetsList);
      break;
    }
    case UPDATE_MY_ASSET_STATUS: {
      await storeMyAssets(myAssetsList);
      break;
    }
  }

  return result;
};

export default applyMiddleware(storer);
