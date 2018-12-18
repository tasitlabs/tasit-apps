import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignIn from "./EthereumSignIn";

describe("EthereumSignIn", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<EthereumSignIn />)).toMatchSnapshot();
  });
});
