import React from "react";
import { shallow } from "enzyme";
import LargeText from "../LargeText";

describe("LargeText", () => {
  it("renders the component", () => {
    expect(shallow(<LargeText>{""}</LargeText>)).toMatchSnapshot();
  });
});
