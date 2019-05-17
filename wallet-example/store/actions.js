export function addTransaction(data) {
  console.log("Adding transaction to store", data);
  return { type: "NEW_TRANSACTION", data };
}
