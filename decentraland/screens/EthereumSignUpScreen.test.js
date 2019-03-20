import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { EthereumSignUpScreen } from "./EthereumSignUpScreen";

describe("EthereumSignUpScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const setAccount = () => {};
    const setSetupInProgress = () => {};
    expect(
      shallow(
        <EthereumSignUpScreen
          setAccount={setAccount}
          setSetupInProgress={setSetupInProgress}
        />
      )
    ).toMatchSnapshot();
  });
});
