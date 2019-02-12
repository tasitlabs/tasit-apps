import React from "react";
import { shallow } from "enzyme";
import BuyLand from "./BuyLand";

describe("BuyLand", () => {
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
    const onOrderExecution = () => {};

    expect(
      shallow(
        <BuyLand sellOrder={sellOrder} onOrderExecution={onOrderExecution} />
      )
    ).toMatchSnapshot();
  });
});
