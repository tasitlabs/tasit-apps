import React from "react";
import { shallow } from "enzyme";
import SellOrder from "./SellOrder";

describe("SellOrder", () => {
  it("renders the component", async () => {
    const land = {
      id: -1,
      name: "Not found",
      img: require("../../assets/images/icon.png"),
      priceMana: 0,
      priceUsd: 0,
    };
    expect(shallow(<SellOrder land={land} />)).toMatchSnapshot();
  });
});
