import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

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

export const estateForSale = {
  id: "1",
  priceMana: 0,
  priceUSD: 0,
  asset: estate,
};

export const parcelForSale = {
  id: "2",
  priceMana: 0,
  priceUSD: 0,
  asset: parcel,
};

export const anAction = {
  getTransaction: () => ({
    hash: "0x1234567890123456789012345678901234567890",
  }),
};

export default {
  estateForSale,
  parcelForSale,
  parcel,
  estate,
  anAction,
};
