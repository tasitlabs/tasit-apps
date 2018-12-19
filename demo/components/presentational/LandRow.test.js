import React from "react";
import { shallow } from "enzyme";
import LandRow from "./LandRow";

describe("LandRow", () => {
  it("renders the component", async () => {
    expect(shallow(<LandRow />)).toMatchSnapshot();
  });
});
