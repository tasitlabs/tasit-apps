import React from "react";
import { shallow } from "enzyme";
import { MyProfileProgress, MyProfileProgressText } from "./MyProfileProgress";

describe("MyProfileProgress", () => {
  it("renders the component", async () => {
    const progress = 0.5;
    expect(
      shallow(<MyProfileProgress progress={progress} />)
    ).toMatchSnapshot();
  });

  describe("MyAccountProgressText", () => {
    it("renders the component", async () => {
      const progress = 0.5;
      expect(
        shallow(<MyProfileProgressText progress={progress} />)
      ).toMatchSnapshot();
    });
  });
});
