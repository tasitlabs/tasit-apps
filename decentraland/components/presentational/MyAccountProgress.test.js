import React from "react";
import { shallow } from "enzyme";
import MyAccountProgress from "./MyAccountProgress";

describe("MyAccountProgress", () => {
  it("renders the component", async () => {
    expect(shallow(<MyAccountProgress progress={0.5} />)).toMatchSnapshot();
  });
});
