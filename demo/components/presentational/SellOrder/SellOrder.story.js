import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Story } from "../../../storybook/views/Story";
import { UseCase } from "../../../storybook/views/UseCase";
import SellOrder from "./SellOrder";

storiesOf("SellOrder", module).add("Default", () => (
  <Story>
    <UseCase
      text="Sell Order"
      usage="Used to display Decentraland estates for sale"
    >
      <SellOrder
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
      />
    </UseCase>
  </Story>
));
