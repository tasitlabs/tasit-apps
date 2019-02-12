import React from "react";
import { shallow } from "enzyme";
import SellOrder from "./SellOrder";

describe("SellOrder", () => {
  it("renders the component", async () => {
    const sellOrder = {
      id: -1,
      priceMana: 0,
      priceUSD: 0,
      asset: {
        id: -1,
        name: "Not found",
        img: "https://decentraland.org/images/logo-65f7b27caf.png",
      },
    };
    expect(shallow(<SellOrder sellOrder={sellOrder} />)).toMatchSnapshot();
  });
});
