import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { claimSellOrder } from "../actions";
import SellOrderClaim from "@presentational/SellOrderClaim";

export class SellOrderClaimScreen extends React.Component {
  _onClaim = sellOrder => {
    const { claimSellOrder } = this.props;

    claimSellOrder(sellOrder);
    this.props.navigation.navigate("OnboardingHomeScreen");
  };

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

    return (
      <SellOrderClaim
        sellOrder={sellOrder}
        onClaim={() => {
          this._onClaim(sellOrder);
        }}
      />
    );
  }
}

SellOrderClaimScreen.propTypes = {
  claimSellOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  claimSellOrder,
};

export default connect(
  null,
  mapDispatchToProps
)(SellOrderClaimScreen);
