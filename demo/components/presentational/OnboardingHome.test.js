import React from "react";
import { shallow } from "enzyme";
import OnboardingHome from "./OnboardingHome";

describe("OnboardingHome", () => {
  it("renders the component", async () => {
    expect(shallow(<OnboardingHome onPress={() => {}} />)).toMatchSnapshot();
  });
});
