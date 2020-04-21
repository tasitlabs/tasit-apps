import React, { useState, useEffect } from "react";

import { Text } from "react-native";

// TODO: Remove direct ethers dep from this app
import { ethers } from "ethers";

import { ActionObject } from "../../../types/ActionObject";
import LinkToBlockchain from "../../presentational/LinkToBlockchain";

import {
  fundAccountWithEthers,
  fundAccountWithEthersVanilla,
} from "../../../helpers";

import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import LargeText from "../../presentational/LargeText";

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});

// import {
//   getAccountsFrom, getThresholdFrom, getNamesFrom, getSafeNameFrom, getOwnersFrom,
// } from './utils/safeDataExtractor'

// TODO: Move direct axios usage over to the Tasit SDK
import axios from "axios";

import * as Random from "expo-random";

// interface EthereumUpgradeSecurityProps {}

import CenteredAlert from "../../presentational/CenteredAlert";

// TODO: Decide whether to use redux rather than useState here, and also
// whether either way it's the job of the screen that contains this component

const api = axios.create({
  baseURL: "https://safe-relay.staging.gnosisdev.com/api",
});

const API_VERSION = "v2";

const fundWithEthers = async (accountAddress: string): Promise<void> => {
  // TODO: Pass account, accountInfo from the
  // EthereumUpgradeSecurityScreen which is already wired up with this
  // state from redux
  const action: ActionObject = fundAccountWithEthers(accountAddress);

  const errorListener = (error: any) => {
    action.off("error");
    console.log({ error });
  };

  action.on("error", errorListener);
  // TODO: Type this action object
  await action.send();
  console.info("Sent the ETH transfer action to fund the contract");
  const actionId = action.getId();
  // console.info({ actionId });
  // TODO: Here we would dispatch an action to redux
  // to record this
  await action.waitForOneConfirmation();
  // TODO: Change me to pub/sub style
  console.log(`Contract funded with ETH`);
  // TODO: Here we would dispatch an action to redux
  // to record this
};

// TODO: Switch me back to using the SDK
// Using this to test whether Gnosis Safe relay service
// doesn't respond to internal transactions
const fundWithEthersVanilla = async (accountAddress: string): Promise<void> => {
  // TODO: Pass account, accountInfo from the
  // EthereumUpgradeSecurityScreen which is already wired up with this
  // state from redux
  const tx: any = await fundAccountWithEthersVanilla(accountAddress);

  console.log(`Contract funded with ETH`);
};

// Using relay service:
async function postSafe(owners: string[], threshold: number): Promise<string> {
  try {
    // API parameters:
    // saltNonce*	integer
    //   title: Salt nonce
    //   maximum: 1.157920892373162e+77
    //   minimum: 0
    // owners*	[
    //   minItems: 1
    //   string]
    // threshold*	integer
    //   title: Threshold
    //   minimum: 1
    // paymentToken	string
    //   title: Payment token
    //   x-nullable: true

    // TODO: Decide on correct number of bytes so it's in the right
    // range when converted to an integer
    const randomBytes = await Random.getRandomBytesAsync(5);
    // console.log({ randomBytes });
    const randomInt =
      randomBytes[4] * Math.pow(256, 0) +
      randomBytes[3] * Math.pow(256, 1) +
      randomBytes[2] * Math.pow(256, 2) +
      randomBytes[1] * Math.pow(256, 3) +
      randomBytes[0] * Math.pow(256, 4);
    console.log({ randomInt });
    // const saltNonce = randomBytes. // convert to integer
    const response = await api.post(`/${API_VERSION}/safes/`, {
      threshold: threshold,
      owners: owners,
      saltNonce: randomInt, // TODO: Use integer version of random bytes
    });
    const { data, status } = response;
    console.log({ data });
    console.log({ status });

    const { safe: safeAddress } = data;
    return safeAddress;

    //   { data:
    //     { safe: '0x451b472FB14b3cDDdA496c15E7407291F73321Cb',
    //       masterCopy: '0xb6029EA3B2c51D09a50B53CA8012FeEB05bDa35A',
    //       proxyFactory: '0x12302fE9c02ff50939BaAaaf415fc226C078613C',
    //       paymentToken: '0x0000000000000000000000000000000000000000',
    //       payment: '804223680257764',
    //       paymentReceiver: '0x0000000000000000000000000000000000000000',
    //       setupData:
    //        '0xa97ab18a00000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002db6feac81ee4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000009b1c8920659cd7db3dee1ae55ec1dc7d0e500c9600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    //       gasEstimated: '257764',
    //       gasPriceEstimated: '3120000001' } }
    //  { status: 201 }
  } catch (error) {
    console.log("Error");
    // console.error({ error });
    console.log(error.response.data);
  }
}

// Using relay service:
async function putFunded(address: string): Promise<void> {
  try {
    const response = await api.put(`/${API_VERSION}/safes/${address}/funded`);
    const { data, status } = response;
    console.log("Put funded");
    console.log({ data });
    console.log({ status });

    return;
  } catch (error) {
    console.log("Error");
    // console.error({ error });
    console.log(error.response.data);
  }
}

// // Doing contract deployments directly:
// // TODO: Change this to get an instantiated ethers version
// const createGnosisSafeContract = (web3: any) => {
//   const gnosisSafe = contract(GnosisSafeSol)
//   gnosisSafe.setProvider(web3.currentProvider)

//   return gnosisSafe
// }

// // TODO: Change this to get an instantiated ethers version
// const createProxyFactoryContract = (web3: any) => {
//   const proxyFactory = contract(ProxyFactorySol)
//   proxyFactory.setProvider(web3.currentProvider)

//   return proxyFactory
// }

// const instantiateMasterCopies = async () => {
//   // TODO: Do the instantiation with ethers rather than web3
//   const web3 = getWeb3()

//   // Create ProxyFactory Master Copy
//   const ProxyFactory = createProxyFactoryContract(web3)
//   proxyFactoryMaster = await ProxyFactory.deployed()

//   // Initialize Safe master copy
//   const GnosisSafe = createGnosisSafeContract(web3)
//   safeMaster = await GnosisSafe.deployed()
// }

// // TODO: Potentially move this function into the Tasit SDK

// export const createSafe = async (values: Object, userAccount: string, addSafe: AddSafe): Promise<OpenState> => {
//   const numConfirmations = getThresholdFrom(values)
//   const name = getSafeNameFrom(values)
//   const ownersNames = getNamesFrom(values)
//   const ownerAddresses = getAccountsFrom(values)

//   await instantiateMasterCopies()

//   const safe = await deploySafeContract(ownerAddresses, numConfirmations, userAccount)
//   await checkReceiptStatus(safe.tx)

//   const safeAddress = safe.logs[0].args.proxy
//   const safeContract = await getGnosisSafeInstanceAt(safeAddress)
//   const safeProps = await buildSafe(safeAddress, name)
//   const owners = getOwnersFrom(ownersNames, ownerAddresses)
//   safeProps.owners = owners

//   addSafe(safeProps)

//   // returning info for testing purposes, in app is fully async
//   return { safeAddress: safeContract.address, safeTx: safe }
// }

interface EthereumUpgradeSecurityProps {
  account: any;
}

const EthereumUpgradeSecurity: React.FunctionComponent<EthereumUpgradeSecurityProps> = ({
  account,
}) => {
  const [isDeployed, setIsDeployed] = useState(null);
  const [safeAddress, setSafeAddress] = useState(null);

  const { signingKey } = account;
  const { address: ephemeralAccountAddress } = signingKey;

  console.log({ ephemeralAccountAddress });

  useEffect(() => {
    const onCallSafeContractSubmit = async () => {
      try {
        // TODO: Get userAccount dynamically from redux
        // Direct contract deployment version:
        // createSafe(values, userAccount, addSafe)

        // const userAccount = "0x9b1c8920659cd7db3dee1ae55ec1dc7d0e500c96";
        // const checksummedUserAccount = ethers.utils.getAddress(userAccount);

        //
        // Enable and disable this section to avoid hitting
        // Gnosis Safe relay service API too much
        // ---
        if (!isDeployed) {
          const checksummedUserAccount = ephemeralAccountAddress;
          const safeAddress = await postSafe([checksummedUserAccount], 1);
          console.log({ safeAddress });
          // TODO: Eventually we won't want to send this from a
          // hardcoded funding source
          console.log("About to fund with ethers");
          // await fundWithEthers(safeAddress);
          await fundWithEthersVanilla(safeAddress);
          console.log("Done funding contract with ethers");

          // Optional: Hit the /put address to signal it has been funded
          await putFunded(safeAddress);

          // TODO: Confirm contract successfully deployed

          setSafeAddress(safeAddress);
          setIsDeployed(true);
        } else {
          console.log("Already deployed");
        }

        // ---
        // End section to enable and disable
        //
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error while creating the Safe: " + error);
      }
    };

    console.log("EthereumUpgradeSecurity useEffect");

    // TODO: Hit the API to deploy a new contract

    onCallSafeContractSubmit();

    return function cleanup() {
      // TODO: Cancel any unwanted remnants of having already made this request
    };
  }, [account]); // Only re-run the effect if account changes

  // TODO: Show loading by setting a boolean or enum value when deployment starts
  // if (...) {
  //   return <CenteredAlert text="Loading..." />;
  // }

  if (!account) {
    return <CenteredAlert text="No account yet" />;
  }

  if (ephemeralAccountAddress && isDeployed && safeAddress) {
    return (
      <View style={styles.emptyContainer}>
        <LargeText>{`Deployed Safe contract at`}</LargeText>
        <LargeText>{`${safeAddress}`}</LargeText>
        <LargeText>{`for address`}</LargeText>
        <LargeText>{`${ephemeralAccountAddress}`}</LargeText>
        <LinkToBlockchain type="address" address={safeAddress} />
      </View>
    );
  }

  if (ephemeralAccountAddress && isDeployed) {
    return (
      <CenteredAlert
        text={`Deployed contract for address ${ephemeralAccountAddress}`}
      />
    );
  }

  if (ephemeralAccountAddress) {
    return (
      <CenteredAlert
        text={`Not yet deployed for address ${ephemeralAccountAddress}`}
      />
    );
  }
};

export default EthereumUpgradeSecurity;
