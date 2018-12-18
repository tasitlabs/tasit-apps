import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import OnboardingHome from "./OnboardingHome";

describe("OnboardingHome", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
    expect(shallow(<OnboardingHome />)).toMatchSnapshot();
  });
});
