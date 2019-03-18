module.exports = {
  provider: {
    network: "other",
    provider: "jsonrpc",
    pollingInterval: 1000,
    jsonRpc: {
      url: "http://192.168.1.69",
      port: 8545,
    },
  },
  events: {
    timeout: 2000,
  },
};
