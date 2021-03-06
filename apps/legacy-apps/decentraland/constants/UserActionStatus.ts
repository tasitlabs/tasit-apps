// To be used for meta-tx
// Also for contract-based accounts with signed messages
// that will be bundled into tx with enough signatures
export const BROADCASTED = "BROADCASTED";

export const PENDING = "PENDING";
export const FAILED = "FAILED";

// Note: We are using only 'SUCCESSFUL' for now
// When we're tracking confirmations that will be used for >= 7
// and 'PROBABLY_SUCCESSFUL' to < 7 confirmations.
export const PROBABLY_SUCCESSFUL = "PROBABLY_SUCCESSFUL";
export const SUCCESSFUL = "SUCCESSFUL";

export default {
  PENDING,
  FAILED,
  SUCCESSFUL,
};
