import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<Home />)).toMatchSnapshot();
  });
});
