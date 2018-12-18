import NavigationTestUtils from "react-navigation/NavigationTestUtils";
//import { StyleSheet, Text, View } from "react-native";
import renderer from "react-test-renderer";
import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the loading screen", async () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit("renders the root without loading screen", async () => {
    const wrapper = shallow(<Home />);

    await wrapper.instance().componentDidMount();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
