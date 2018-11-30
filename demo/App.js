import React from "react";
import { AppLoading, Asset, Font } from "expo";
import "ethers/dist/shims.js";
import { ethers } from "ethers";

// Note: In the future, we'll be importing the Tasit SDK
// which has ethers.js as a dependency rather than importing
// it directly

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    const ropstenProvider = ethers.getDefaultProvider("ropsten");
    let mainnetProvider = ethers.getDefaultProvider();
    let utils = ethers.utils;

    let privateKey =
      "0x3141592653589793238462643383279502884197169399375105820974944592";
    let address = "0x7357589f8e367c2C31F51242fB77B350A11830F3";
    let wallet = new ethers.Wallet(privateKey);
    let fundedWallet = new ethers.Wallet(
      "0x18bfdd05c1e63e4a27081352e2910c164a4d34588f8d7eecfdfcb654742934c2",
      ropstenProvider
    ); //addr:0xa9adeF68CEF4EA3C9d0717126e14fDfebFDFB4d7

    let wallet2mnemonic =
      "radar blur cabbage chef fix engine embark joy scheme fiction master release";
    let wallet2 = ethers.Wallet.fromMnemonic(wallet2mnemonic);
    let wallet3 = ethers.Wallet.createRandom();

    console.assert(wallet.address === address, "wallet.address");
    console.assert(wallet.privateKey === privateKey, "wallet.privateKey");
    console.assert(wallet2.mnemonic === wallet2mnemonic, "wallet.privateKey");
    console.assert(
      wallet3.address !== undefined,
      "wallet.address from randonly created"
    );

    /*** Scrypt encryption is VERY SLOW on react-native ***/
    /* import wallet from json */
    // let data = {
    //     id: "fb1280c0-d646-4e40-9550-7026b1be504a",
    //     address: "88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
    //     Crypto: {
    //         kdfparams: {
    //             dklen: 32,
    //             p: 1,
    //             salt: "bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd",
    //             r: 8,
    //             n: 262144
    //         },
    //         kdf: "scrypt",
    //         ciphertext: "10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406",
    //         mac: "1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703",
    //         cipher: "aes-128-ctr",
    //         cipherparams: {
    //             iv: "1dcdf13e49cea706994ed38804f6d171"
    //          }
    //     },
    //     "version" : 3
    // };
    //
    // let json = JSON.stringify(data);
    // let password = "foo";
    //
    // ethers.Wallet.fromEncryptedWallet(json, password).then(function(wallet) {
    //     console.log("Address: " + wallet.address);
    // });
    //
    // /* export wallet to JSON */
    // let password = "password123";
    // function callback(progress) {
    //     console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
    // }
    // wallet.encrypt(password, callback).then(function(json) {
    //     console.log(json);
    // });

    // All properties are optional
    let transaction = {
      nonce: 0,
      gasLimit: 21000,
      gasPrice: ethers.utils.bigNumberify("20000000000"),
      to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
      value: ethers.utils.parseEther("1.0"),
      data: "0x",
      chainId: ethers.utils.getNetwork("homestead").chainId,
    };

    fundedWallet.sign(transaction).then(signedTransaction => {
      let signed =
        "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8" +
        "dd9d0cc45bc290880de0b6b3a76400008025a0ea721a9c35a87d1f8ab01a4030d" +
        "a64a9496e52a640923e7ee32ad21eb8884b11a0311d56567724b5f67650cf172a" +
        "20ce4ff792ee43f21da018fa60d8241916f2b3";

      console.assert(signedTransaction === signed, "wallet.sign()");

      // This can now be sent to the Ethereum network
      ropstenProvider.sendTransaction(signedTransaction).then(tx => {
        console.log(tx);
      });
    });

    // Sign a text message
    wallet.signMessage("Hello World!").then(signature => {
      let sign =
        "0xea09d6e94e52b48489bd66754c9c02a772f029d4a2f136bba9917a" +
        "b3042a0474301198d8c2afb71351753436b7e5a420745fed77b6c3089bbcca6411" +
        "3575ec3c1c";

      console.assert(signature === signed, "wallet.signMessage(text)");
      // Expanded-format
      console.log(utils.splitSignature(signature));
      // {
      //   r: "0xea09d6e94e52b48489bd66754c9c02a772f029d4a2f136bba9917ab3042a0474",
      //   s: "0x301198d8c2afb71351753436b7e5a420745fed77b6c3089bbcca64113575ec3c",
      //   v: 28,
      //   recoveryParam: 1
      //  }
    });

    // The 66 character hex string MUST be converted to a 32-byte array first!
    let hash =
      "0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0";
    let binaryData = utils.arrayify(hash);

    wallet.signMessage(binaryData).then(signature => {
      let signed =
        "0x5e9b7a7bd77ac21372939d386342ae58081a33bf53479152c87c" +
        "1e787c27d06b118d3eccff0ace49891e192049e16b5210047068384772b" +
        "a1fdb33bbcba580391c";

      console.assert(signature === signed, "wallet.signMessage(binaryData)");
    });

    fundedWallet.getBalance().then(balance => {
      console.assert(
        utils.parseEther(balance).gt(utils.bigNumberify(0)),
        "funded wallet should have ethers"
      );
    });

    mainnetProvider
      .resolveName("registrar.firefly.eth")
      .then(function(address) {
        console.assert(
          address === "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
          "provider.resolveName()"
        );
      });

    mainnetProvider
      .lookupAddress("0x6fC21092DA55B392b045eD78F4732bff3C580e2c")
      .then(function(name) {
        console.assert(
          name === "registrar.firefly.eth",
          "provider.lookupAddress()"
        );
      });

    let abi = [
      "event ValueChanged(address indexed author, string oldValue, string newValue)",
      "constructor(string value)",
      "function getValue() view returns (string value)",
      "function setValue(string value)",
    ];
    let contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";
    let contract = new ethers.Contract(contractAddress, abi, fundedWallet);
    let newValue = "I like dogs";

    contract.on("ValueChanged", (author, oldValue, newValue, event) => {
      console.assert(
        author === fundedWallet.address,
        "ValueChanged event should have fundedWallet.address as author"
      );
      console.log(oldValue);
      console.log(newValue);
      console.log(event.blockNumber);
    });

    contract
      .setValue(newValue)
      .then(tx => {
        console.log("ropsten contract write tx: ", tx.hash);
        return tx.wait();
      })
      .then(() => {
        contract.getValue().then(currentValue => {
          console.assert(
            currentValue === newValue,
            "contract value should changed"
          );
        });
      })
      .catch(e => {
        console.log(e);
      });
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
        <Provider store={store}>
          <AppNavigator />
        </Provider>
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

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
