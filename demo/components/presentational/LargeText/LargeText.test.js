import React from "react";
import { shallow } from "enzyme";
import LargeText from ".";

describe("LargeText", () => {
  it("renders the component", async () => {
    expect(shallow(<LargeText>{""}</LargeText>)).toMatchSnapshot();
  });
});
