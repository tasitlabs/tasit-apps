import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  describe("renders the component", () => {
    it("default button", async () => {
      const onPress = () => {};
      expect(
        shallow(<Button title="Enabled button" onPress={onPress} />)
      ).toMatchSnapshot();
    });

    it("disabled button", async () => {
      const disabled = true;
      expect(
        shallow(<Button title="Disabled button" disabled={disabled} />)
      ).toMatchSnapshot();
    });
  });
});
