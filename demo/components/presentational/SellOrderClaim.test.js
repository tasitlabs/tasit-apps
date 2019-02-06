import React from "react";
import { shallow } from "enzyme";
import SellOrder from "./SellOrder";

describe("SellOrder", () => {
  it("renders the component", async () => {
    expect(
      shallow(<SellOrder land={{}} onClaim={() => {}} />)
    ).toMatchSnapshot();
  });
});
