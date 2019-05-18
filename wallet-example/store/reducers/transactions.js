const transactions = (state = [], action) => {
  switch (action.type) {
    case "NEW_TRANSACTION":
      return [
        ...state,
        {
          ...action.data,
          completed: false
        }
      ];
    default:
      return state;
  }
};

export default transactions;
