import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignInScreen from "./EthereumSignInScreen";

describe("EthereumSignIn", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    expect(shallow(<EthereumSignInScreen />)).toMatchSnapshot();
  });
});
