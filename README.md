# Tasit apps

<div align="left">
  <img src="./assets/images/TasitLogoFromSvgTransparentAndOpaqueColor1024x1024.png" width="200" />
</div>

The Tasit apps show off how easy it is to build a standalone native mobile app for Ethereum using [Tasit](https://github.com/tasitlabs/tasit-sdk).

The apps generally are built with React Native, Expo, [React Navigation](https://reactnavigation.org/), Prettier, and TypeScript. And Tasit, but hopefully that was clear by now.

_Disclaimer:_ The alpha versions of these apps are under active development. We encourage you to try them out or use them as a reference for hackathons, etc., but they're not ready for anything involving real funds on mainnet. If you'd prefer to wait for a more battle-tested release, please watch this repo with the `Releases only` setting and/or sign up to be notified about our releases on the [tasit.io](https://tasit.io) website.

## Simple onboarding

<div align="left">
  <img src="./assets/screenshots/StartSetup.png" width="200" />
  <img src="./assets/screenshots/PickUsername.png" width="200" />
</div>

## Example apps

#### Account recovery app

A minimal TypeScript + Expo + Tasit app demonstrating generating an contract-based account for the user that allows for account recovery.

[`Code`](./apps/account-recovery)

#### In-dapp account app

A minimal TypeScript + Expo + Tasit app demonstrating generating an in-dapp account for the user.

[`Code`](./apps/in-dapp-account)

## Why / how?

The goal is to build production-grade apps for mainstream users that let them get the benefits of Ethereum easily. They shouldn't need to know the technical detail that Ethereum is involved.

Unlike with dapp browsers where you use multiple dapps as mobile web apps from within one app, you can use each of a Tasit-powered dapp via its own standalone native mobile app.

This entails a different, simpler onboarding flow in an environment without MetaMask. The user is in control of their private keys, but much of this happens "automagically" behind the scenes.

These apps are built with [Tasit](https://github.com/tasitlabs/tasit-sdk), a JavaScript / TypeScript SDK that lets developers create their own native Ethereum dapps.

## Developers

This is a monorepo for all of the open-source Tasit 3rd-party mobile apps for Ethereum dapps.

These apps all use [Tasit](https://github.com/tasitlabs/tasit-sdk).

For more info, check out our docs:

[docs.tasit.io](https://docs.tasit.io/)

#### Running an app from this repo locally

```
git clone https://github.com/tasitlabs/tasit-apps.git
cd tasit-apps
cd apps
cd [APP_NAME]
npm install
npm start
```

## Legacy apps

#### Decentraland Market powered by Tasit

[Decentraland Market](https://decentraland.org/) is a dapp using unique tokens / NFTs. `Decentraland Market` lets you use the marketplace for Decentraland as a dapp on mobile.

[Code](./apps/decentraland)

<div align="left">
  <img src="./assets/screenshots/ListLand.png" width="200" />
  <img src="./assets/screenshots/BuyLand.png" width="200" />
</div>


## Contact us

Please feel free to reach out.

   | Contact method | Link |
   | ------------- | ------------- |
   | 🤐  Website | [tasit.io](https://tasit.io/) |
   | 🐦  Twitter  | [@TasitProject](https://twitter.com/TasitProject) |
   | 📝  Medium  | [medium.com/tasit](https://medium.com/tasit) |
   | 💬  Discord  | [discordapp.com/invite/bRp4QKq](https://discordapp.com/invite/bRp4QKq) |
   | 💬  Telegram | [t.me/tasitproject](https://t.me/tasitproject) |
   | 📧  Email  | [team@tasit.io](mailto:team@tasit.io) |
   | 🗺️  Roadmap  | [github.com/orgs/tasitlabs/projects/1](https://github.com/orgs/tasitlabs/projects/1) |
   | 💡  Feature requests  | [feedback.tasit.io/feature-requests](http://feedback.tasit.io/feature-requests) |

## Open-source funding

Development of Tasit is supported in part by [Gnosis](https://github.com/gnosis/) through their [GECO](https://github.com/gnosis/GECO) grant initiative and by the [Ethereum Foundation](https://ethereum.foundation/) through the [ecosystem support program](https://esp.ethereum.foundation).

This project is open-source and in need of additional funding to sustain work on it. If you're able to contribute, please consider [supporting the project on Gitcoin Grants](https://gitcoin.co/grants/183/tasit-native-mobile-ethereum-dapps) or sending ETH or DAI to the Tasit project's contract address:

`0x7d888a9036b5a96f77b433e65b9be1b122f8a499` ([Etherscan](https://etherscan.io/address/0x7d888a9036b5a96f77b433e65b9be1b122f8a499))
