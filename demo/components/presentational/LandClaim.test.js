import React from "react";
import { shallow } from "enzyme";
import LandClaim from "./LandClaim";

describe("LandClaim", () => {
  it("renders the component", async () => {
    expect(
      shallow(<LandClaim land={{}} onClaim={() => {}} />)
    ).toMatchSnapshot();
  });
});
