import React from "react";
import SellOrderClaim from "@presentational/SellOrderClaim";
import SellOrderExecute from "@presentational/SellOrderExecute";

export default class SellOrderScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const sellOrder = navigation.getParam("sellOrder", {
      id: -1,
      priceMana: 0,
      priceUSD: 0,
      asset: {
        id: -1,
        name: "Not found",
        img: "https://decentraland.org/images/logo-65f7b27caf.png",
      },
    });

    // TODO
    // Has Tasit Account assigned?
    const hasAccount = false;

    if (hasAccount) {
      return (
        <SellOrderExecute
          sellOrder={sellOrder}
          onOrderExecution={() =>
            this.props.navigation.navigate("ListSellOrdersScreen")
          }
        />
      );
    } else {
      return (
        <SellOrderClaim
          sellOrder={sellOrder}
          onClaim={() => this.props.navigation.navigate("OnboardingHomeScreen")}
        />
      );
    }
  }
}
