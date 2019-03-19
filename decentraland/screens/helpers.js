import { Action, ContractBasedAccount, TasitContracts } from "tasit-sdk";

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
  const { manaContract, marketplaceContract } = contracts;
  const toAddress = marketplaceContract.getAddress();
  manaContract.setWallet(fromAccount);
  const action = manaContract.approve(toAddress, `${value}`);
  await action.waitForNonceToUpdate();
};

export const addressesAreEqual = (address1, address2) => {
  return address1.toUpperCase() === address2.toUpperCase();
};

export const fundAccount = async accountAddress => {
  const SMALL_AMOUNT = `${5e16}`; // 0.1
  const TEN = `${10e18}`;

  const gnosisSafeOwnerPrivKey =
    "0x633a290bcdabb9075c5a4b3885c69ce64b4b0e6079eb929abb2ac9427c49733b";
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

// TODO: Use functions/components properly
export const showFatalError = msg => console.error(msg);
export const showError = msg => console.warn(`ERROR: ${msg}`);
export const showWarn = msg => console.warn(`WARN: ${msg}`);
export const showInfo = msg => console.warn(`INFO: ${msg}`);
export const showSuccess = msg => console.warn(`SUCCESS: ${msg}`);

export default {
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
