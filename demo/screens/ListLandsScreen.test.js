import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import ListLandsScreen from "./ListLandsScreen";

describe("ListLandsScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<ListLandsScreen />)).toMatchSnapshot();
  });
});
