const transactions = (state = [], action) => {
  switch (action.type) {
    case "NEW_TRANSACTION":
      return [
        ...state,
        {
          ...action,
          completed: false
        }
      ];
    default:
      return state;
  }
};

export default transactions;
