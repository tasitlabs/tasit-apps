import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "./Button";

storiesOf("Button").add("Default", () => (
  <Button title="Test" onPress={() => {}} />
));
