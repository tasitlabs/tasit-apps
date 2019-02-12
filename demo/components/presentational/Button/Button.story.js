import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "@presentational/Button";

storiesOf("Button", module).add("Default", () => (
  <Button title="Test" onPress={() => {}} />
));
