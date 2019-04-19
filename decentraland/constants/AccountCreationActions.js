import {
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "./AccountCreationStatus";

/**
 * Total percentage should be 80% because account generated is 20%
 */
export default {
  [FUNDING_WITH_ETH]: {
    name: "Funded with ETH",
    percentage: 0.25,
  },
  [FUNDING_WITH_MANA]: {
    name: "Funded with MANA tokens",
    percentage: 0.25,
  },
  [APPROVING_MARKETPLACE]: {
    name: "Linked to marketplace",
    percentage: 0.25,
  },
};
