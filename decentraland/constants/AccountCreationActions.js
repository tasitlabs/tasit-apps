import AccountCreationStatus from "./AccountCreationStatus";

/**
 * Total percentage should be 80% because account generated is 20%
 */
export default {
  [AccountCreationStatus.FUNDING_WITH_ETH]: {
    name: "Funded with ETH",
    percentage: 0.25,
  },
  [AccountCreationStatus.FUNDING_WITH_MANA]: {
    name: "Funded with MANA tokens",
    percentage: 0.25,
  },
  [AccountCreationStatus.APPROVING_MARKETPLACE]: {
    name: "Linked to marketplace",
    percentage: 0.25,
  },
};
