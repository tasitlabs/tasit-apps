import React from "react";
import { shallow } from "enzyme";
import OnboardingHome from "@presentational/OnboardingHome";

describe("OnboardingHome", () => {
  it("renders the component", async () => {
    const onPress = () => {};
    expect(shallow(<OnboardingHome onPress={onPress} />)).toMatchSnapshot();
  });
});
