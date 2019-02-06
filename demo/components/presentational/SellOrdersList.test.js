import React from "react";
import { shallow } from "enzyme";
import SellOrdersList from "./SellOrdersList";

describe("SellOrdersList", () => {
  it("renders the component", async () => {
    expect(
      shallow(<SellOrdersList sellOrders={[]} renderItem={() => {}} />)
    ).toMatchSnapshot();
  });
});
