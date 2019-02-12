import React from "react";
import { shallow } from "enzyme";
import LandForSale from "./LandForSale";

describe("LandForSale", () => {
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
    expect(shallow(<LandForSale sellOrder={sellOrder} />)).toMatchSnapshot();
  });
});
