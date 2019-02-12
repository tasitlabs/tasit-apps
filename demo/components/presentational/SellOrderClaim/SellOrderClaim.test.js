import React from "react";
import { shallow } from "enzyme";
import SellOrderClaim from "./SellOrderClaim";

describe("SellOrderClaim", () => {
  it("renders the component", async () => {
    expect(
      shallow(<SellOrderClaim sellOrder={{}} onClaim={() => {}} />)
    ).toMatchSnapshot();
  });
});
