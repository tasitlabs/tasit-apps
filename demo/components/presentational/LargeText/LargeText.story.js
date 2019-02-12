import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import LargeText from "./LargeText";

storiesOf("LargeText", module).add("Style", () => (
  <Story>
    <UseCase text="Large Text" usage="Used for displaying headers">
      <LargeText>Large Text Header</LargeText>
    </UseCase>
  </Story>
));
