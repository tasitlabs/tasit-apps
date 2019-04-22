import React from "react";
import { shallow } from "enzyme";
import { MyAccountProgress, MyAccountProgressText } from "./MyAccountProgress";

describe("MyAccountProgress", () => {
  it("renders the component", async () => {
    const progress = 0.5;
    expect(
      shallow(<MyAccountProgress progress={progress} />)
    ).toMatchSnapshot();
  });

  describe("MyAccountProgressText", () => {
    it("renders the component", async () => {
      const progress = 0.5;
      expect(
        shallow(<MyAccountProgressText progress={progress} />)
      ).toMatchSnapshot();
    });
  });
});
