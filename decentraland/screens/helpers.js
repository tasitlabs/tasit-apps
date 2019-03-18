import TasitContracts from "tasit-contracts";
import { Action, ContractBasedAccount } from "tasit-sdk";

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

import ProviderFactory from "tasit-action/dist/ProviderFactory";
import { createFromPrivateKey } from "tasit-account/dist/testHelpers/helpers";

export const getContracts = () => {
  let contracts;

  const provider = ProviderFactory.getProvider();

  const { _network: network } = provider;
  const networkName = !network ? "local" : network.name;

  const {
    MANAToken,
    LANDProxy,
    EstateRegistry,
    Marketplace,
    GnosisSafe: GnosisSafeInfo,
  } = TasitContracts[networkName];
  const { address: MANA_ADDRESS } = MANAToken;
  const { address: LAND_ADDRESS } = LANDProxy;
  const { address: ESTATE_ADDRESS } = EstateRegistry;
  const { address: MARKETPLACE_ADDRESS } = Marketplace;
  const { address: GNOSIS_SAFE_ADDRESS } = GnosisSafeInfo;

  const { ERC20, ERC721, Marketplace: MarketplaceContracts } = Action;
  const { Mana } = ERC20;
  const { Estate, Land } = ERC721;
  const { Decentraland: DecentralandMarketplace } = MarketplaceContracts;
  const { GnosisSafe } = ContractBasedAccount;

  const estateContract = new Estate(ESTATE_ADDRESS);
  const landContract = new Land(LAND_ADDRESS);
  const marketplaceContract = new DecentralandMarketplace(MARKETPLACE_ADDRESS);
  const manaContract = new Mana(MANA_ADDRESS);
  const gnosisSafeContract = new GnosisSafe(GNOSIS_SAFE_ADDRESS);

  contracts = {
    estateContract,
    landContract,
    marketplaceContract,
    manaContract,
    gnosisSafeContract,
  };

  return contracts;
};

export const approveManaSpending = async fromAccount => {
  const value = 1e18; // one
  const contracts = getContracts();
  const { manaContract, marketplaceContract: toAddress } = contracts;
  manaContract.setWallet(fromAccount);
  const action = manaContract.approve(toAddress, `${value}`);
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

  const contracts = getContracts();
  const { manaContract, gnosisSafeContract } = contracts;
  gnosisSafeContract.setWallet(gnosisSafeOwner);
  gnosisSafeContract.setSigners([gnosisSafeOwner]);

  const transferEthersAction = gnosisSafeContract.transferEther(
    accountAddress,
    SMALL_AMOUNT
  );
  await transferEthersAction.waitForNonceToUpdate();

  const transferManaAction = gnosisSafeContract.transferERC20(
    manaContract.getAddress(),
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
  getContracts,
};
