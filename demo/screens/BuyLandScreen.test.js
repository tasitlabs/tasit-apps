import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { SellOrderExecuteScreen } from "./SellOrderExecuteScreen";

describe("SellOrderExecuteScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const sellOrder = {
      id: 123,
      priceMana: 0,
      priceUSD: 0,
      asset: {
        id: -1,
        name: "Not found",
        img: "https://decentraland.org/images/logo-65f7b27caf.png",
      },
    };

    const account = {};
    const navigation = () => {};
    const removeSellOrder = () => {};

    expect(
      shallow(
        <SellOrderExecuteScreen
          navigation={navigation}
          account={account}
          claimedSellOrder={sellOrder}
          removeSellOrder={removeSellOrder}
        />
      )
    ).toMatchSnapshot();
  });
});
