import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumQuestion from "./EthereumQuestion";

describe("EthereumQuestion", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<EthereumQuestion />)).toMatchSnapshot();
  });
});
