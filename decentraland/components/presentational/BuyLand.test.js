import React from "react";
import { shallow } from "enzyme";
import BuyLand from "./BuyLand";
import { parcelForSale } from "./testHelpers";

describe("BuyLand", () => {
  it("renders the component", async () => {
    const onBuy = () => {};
    const waitingForAccountSetup = false;

    expect(
      shallow(
        <BuyLand
          landForSale={parcelForSale}
          onBuy={onBuy}
          waitingForAccountSetup={waitingForAccountSetup}
        />
      )
    ).toMatchSnapshot();
  });
});
