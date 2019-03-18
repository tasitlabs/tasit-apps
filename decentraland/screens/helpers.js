import TasitContracts from "tasit-contracts";
const { MANAToken, GnosisSafe: GnosisSafeInfo } = TasitContracts["local"];
const { address: MANA_ADDRESS } = MANAToken;
const { address: GNOSIS_SAFE_ADDRESS } = GnosisSafeInfo;

import { Action, ContractBasedAccount } from "tasit-sdk";
const { ERC20 } = Action;
const { Mana } = ERC20;
const { GnosisSafe } = ContractBasedAccount;

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export const approveManaSpending = async (fromAccount, toAddress) => {
  const value = 1e18; // one
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

export const fundAccount = async accountAddress => {
  const SMALL_AMOUNT = `${1e17}`; // 0.1
  const TEN = `${10e18}`;

  const gnosisSafeOwnerPrivKey =
    "0xee0c6b1a7adea9f87b1a422eb06b245fc714b8eca4c8c0578d6cf946beba86f1";
  const gnosisSafeOwner = createFromPrivateKey(gnosisSafeOwnerPrivKey);

  const gnosisSafe = new GnosisSafe(GNOSIS_SAFE_ADDRESS, gnosisSafeOwner);
  gnosisSafe.setSigners([gnosisSafeOwner]);

  const transferEthersAction = gnosisSafe.transferEther(
    accountAddress,
    SMALL_AMOUNT
  );
  await transferEthersAction.waitForNonceToUpdate();

  const transferManaAction = gnosisSafe.transferERC20(
    MANA_ADDRESS,
    accountAddress,
    TEN
  );
  await transferManaAction.waitForNonceToUpdate();
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
  fundAccount,
};
