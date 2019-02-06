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
    const sellOrder = {
      id: -1,
      priceMana: 0,
      priceUsd: 0,
      asset: {
        id: -1,
        name: "Not found",
        img: "https://decentraland.org/images/logo-65f7b27caf.png",
      },
    };
    const navigation = { getParam: () => sellOrder };
    expect(
      shallow(<SellOrderScreen navigation={navigation} />)
    ).toMatchSnapshot();
  });
});
