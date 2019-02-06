import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import SellOrderScreen from "./SellOrderScreen";

describe("SellOrderScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const navigation = { getParam: jest.fn() };
    expect(
      shallow(<SellOrderScreen navigation={navigation} />)
    ).toMatchSnapshot();
  });
});
