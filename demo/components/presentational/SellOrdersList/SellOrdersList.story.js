import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import SellOrdersList from "./SellOrdersList";
import SellOrdersListItem from "../SellOrdersListItem/SellOrdersListItem";
import { action } from "@storybook/addon-actions";

storiesOf("SellOrdersList", module).add("Default", () => (
  <Story>
    <UseCase
      text="Sell Orders List"
      usage="Used to display a list of Decentraland estates for sale"
    >
      <SellOrdersList
        sellOrders={sellOrders}
        renderItem={({ item }) => (
          <SellOrdersListItem
            sellOrder={item}
            onPress={action("list-item-tapped")}
          />
        )}
      />
    </UseCase>
  </Story>
));

const sellOrders = [
  {
    id: 2036,
    priceMana: 216000,
    priceUSD: 7776,
    asset: {
      id: 2036,
      name: "Rare Prime Commercial Estate",
      img:
        "https://api.decentraland.org/v1/map.png?size=1&width=301&height=301&publications=true",
    },
  },
  {
    id: 1440,
    priceMana: 325000,
    priceUSD: 11707.8,
    asset: {
      id: 1440,
      name: "The DragonView apartments (East)",
      img:
        "https://api.decentraland.org/v1/map.png?size=1&width=301&height=301&publications=true",
    },
  },
  {
    id: 2035,
    priceMana: 100000,
    priceUSD: 3602.4,
    asset: {
      id: 2035,
      name: "South Western Plaza Estate",
      img:
        "https://api.decentraland.org/v1/map.png?size=1&width=301&height=301&publications=true",
    },
  },
];
