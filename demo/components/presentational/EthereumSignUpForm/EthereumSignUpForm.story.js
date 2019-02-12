import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import EthereumSignUpForm from "./EthereumSignUpForm";

storiesOf("EthereumSignUpForm", module).add("Default", () => (
  <Story>
    <UseCase text="Ethereum Sign Up Form" usage="Used in onboarding flows">
      <EthereumSignUpForm />
    </UseCase>
  </Story>
));
