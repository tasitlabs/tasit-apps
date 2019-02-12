import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { ListSellOrdersScreen } from "./ListSellOrdersScreen";

describe("ListSellOrdersScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    const sellOrders = [];
    const setSellOrders = () => {};
    expect(
      shallow(
        <ListSellOrdersScreen
          sellOrders={sellOrders}
          setSellOrders={setSellOrders}
        />
      )
    ).toMatchSnapshot();
  });
});
