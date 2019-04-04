// Note: Functions that will deal with fetch and prepare data from Decentraland contracts
import { addressesAreEqual, getContracts } from ".";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";
import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

// Note: Returns a list of Promises
export const getAllAssetsForSale = async () => {
  const decentralandUtils = new DecentralandUtils();
  const { getAllAssetsForSale: getAllOpenSellOrders } = decentralandUtils;

  const openSellOrders = await getAllOpenSellOrders();

  let contracts = getContracts();
  const { estateContract } = contracts;

  const estatesForSale = [];
  for (let order of openSellOrders) {
    const { nftAddress } = order;
    const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());
    if (isEstate) estatesForSale.push(order);
  }

  const assetsForSale = [];
  // Note: Getting only the first 10 assets for now
  // See more: https://github.com/tasitlabs/tasit/issues/155
  const listSize = 10;
  for (let order of estatesForSale.slice(0, listSize)) {
    let assetForSalePromise = _toAssetForSale(order);
    assetsForSale.push(assetForSalePromise);
  }

  return assetsForSale;
};

const _toAssetForSale = async sellOrder => {
  let contracts = getContracts();
  const { estateContract, landContract } = contracts;
  const type = _getTypeFromSellOrder(sellOrder, landContract, estateContract);
  const { id, assetId, seller, priceInWei, expiresAt } = sellOrder;

  // Note: Conversion to USD will be implemented on v0.2.0
  const manaPerUsd = 30;
  // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
  // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
  const priceManaInWei = `${priceInWei}`;
  const strPriceManaLength = priceManaInWei.length - 18;
  const strRoundedPriceMana = priceManaInWei.substring(0, strPriceManaLength);
  const priceMana = strRoundedPriceMana;
  const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
  let asset;

  if (type === ESTATE)
    asset = await _generateEstateFromId(estateContract, assetId);
  else if (type === PARCEL)
    asset = await _generateParcelFromId(landContract, assetId);

  const assetForSale = {
    id,
    priceManaInWei,
    priceMana,
    priceUSD,
    seller,
    expiresAt,
    asset,
  };

  return assetForSale;
};

const _generateEstateFromId = async (estateContract, estateId) => {
  const id = `${estateId}`;
  const type = ESTATE;
  const name = await estateContract.getMetadata(id);
  const img = `https://api.decentraland.org/v1/estates/${id}/map.png`;

  const estate = { type, id, name, img };
  return estate;
};

const _generateParcelFromId = async (landContract, parcelId) => {
  const id = `${parcelId}`;
  const type = PARCEL;
  const namePromise = landContract.tokenMetadata(id);
  const coordsPromise = landContract.decodeTokenId(id);
  const [name, coords] = await Promise.all([namePromise, coordsPromise]);
  const [x, y] = coords;
  const img = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;

  const parcel = { type, id, name, img };
  return parcel;
};

const _getTypeFromSellOrder = (sellOrder, landContract, estateContract) => {
  const { nftAddress } = sellOrder;
  const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
  const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());

  if (!isParcel && !isEstate)
    throw new Error(
      `The sell order should have a parcel of land or an estate as NFT.`
    );

  if (isEstate) return ESTATE;
  return PARCEL;
};

export default {
  getAllAssetsForSale,
};
