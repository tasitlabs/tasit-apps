import axios from "axios";

import { ethers } from "ethers";

import { ActionObject } from "../types/ActionObject";

import { fundAccountWithEthers } from "../helpers";

// import crypto from "crypto";
// const crypto = require('crypto');

// Doesn't make sense to use an expo / React Native module in this
// node script env
// import * as Random from "expo-random";

const api = axios.create({
  baseURL: "https://safe-relay.staging.gnosisdev.com/api",
});

const API_VERSION = "v2";

// Note: Math.random() does not provide cryptographically secure random numbers
// Just using it for simplicity's sake in this script
function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const fundWithEthers = async (accountAddress: string): Promise<void> => {
  const action: ActionObject = fundAccountWithEthers(accountAddress);

  // TODO: Type this action object
  await action.send();
  console.info("Sent the ETH transfer action to fund the contract");
  const actionId = action.getId();
  console.info({ actionId });
  // TODO: In the app, here we would dispatch an action to redux
  // to record this
  await action.waitForOneConfirmation();
  // TODO: Change me to pub/sub style
  console.log(`Contract funded with ETH`);
  // TODO: In the app, here we would dispatch an action to redux
  // to record this
};

// Using relay service:
async function postSafe(owners: string[], threshold: number) {
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
    // const randomBytes = await Random.getRandomBytesAsync(16);
    // const randomBytes = crypto.randomBytes(16);
    // console.log({ randomBytes });
    // const saltNonce = randomBytes. // convert to integer
    // Note: Math.random() does not provide cryptographically secure random numbers
    // Just using it for simplicity's sake in this script
    const randomInt = getRandomInt(100000000);
    console.log({ randomInt });

    const response = await api.post(`/${API_VERSION}/safes/`, {
      threshold: threshold,
      owners: owners,
      saltNonce: randomInt, // TODO: Use integer version of random bytes,
    });

    const { data, status } = response;
    console.log({ data });
    console.log({ status });

    const { safe: safeAddress } = data;
    console.log("About to fund with ethers");
    await fundWithEthers(safeAddress);
    console.log("Done funding contract with ethers");

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
    // TODO: Send ETH to contract address
    // Optional: Hit the /put address to signal it has been funded
    // TODO: Confirm contract successfully deployed
  } catch (error) {
    console.log("Error");
    const { response } = error;
    if (!!response) {
      const { data } = response;
      if (!!data) {
        console.log(data);
      }
    } else {
      console.error({ error });
    }
  }
}

const userAccount = "0x9b1c8920659cd7db3dee1ae55ec1dc7d0e500c96";
const checksummedUserAccount = ethers.utils.getAddress(userAccount);

postSafe([checksummedUserAccount], 1);
