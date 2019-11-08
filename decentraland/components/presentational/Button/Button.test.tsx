import React from "react";
import { shallow } from "enzyme";
import Button from "../Button";

describe("Button", () => {
  describe("renders the component", () => {
    const onPress = (): void => {};

    it("default button", () => {
      expect(
        shallow(<Button title="Enabled button" onPress={onPress} />)
      ).toMatchSnapshot();
    });

    it("disabled button", () => {
      const disabled = true;
      expect(
        shallow(
          <Button
            title="Disabled button"
            onPress={onPress}
            disabled={disabled}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
