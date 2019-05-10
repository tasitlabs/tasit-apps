import React from "react";
import { shallow } from "enzyme";
import Estate from "@presentational/Estate";
import { estate } from "@helpers/testHelpers";

describe("Estate", () => {
  it("renders the component", async () => {
    expect(shallow(<Estate estate={estate} />)).toMatchSnapshot();
  });
});
