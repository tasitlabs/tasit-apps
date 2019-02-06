import React from "react";
import { shallow } from "enzyme";
import Land from "./Land";

describe("Land", () => {
  it("renders the component", async () => {
    const land = {
      id: -1,
      name: "Not found",
      img: require("../../assets/images/icon.png"),
      priceMana: 0,
      priceUsd: 0,
    };
    expect(shallow(<Land land={land} />)).toMatchSnapshot();
  });
});
