import React from "react";
import { shallow } from "enzyme";
import MyProfile from "./MyProfile";
import { accountCreationSteps } from "@helpers/testHelpers";

describe("MyProfile", () => {
  it("renders the component", async () => {
    const progress = 0.5;
    expect(
      shallow(
        <MyProfile progress={progress} creationSteps={accountCreationSteps} />
      )
    ).toMatchSnapshot();
  });
});
