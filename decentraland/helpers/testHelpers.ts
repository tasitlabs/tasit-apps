import { ESTATE, PARCEL } from "../constants/AssetTypes";
import { DONE, PENDING, MISSING } from "../constants/ActionStatus";
import { SUCCESSFUL } from "../constants/UserActionStatus";

export const parcel = {
  type: PARCEL,
  id: "0123456789",
  name: "Sample Parcel",
  img: "https://api.decentraland.org/v1/parcels/0/0/map.png",
};

export const estate = {
  type: ESTATE,
  id: "123",
  name: "Sample Estate",
  img: "https://api.decentraland.org/v1/estates/1/map.png",
};

export const estateWithoutName = {
  type: ESTATE,
  id: "321",
  name: "",
  img: "https://api.decentraland.org/v1/estates/1/map.png",
};

export const estateForSale = {
  id: "1",
  priceMana: "0",
  priceUSD: 0,
  asset: estate,
};

export const parcelForSale = {
  id: "2",
  priceMana: "0",
  priceUSD: 0,
  asset: parcel,
};

function getIdAsync(): Promise<string> {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve("0x1234567890123456789012345678901234567890")
    );
  });
}

export const anAction = {
  getId: async (): Promise<string> => {
    return await getIdAsync();
  },
};

export const accountCreationSteps = [
  {
    name: "Account created",
    status: DONE,
  },
  {
    name: "ETH",
    status: PENDING,
  },
  {
    name: "MANA",
    status: MISSING,
  },
];

export const parcelUserAction = {
  ["0x1234567890123456789012345678901234567890"]: {
    assetId: "0123456789",
    status: SUCCESSFUL,
  },
};

export const estateUserAction = {
  ["0x987654321098765432109876543210987654321"]: {
    assetId: "123",
    status: SUCCESSFUL,
  },
};

export const userActions = { ...parcelUserAction, ...estateUserAction };

export default {
  estateForSale,
  parcelForSale,
  parcel,
  estate,
  anAction,
  estateWithoutName,
  parcelUserAction,
  estateUserAction,
  userActions,
};
