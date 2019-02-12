import React from "react";
import { shallow } from "enzyme";
import Home from ".";

describe("Home", () => {
  it("renders the component", async () => {
    const onPress = () => {};
    expect(shallow(<Home onPress={onPress} />)).toMatchSnapshot();
  });
});
