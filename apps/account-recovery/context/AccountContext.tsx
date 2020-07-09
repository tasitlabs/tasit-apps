/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext } from "react";

// Create Context Object
export const AccountContext = createContext({
  account: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: (_account: string) => {},
});

// Create a provider for components to consume and subscribe to changes
export const AccountContextProvider = (props: any): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [account, setAccount] = useState<any>("");

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {props.children}
    </AccountContext.Provider>
  );
};
