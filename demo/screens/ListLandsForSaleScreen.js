import React from "react";
import { connect } from "react-redux";
import { setSellOrders, claimSellOrder } from "../actions";
import PropTypes from "prop-types";
import LandsForSaleList from "@presentational/LandsForSaleList";
import LandsForSaleListItem from "@presentational/LandsForSaleListItem";
import ContractsABIs from "@constants/ContractsABIs";
import ContractsAddresses from "@constants/ContractsAddresses";
import { Action } from "tasit-sdk";
const { estateABI, marketplaceABI } = ContractsABIs;
const { estateAddress, marketplaceAddress } = ContractsAddresses;
const { Contract } = Action;

export class ListLandsForSaleScreen extends React.Component {
  // TODO: Switch to new DecentralandEstate() once the SDK includes that
  estateContract = new Contract(estateAddress, estateABI);
  marketplaceContract = new Contract(marketplaceAddress, marketplaceABI);

  componentDidMount = async () => {
    const { setSellOrders } = this.props;
    const sellOrders = await this._getSellOrders();
    setSellOrders(sellOrders);
  };

  // Note: This function is assuming that:
  // - All estates have a sell order
  // - The total supply of estates is small
  // TODO: Rewrite this function when we move to testnet
  _getSellOrders = async () => {
    const orders = [];
    const totalSupply = await this.estateContract.totalSupply();

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++) {
      const order = this._getSellOrder(estateId);
      orders.push(order);
    }

    return await Promise.all(orders);
  };

  _getSellOrder = async estateId => {
    const estateName = await this.estateContract.getMetadata(estateId);
    const [
      orderId,
      seller,
      price,
      expiresAt,
    ] = await this.marketplaceContract.auctionByAssetId(estateId);

    const hasOrder = parseInt(orderId, 16) !== 0;
    if (!hasOrder) throw Error(`Estate (id:${estateId}) has no sell order.`);

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    const priceMana = Number(price.toString()) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

    return {
      id: orderId,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      // TODO: Create an enum type for identify asset
      asset: {
        id: estateId,
        name: estateName,
        img: imgUrl,
      },
    };
  };

  _renderItem = ({ item: sellOrder }) => {
    const { navigation, claimSellOrder } = this.props;
    const handlePress = () => {
      claimSellOrder(sellOrder);
      navigation.navigate("BuyLandScreen");
    };

    return <LandsForSaleListItem sellOrder={sellOrder} onPress={handlePress} />;
  };

  render() {
    const { sellOrders } = this.props;
    return (
      <LandsForSaleList sellOrders={sellOrders} renderItem={this._renderItem} />
    );
  }
}

ListLandsForSaleScreen.propTypes = {
  sellOrders: PropTypes.array.isRequired,
  setSellOrders: PropTypes.func.isRequired,
  claimSellOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { sellOrders } = state;
  return { sellOrders };
};

const mapDispatchToProps = {
  setSellOrders,
  claimSellOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandsForSaleScreen);
