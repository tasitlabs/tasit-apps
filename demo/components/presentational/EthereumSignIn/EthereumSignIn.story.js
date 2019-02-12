import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import { action } from "@storybook/addon-actions";
import EthereumSignIn from "./EthereumSignIn";

storiesOf("EthereumSignIn", module).add("Default", () => (
  <Story>
    <UseCase text="Ethereum Sign In" usage="Used in onboarding flows">
      <EthereumSignIn onConnect={action("connect-tapped")} />
    </UseCase>
  </Story>
));
