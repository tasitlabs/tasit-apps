import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import { action } from "@storybook/addon-actions";
import SellOrderClaim from "./SellOrderClaim";

storiesOf("SellOrderClaim", module).add("Default", () => (
  <Story>
    <UseCase
      text="Sell Order Claim"
      usage="Used to display Decentraland estates for sale with purchase user action"
    >
      <SellOrderClaim
        sellOrder={{
          id: 2036,
          priceMana: 216000,
          priceUSD: 7776,
          asset: {
            id: 2036,
            name: "Rare Prime Commercial Estate",
            img:
              "https://api.decentraland.org/v1/map.png?size=1&width=301&height=301&publications=true",
          },
        }}
        onClaim={action("claim-tapped")}
      />
    </UseCase>
  </Story>
));
