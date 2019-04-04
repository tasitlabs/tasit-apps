import React from "react";
import { shallow } from "enzyme";
import LandForSaleInfo from "./LandForSaleInfo";
import { estateForSale } from "@helpers/testHelpers";

describe("LandForSaleInfo", () => {
  it("renders the component", async () => {
    expect(
      shallow(<LandForSaleInfo landForSale={estateForSale} />)
    ).toMatchSnapshot();
  });
});
