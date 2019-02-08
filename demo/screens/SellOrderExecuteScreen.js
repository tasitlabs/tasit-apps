import React from "react";
import { connect } from "react-redux";
import SellOrderExecute from "@presentational/SellOrderExecute";
import PropTypes from "prop-types";

class SellOrderScreen extends React.Component {
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
      <SellOrderExecute
        sellOrder={sellOrder}
        afterOrderExecution={() =>
          this.props.navigation.navigate("ListSellOrdersScreen")
        }
      />
    );
  }
}

SellOrderScreen.propTypes = {
  account: PropTypes.object,
};

const mapStateToProps = state => {
  const { account } = state;
  return { account };
};

export default connect(mapStateToProps)(SellOrderScreen);
