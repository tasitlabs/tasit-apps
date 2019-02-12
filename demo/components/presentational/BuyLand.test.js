import React from "react";
import { shallow } from "enzyme";
import SellOrderExecute from "./SellOrderExecute";

describe("SellOrderExecute", () => {
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
        <SellOrderExecute
          sellOrder={sellOrder}
          onOrderExecution={onOrderExecution}
        />
      )
    ).toMatchSnapshot();
  });
});
