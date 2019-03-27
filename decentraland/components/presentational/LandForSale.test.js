import React from "react";
import { shallow } from "enzyme";
import LandForSale from "./LandForSale";
import { estateForSale } from "./testHelpers";

describe("LandForSale", () => {
  it("renders the component", async () => {
    expect(
      shallow(<LandForSale landForSale={estateForSale} />)
    ).toMatchSnapshot();
  });
});
