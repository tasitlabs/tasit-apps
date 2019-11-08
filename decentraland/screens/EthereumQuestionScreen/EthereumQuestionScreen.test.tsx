import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumQuestionScreen from "./EthereumQuestionScreen";

describe("EthereumQuestionScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    expect(shallow(<EthereumQuestionScreen />)).toMatchSnapshot();
  });
});
