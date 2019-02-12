import React from "react";
import { shallow } from "enzyme";
import LandsForSaleList from "./LandsForSaleList";

describe("LandsForSaleList", () => {
  it("renders the component", async () => {
    const sellOrderRenderer = () => {};
    const sellOrders = [];
    expect(
      shallow(
        <LandsForSaleList
          sellOrders={sellOrders}
          renderItem={sellOrderRenderer}
        />
      )
    ).toMatchSnapshot();
  });
});
