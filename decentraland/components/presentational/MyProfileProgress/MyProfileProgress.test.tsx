import React from "react";
import { shallow } from "enzyme";
import { MyProfileProgress, MyProfileProgressText } from "./MyProfileProgress";

// Not the @presentational version since it needs
// the internal component

describe("MyProfileProgress", () => {
  it("renders the component", () => {
    const progress = 0.5;
    expect(
      shallow(<MyProfileProgress progress={progress} />)
    ).toMatchSnapshot();
  });

  describe("MyAccountProgressText", () => {
    it("renders the component", () => {
      const progress = 0.5;
      expect(
        shallow(<MyProfileProgressText progress={progress} />)
      ).toMatchSnapshot();
    });
  });
});
