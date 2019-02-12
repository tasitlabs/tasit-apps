import React from "react";
import { shallow } from "enzyme";
import LandsForSaleList from "./LandsForSaleList";

describe("LandsForSaleList", () => {
  it("renders the component", async () => {
    const landForSaleRenderer = () => {};
    const landsForSale = [];
    expect(
      shallow(
        <LandsForSaleList
          landsForSale={landsForSale}
          renderItem={landForSaleRenderer}
        />
      )
    ).toMatchSnapshot();
  });
});
