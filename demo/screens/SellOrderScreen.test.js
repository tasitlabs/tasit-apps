import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import LandClaimScreen from "./SellOrderScreen";

describe("LandClaimScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const navigation = { getParam: jest.fn() };
    expect(
      shallow(<LandClaimScreen navigation={navigation} />)
    ).toMatchSnapshot();
  });
});
