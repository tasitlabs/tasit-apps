export function addTransaction(data) {
  console.info("Adding transaction to store", data);
  return { type: "NEW_TRANSACTION", data };
}
