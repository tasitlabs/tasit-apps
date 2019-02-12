import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import Estate from "./Estate";

storiesOf("Estate", module).add("Default", () => (
  <Story>
    <UseCase text="Estate" usage="Used for displaying a Decentraland estate">
      <Estate
        estate={{
          id: 2036,
          name: "Rare Prime Commercial Estate",
          img:
            "https://api.decentraland.org/v1/map.png?size=1&width=301&height=301&publications=true",
        }}
      />
    </UseCase>
  </Story>
));
