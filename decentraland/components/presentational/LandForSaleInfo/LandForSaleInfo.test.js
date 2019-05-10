import React from "react";
import { shallow } from "enzyme";
import { LandForSaleInfo, ManaPrice } from "./LandForSaleInfo";
// Not the @presentational version since it needs
// the internal component
import { estateForSale } from "@helpers/testHelpers";

describe("LandForSaleInfo", () => {
  it("renders the component", async () => {
    expect(
      shallow(<LandForSaleInfo landForSale={estateForSale} />)
    ).toMatchSnapshot();
  });

  describe("LandForSalePrice", () => {
    it("renders the component", async () => {
      const { priceMana } = estateForSale;
      expect(shallow(<ManaPrice price={priceMana} />)).toMatchSnapshot();
    });
  });
});
