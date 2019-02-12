import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListLandsForSaleScreen } from "./ListLandsForSaleScreen";

describe("ListLandsForSaleScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const sellOrders = [];
    const setSellOrders = () => {};
    const claimSellOrder = () => {};
    expect(
      shallow(
        <ListLandsForSaleScreen
          sellOrders={sellOrders}
          setSellOrders={setSellOrders}
          claimSellOrder={claimSellOrder}
        />
      )
    ).toMatchSnapshot();
  });
});
