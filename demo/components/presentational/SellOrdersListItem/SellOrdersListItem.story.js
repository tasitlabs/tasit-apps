import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import { action } from "@storybook/addon-actions";
import SellOrdersListItem from "./SellOrdersListItem";

storiesOf("SellOrdersListItem", module).add("Default", () => (
  <Story>
    <UseCase
      text="Sell Orders List Item"
      usage="Used to display Decentraland estates for sale with purchase user action"
    >
      <SellOrdersListItem
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
        onPress={action("item-tapped")}
      />
    </UseCase>
  </Story>
));
