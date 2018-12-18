import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the Home screen", async () => {
    expect(shallow(<Home />)).toMatchSnapshot();
  });

  it("renders the root without loading screen", async () => {
    const wrapper = shallow(<Home />);

    await wrapper.instance().componentDidMount();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
