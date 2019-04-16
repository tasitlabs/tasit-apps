import { applyMiddleware } from "redux";
import {
  SET_ACCOUNT,
  SET_ACCOUNT_CREATION_STATUS,
  UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS,
  ADD_TO_MY_ASSETS_LIST,
  REMOVE_MY_ASSET_FROM_LIST,
  SET_MY_ASSETS_LIST,
} from "./actions";
import { storeEphemeralAccount } from "@helpers/storage";

const storer = store => next => async action => {
  const { type } = action;
  const result = next(action);
  //const nextState = store.getState();

  switch (type) {
    case SET_ACCOUNT: {
      const { account } = action;
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
      break;
    }
    case REMOVE_MY_ASSET_FROM_LIST: {
      break;
    }
    case SET_MY_ASSETS_LIST: {
      break;
    }
  }

  return result;
};

export default applyMiddleware(storer);
