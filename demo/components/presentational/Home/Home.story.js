import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import Home from "./Home";

storiesOf("Home", module).add("Default", () => (
  <Story>
    <UseCase text="Home">
      <Home />
    </UseCase>
  </Story>
));
