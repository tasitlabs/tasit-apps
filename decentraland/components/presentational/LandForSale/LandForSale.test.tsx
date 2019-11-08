import React from "react";
import { shallow } from "enzyme";
import LandForSale from "../LandForSale";
import { estateForSale } from "../../../helpers/testHelpers";

describe("LandForSale", () => {
  it("renders the component", () => {
    expect(
      shallow(<LandForSale landForSale={estateForSale} />)
    ).toMatchSnapshot();
  });
});
