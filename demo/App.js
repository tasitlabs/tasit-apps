import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import "ethers/dist/shims.js";
import { ethers } from "ethers";

// Note: In the future, we'll be importing the Tasit SDK
// which has ethers.js as a dependency rather than importing
// it directly

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  async ethersTryingOut() {
    try {
      // before all
      const ropstenProvider = ethers.getDefaultProvider("ropsten");
      const mainnetProvider = ethers.getDefaultProvider();
      const utils = ethers.utils;
      const password = "foo";

      // time: <1s
      console.log("create a wallet from a private key");
      const privKeyWallet = new ethers.Wallet(
        "0x3141592653589793238462643383279502884197169399375105820974944592"
      );
      console.assert(
        privKeyWallet,
        "should create a wallet from a private key"
      );

      // time: <1s
      console.log("create a wallet from a private key and provider");
      const fundedWallet = new ethers.Wallet(
        "0x18bfdd05c1e63e4a27081352e2910c164a4d34588f8d7eecfdfcb654742934c2",
        ropstenProvider
      );
      console.assert(
        fundedWallet,
        "should create a wallet with given provider"
      );

      // time: <1s
      console.log("create a random wallet");
      const randomWallet = ethers.Wallet.createRandom();
      console.assert(randomWallet.address, "should create a random wallet");

      // time: <1s
      console.log("create a wallet from a mnemonic word");
      const mnemonicWallet = ethers.Wallet.fromMnemonic(
        "radar blur cabbage chef fix engine embark joy scheme fiction master release"
      );
      console.assert(
        mnemonicWallet,
        "should create a wallet from mnemonic words"
      );

      // // LOCKING APP LOADING
      // console.log("import wallet from encrypted json");
      // let walletData = {
      //   id: "fb1280c0-d646-4e40-9550-7026b1be504a",
      //   address: "88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
      //   Crypto: {
      //     kdfparams: {
      //       dklen: 32,
      //       p: 1,
      //       salt:
      //         "bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd",
      //       r: 8,
      //       n: 262144
      //     },
      //     kdf: "scrypt",
      //     ciphertext:
      //       "10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406",
      //     mac:
      //       "1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703",
      //     cipher: "aes-128-ctr",
      //     cipherparams: {
      //       iv: "1dcdf13e49cea706994ed38804f6d171"
      //     }
      //   },
      //   version: 3
      // };
      // let jsonToImport = JSON.stringify(walletData);
      //
      // let importedWallet = await ethers.Wallet.fromEncryptedJson(
      //   jsonToImport,
      //   password
      // );
      // console.assert(
      //   importedWallet,
      //   "should create  a wallet from encrypted json"
      // );

      // // LOCKING APP LOADING
      // console.log("export wallet to encrypted json");
      // let jsonToExport = await fundedWallet.encrypt(password);
      // console.assert(
      //   utils.getAddress(JSON.parse(jsonToExport).address) ===
      //     fundedWallet.address,
      //   "should export wallet"
      // );

      // time: <1s
      console.log("sign and broadcast a raw transaction");
      let nonce = await ropstenProvider.getTransactionCount(
        fundedWallet.address
      );
      let rawTx = {
        nonce: nonce,
        gasLimit: 21000,
        gasPrice: utils.bigNumberify("20000000000"),
        to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
        value: utils.parseEther("0.0000001"),
        data: "0x",
        chainId: utils.getNetwork("ropsten").chainId
      };
      let signedTx = await fundedWallet.sign(rawTx);
      let sentTx = await ropstenProvider.sendTransaction(signedTx);
      console.assert(sentTx.hash, "should broadcast signed tx");

      console.log(`waiting tx ${sentTx.hash} be mined`);
      await ropstenProvider.waitForTransaction(sentTx.hash);

      // time: <1s
      console.log("sign a message");
      const rawMsg = "Hello World!";
      const expectedSignedMsg =
        "0xea09d6e94e52b48489bd66754c9c02a772f029d4a2f136bba9917ab3042a0474301198d8c2afb71351753436b7e5a420745fed77b6c3089bbcca64113575ec3c1c";
      let signedMsg = await privKeyWallet.signMessage("Hello World!");
      console.assert(expectedSignedMsg === signedMsg, "should sign a message");

      // time: <1s
      console.log("sign binary message");
      // The 66 character hex string MUST be converted to a 32-byte array first!
      const hash =
        "0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0";
      let binData = utils.arrayify(hash);

      const expectedSignedBinData =
        "0x5e9b7a7bd77ac21372939d386342ae58081a33bf53479152c87c1e787c27d06b118d3eccff0ace49891e192049e16b5210047068384772ba1fdb33bbcba580391c";
      let signedBinData = await privKeyWallet.signMessage(binData);
      console.assert(
        expectedSignedBinData === signedBinData,
        "should sign a bin data"
      );

      // time: <1s
      console.log("check for balance");
      let balance = await fundedWallet.getBalance();
      console.assert(
        utils.bigNumberify(balance).gt(utils.bigNumberify(0)),
        `funded wallet should have ethers - check if really has - (address: ${
          fundedWallet.address
        })`
      );

      // time: <5s
      console.log("ENS");
      const expectedENS = {
        name: "registrar.firefly.eth",
        address: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c"
      };

      let ensAddress = await mainnetProvider.resolveName(expectedENS.name);
      console.assert(
        ensAddress === expectedENS.address,
        "should resolve a name"
      );

      let ensName = await mainnetProvider.lookupAddress(expectedENS.address);
      console.assert(ensName === expectedENS.name, "should lookup address");

      // time: OK (all contract interactions)
      console.log("update contract state");
      const contractABI = [
        "event ValueChanged(address indexed author, string oldValue, string newValue)",
        "constructor(string value)",
        "function getValue() view returns (string value)",
        "function setValue(string value)"
      ];
      const contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";
      const newValue = `I like dogs ${randomWallet.mnemonic}`;

      let contract = new ethers.Contract(
        contractAddress,
        contractABI,
        fundedWallet
      );

      // Working but event still registred
      contract.once("ValueChanged", (author, oldValue, newValue, event) => {
        console.assert(
          author === fundedWallet.address,
          "ValueChanged event should have fundedWallet.address as author"
        );
        contract.removeAllListeners("ValueChanged");
      });

      let updateValueTx = await contract.setValue(newValue);
      console.assert(updateValueTx.hash, "should broadcast setValue tx");

      console.log(`waiting tx ${updateValueTx.hash} be mined`);
      await ropstenProvider.waitForTransaction(updateValueTx.hash);

      let currentValue = await contract.getValue();
      console.assert(currentValue === newValue, "should change contract value");
    } catch (e) {
      console.log(e);
    }

    console.log("end");
  }

  componentDidMount() {
    this.ethersTryingOut();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Welcome to the Tasit demo app</Text>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([Asset.loadAsync([]), Font.loadAsync({})]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
