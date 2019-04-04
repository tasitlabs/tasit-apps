// Note: Functions that will deal with fetch and prepare data from Decentraland contracts
import { addressesAreEqual, getContracts } from ".";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";
import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

export const loadAssetsForSale = async () => {
  const {
    appendLandForSaleToList,
    setLoadingAssetsForSaleInProgress,
  } = this.props;

  const decentralandUtils = new DecentralandUtils();
  const { getAllAssetsForSale } = decentralandUtils;

  const openSellOrdersEvents = await getAllAssetsForSale();

  let contracts = getContracts();
  const { estateContract } = contracts;

  const estatesForSale = [];
  for (let order of openSellOrdersEvents) {
    const { nftAddress } = order;
    const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());
    if (isEstate) estatesForSale.push(order);
  }

  // Note: Getting only the first 10 assets for now
  // See more: https://github.com/tasitlabs/tasit/issues/155
  const listSize = 10;
  for (let order of estatesForSale.slice(0, listSize)) {
    let assetForSale = await _prepareAssetForSale(order);
    appendLandForSaleToList(assetForSale);
  }

  setLoadingAssetsForSaleInProgress(false);
};

const _prepareAssetForSale = async assetForSale => {
  const { nftAddress } = assetForSale;
  let contracts = getContracts();
  const { estateContract, landContract } = contracts;

  const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
  const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());

  if (isEstate) {
    return await _prepareEstateForSale(estateContract, assetForSale);
  } else if (isParcel) {
    return await _prepareParcelForSale(landContract, assetForSale);
  } else {
    throw new Error(`The asset should be a parcel of land or an estate.`);
  }
};

const _prepareEstateForSale = async (estateContract, estateForSale) => {
  const { id, assetId, seller, priceInWei, expiresAt } = estateForSale;

  const estateId = `${assetId}`;

  // Note: Conversion to USD will be implemented on v0.2.0
  const manaPerUsd = 30;
  // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
  // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
  const priceManaInWei = `${priceInWei}`;
  const intPriceManaLength = priceManaInWei.length - 18;
  const intPriceMana = priceManaInWei.substring(0, intPriceManaLength);
  const priceMana = intPriceMana;
  const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
  const name = await estateContract.getMetadata(assetId);
  const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

  return {
    id,
    priceManaInWei,
    priceMana,
    priceUSD,
    seller,
    expiresAt,
    asset: {
      type: ESTATE,
      id: estateId,
      name,
      img: imgUrl,
    },
  };
};

const _prepareParcelForSale = async (landContract, parcelForSale) => {
  const { id, assetId, seller, priceInWei, expiresAt } = parcelForSale;

  const parcelId = `${assetId}`;

  // Note: Conversion to USD will be implemented on v0.2.0
  const manaPerUsd = 30;
  // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
  // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
  const priceManaInWei = `${priceInWei}`;
  const intPriceManaLength = priceManaInWei.length - 18;
  const intPriceMana = priceManaInWei.substring(0, intPriceManaLength);
  const priceMana = intPriceMana;
  const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
  const namePromise = landContract.tokenMetadata(parcelId);
  const coordsPromise = landContract.decodeTokenId(parcelId);
  const [name, coords] = await Promise.all([namePromise, coordsPromise]);
  const [x, y] = coords;
  const imgUrl = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;

  return {
    id,
    priceManaInWei,
    priceMana,
    priceUSD,
    seller,
    expiresAt,
    asset: {
      type: PARCEL,
      id: parcelId,
      name,
      img: imgUrl,
    },
  };
};

export default {
  loadAssetsForSale,
};
