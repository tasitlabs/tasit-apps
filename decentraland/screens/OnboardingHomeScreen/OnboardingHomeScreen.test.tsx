import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import OnboardingHomeScreen from "./OnboardingHomeScreen";

describe("OnboardingHome", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", () => {
    expect(shallow(<OnboardingHomeScreen />)).toMatchSnapshot();
  });
});
