import React from "react";
import { shallow } from "enzyme";
import SellOrdersList from "./SellOrdersList";

describe("SellOrdersList", () => {
  it("renders the component", async () => {
    const renderItem = () => {};
    const sellOrders = [];
    expect(
      shallow(
        <SellOrdersList sellOrders={sellOrders} renderItem={renderItem} />
      )
    ).toMatchSnapshot();
  });
});
