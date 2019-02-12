import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import EthereumSignUp from "./EthereumSignUp";

storiesOf("EthereumSignUp", module).add("Default", () => (
  <Story>
    <UseCase text="Ethereum Sign Up" usage="Used in onboarding flows">
      <EthereumSignUp />
    </UseCase>
  </Story>
));
