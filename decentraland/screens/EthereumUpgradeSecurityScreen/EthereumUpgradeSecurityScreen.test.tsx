import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { EthereumUpgradeSecurityScreen } from "./EthereumUpgradeSecurityScreen";

describe("EthereumUpgradeSecurityScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    expect(shallow(<EthereumUpgradeSecurityScreen />)).toMatchSnapshot();
  });
});
