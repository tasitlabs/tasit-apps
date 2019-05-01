// Note: Functions that will deal with fetch and prepare data from Decentraland contracts
import { addressesAreEqual } from "@helpers";

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

export const generateAssetFromId = async (
  estateContract,
  landContract,
  assetId,
  nftAddress
) => {
  const type = _getType(nftAddress, landContract, estateContract);
  let asset;

  if (type === ESTATE) {
    asset = await _generateEstateFromId(estateContract, assetId);
  } else if (type === PARCEL) {
    asset = await _generateParcelFromId(landContract, assetId);
  }

  return asset;
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

const _getType = (nftAddress, landContract, estateContract) => {
  const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
  const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());

  if (!isParcel && !isEstate)
    throw new Error(
      `The sell order should have a parcel of land or an estate as the NFT.`
    );

  const type = isEstate ? ESTATE : PARCEL;
  return type;
};

export default {
  generateAssetFromId,
};
