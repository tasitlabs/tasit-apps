import React from "react";

export default class LandClaim extends React.Component {
  render() {
    const { navigation } = this.props;
    const land = navigation.getParam("land", {
      id: -1,
      name: "Not found",
      img: require("../assets/images/icon.png"),
      priceMana: 0,
      priceUsd: 0,
    });
    return (
      <LandClaim
        land={land}
        onClaim={() => this.props.navigation.navigate("OnboardingHomeScreen")}
      />
    );
  }
}
