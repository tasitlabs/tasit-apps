import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { EthereumSignUpScreen } from "./EthereumSignUpScreen";

describe("EthereumSignUpScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    const setAccount = () => {};
    const setAccountCreationStatus = () => {};
    const updateActionIdForAccountCreationStatus = () => {};

    expect(
      shallow(
        <EthereumSignUpScreen
          setAccount={setAccount}
          setAccountCreationStatus={setAccountCreationStatus}
          updateActionIdForAccountCreationStatus={
            updateActionIdForAccountCreationStatus
          }
        />
      )
    ).toMatchSnapshot();
  });
});
