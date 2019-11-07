import React from "react";
import { shallow } from "enzyme";
import OnboardingHome from "../OnboardingHome";

describe("OnboardingHome", () => {
  it("renders the component", () => {
    const onPress = () => {};
    expect(shallow(<OnboardingHome onPress={onPress} />)).toMatchSnapshot();
  });
});
