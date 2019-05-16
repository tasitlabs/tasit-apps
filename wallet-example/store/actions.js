export function addTransaction(data) {
  console.log("Adding transaction", data);
  return { type: "NEW_TRANSACTION", data };
}
