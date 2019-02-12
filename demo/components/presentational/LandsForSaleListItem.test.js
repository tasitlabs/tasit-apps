import React from "react";
import { shallow } from "enzyme";
import LandsForSaleListItem from "./LandsForSaleListItem";

describe("SellOrdersListItem", () => {
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
    const onPress = () => {};
    expect(
      shallow(<LandsForSaleListItem sellOrder={sellOrder} onPress={onPress} />)
    ).toMatchSnapshot();
  });
});
