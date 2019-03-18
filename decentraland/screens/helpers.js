import ContractsAddresses from "@constants/ContractsAddresses";
const { MANA_ADDRESS } = ContractsAddresses;

import { Action } from "tasit-sdk";
const { ERC20 } = Action;
const { Mana } = ERC20;

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

export const approveManaSpending = async (fromAccount, toAddress, value) => {
  // Note: Config doesn't work if contract is instantiated outside of a function or a class
  const mana = new Mana(MANA_ADDRESS, fromAccount);
  const action = mana.approve(toAddress, `${value}`);
  await action.waitForNonceToUpdate();
};

export const addressesAreEqual = (address1, address2) => {
  return address1.toUpperCase() === address2.toUpperCase();
};

export const prepareEstateForSale = async (estateContract, estateForSale) => {
  const { id, assetId, seller, priceInWei, expiresAt } = estateForSale;

  const estateId = Number(assetId);

  // Note: Conversion to USD will be implemented on v0.2.0
  const manaPerUsd = 30;
  const priceMana = Number(`${priceInWei}`) / 1e18;
  const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
  const name = await estateContract.getMetadata(assetId);
  const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

  return {
    id,
    priceMana,
    priceUSD,
    seller,
    expiresAt,
    type: ESTATE,
    asset: {
      id: estateId,
      name,
      img: imgUrl,
    },
  };
};

export const prepareParcelForSale = async (landContract, parcelForSale) => {
  const {
    id,
    assetId: parcelId,
    seller,
    priceInWei,
    expiresAt,
  } = parcelForSale;

  // Note: Conversion to USD will be implemented on v0.2.0
  const manaPerUsd = 30;
  const priceMana = Number(`${priceInWei}`) / 1e18;
  const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
  const namePromise = landContract.tokenMetadata(parcelId);
  const coordsPromise = landContract.decodeTokenId(parcelId);
  const [name, coords] = await Promise.all([namePromise, coordsPromise]);
  const [x, y] = coords;
  const imgUrl = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;

  return {
    id,
    priceMana,
    priceUSD,
    seller,
    expiresAt,
    type: PARCEL,
    asset: {
      id: parcelId,
      name,
      img: imgUrl,
    },
  };
};

// TODO: Use properly functions/components
export const showFatalError = msg => console.error(msg);
export const showError = msg => console.warn(`ERROR: ${msg}`);
export const showWarn = msg => console.warn(`WARN: ${msg}`);
export const showInfo = msg => console.warn(`INFO: ${msg}`);
export const showSuccess = msg => console.warn(`SUCCESS: ${msg}`);

export default {
  prepareParcelForSale,
  prepareEstateForSale,
  approveManaSpending,
  addressesAreEqual,
  showFatalError,
  showError,
  showWarn,
  showInfo,
  showSuccess,
};
