// TODO: Update to ES6 when the import/require in the starter scripts
// are compatible

module.exports = {
  provider: {
    network: "ropsten",
    provider: "fallback",
    pollingInterval: 4000,
  },
  events: {
    timeout: 10000,
  },
};
