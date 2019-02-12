import React from "react";
import { shallow } from "enzyme";
import SellOrderClaim from "./SellOrderClaim";

describe("SellOrderClaim", () => {
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
    const onClaim = () => {};
    expect(
      shallow(<SellOrderClaim sellOrder={sellOrder} onClaim={onClaim} />)
    ).toMatchSnapshot();
  });
});
