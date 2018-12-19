import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home", () => {
  it("renders the component", async () => {
    expect(shallow(<Home onPress={() => {}} />)).toMatchSnapshot();
  });
});
