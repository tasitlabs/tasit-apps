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
    const setAccountFundedWithEthers = () => {};
    const setAccountFundedWithMana = () => {};
    const setAccountApprovedMarketplace = () => {};
    expect(
      shallow(
        <EthereumSignUpScreen
          setAccount={setAccount}
          setSetupInProgress={setSetupInProgress}
          setAccountFundedWithEthers={setAccountFundedWithEthers}
          setAccountFundedWithMana={setAccountFundedWithMana}
          setAccountApprovedMarketplace={setAccountApprovedMarketplace}
        />
      )
    ).toMatchSnapshot();
  });
});
