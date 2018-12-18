import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import LandClaim from "./LandClaim";

describe("LandClaim", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const navigation = { getParam: jest.fn() };
    expect(shallow(<LandClaim navigation={navigation} />)).toMatchSnapshot();
  });
});
