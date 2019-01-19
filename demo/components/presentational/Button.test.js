import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  it("renders the component", async () => {
    expect(
      shallow(<Button title="Title" onPress={() => {}} />)
    ).toMatchSnapshot();
  });
});
