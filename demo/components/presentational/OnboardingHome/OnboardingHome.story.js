import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import { action } from "@storybook/addon-actions";
import OnboardingHome from "./OnboardingHome";

storiesOf("OnboardingHome", module).add("Default", () => (
  <Story>
    <UseCase text="Onboarding Home">
      <OnboardingHome onPress={action("get-started-tapped")} />
    </UseCase>
  </Story>
));
