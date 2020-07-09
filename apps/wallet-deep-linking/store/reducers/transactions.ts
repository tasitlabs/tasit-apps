const transactions = (state = [], action): object => {
  switch (action.type) {
    case "NEW_TRANSACTION":
      return [
        ...state,
        {
          ...action.data,
          completed: false,
        },
      ];
    default:
      return state;
  }
};

export default transactions;
