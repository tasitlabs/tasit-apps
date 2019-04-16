import React from "react";
import { shallow } from "enzyme";
import MyAccountProgress from "./MyAccountProgress";

describe("MyAccountProgress", () => {
  it("renders the component", async () => {
    const progress = 0.5;
    expect(
      shallow(<MyAccountProgress progress={progress} />)
    ).toMatchSnapshot();
  });
});
