import React from "react";
import { shallow } from "enzyme";
import LargeText from "@presentational/LargeText";

describe("LargeText", () => {
  it("renders the component", async () => {
    expect(shallow(<LargeText>{""}</LargeText>)).toMatchSnapshot();
  });
});
