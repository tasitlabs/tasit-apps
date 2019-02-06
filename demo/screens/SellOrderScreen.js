import React from "react";
import SellOrder from "@presentational/SellOrder";

export default class SellOrderScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const sellOrder = navigation.getParam("sellOrder", {
      id: -1,
      name: "Not found",
      img: "https://decentraland.org/images/logo-65f7b27caf.png",
      priceMana: 0,
      priceUsd: 0,
    });
    return (
      <SellOrder
        sellOrder={sellOrder}
        onClaim={() => this.props.navigation.navigate("OnboardingHomeScreen")}
      />
    );
  }
}
