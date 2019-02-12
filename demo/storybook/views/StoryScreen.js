import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const behavior = Platform.OS === "ios" ? "padding" : null;

export const StoryScreen = fn => (
  <KeyboardAvoidingView
    style={style}
    behavior={behavior}
    keyboardVerticalOffset={50}
  >
    {fn()}
  </KeyboardAvoidingView>
);

const style = {
  backgroundColor: "#f0f0f0",
  flex: 1,
};
