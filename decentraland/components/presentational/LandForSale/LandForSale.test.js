import React from "react";
import { shallow } from "enzyme";
import LandForSale from "@presentational/LandForSale";
import { estateForSale } from "@helpers/testHelpers";

describe("LandForSale", () => {
  it("renders the component", async () => {
    expect(
      shallow(<LandForSale landForSale={estateForSale} />)
    ).toMatchSnapshot();
  });
});
