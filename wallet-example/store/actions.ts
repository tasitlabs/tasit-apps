export function addTransaction(data): object {
  console.info("Adding transaction to store", data);
  return { type: "NEW_TRANSACTION", data };
}
