module.exports = {
  provider: {
    network: "other",
    provider: "jsonrpc",
    pollingInterval: 50,
    jsonRpc: {
      url: "http://192.168.1.70",
      port: 8545,
    },
  },
  events: {
    timeout: 2000,
  },
};
