import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "@presentational/Button";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";

storiesOf("Button", module).add("Style Presets", () => (
  <Story>
    <UseCase text="Primary" usage="The primary button.">
      <Button title="Test" onPress={() => {}} />
    </UseCase>
    <UseCase text="Disabled" usage="The disabled behavior of the button.">
      <Button title="Disabled" onPress={() => {}} disabled />
    </UseCase>
  </Story>
));
