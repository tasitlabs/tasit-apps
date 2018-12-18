import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUp from "./EthereumSignUp";

describe("EthereumSignUp", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<EthereumSignUp />)).toMatchSnapshot();
  });
});
