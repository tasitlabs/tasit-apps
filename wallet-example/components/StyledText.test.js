import "react-native";
import React from "react";
import { MonoText } from "./StyledText";
import renderer from "react-test-renderer";

/* eslint-disable react-native/no-raw-text */
it("renders correctly", () => {
  const tree = renderer
    .create(<MonoText>{"Snapshot test!"}</MonoText>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

/* eslint-enable react-native/no-raw-text */
