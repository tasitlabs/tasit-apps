import React from "react";
import { shallow } from "enzyme";
import Estate from "./Estate";
import { estate } from "./testHelpers";

describe("Estate", () => {
  it("renders the component", async () => {
    expect(shallow(<Estate estate={estate} />)).toMatchSnapshot();
  });
});
