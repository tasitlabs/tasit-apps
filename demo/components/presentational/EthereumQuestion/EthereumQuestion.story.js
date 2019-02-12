import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import { action } from "@storybook/addon-actions";
import EthereumQuestion from "./EthereumQuestion";

storiesOf("EthereumQuestion", module).add("Default", () => (
  <Story>
    <UseCase text="Ethereum Question" usage="Used in onboarding flows">
      <EthereumQuestion
        onSignIn={action("sign-in-tapped")}
        onSignUp={action("sign-up-tapped")}
      />
    </UseCase>
  </Story>
));
