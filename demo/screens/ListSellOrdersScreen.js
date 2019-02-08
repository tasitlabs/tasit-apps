import React from "react";
import SellOrdersList from "@presentational/SellOrdersList";
import SellOrdersListItem from "@presentational/SellOrdersListItem";
import ContractsABIs from "@constants/ContractsABIs";
import ContractsAddresses from "@constants/ContractsAddresses";
import { Action } from "tasit-sdk";
const { estateABI, marketplaceABI } = ContractsABIs;
const { estateAddress, marketplaceAddress } = ContractsAddresses;
const { Contract } = Action;

export default class ListSellOrdersScreen extends React.Component {
  // TODO: Switch to new DecentralandEstate() once the SDK includes that
  estateContract = new Contract(estateAddress, estateABI);
  marketplaceContract = new Contract(marketplaceAddress, marketplaceABI);

  state = {
    sellOrders: [],
  };

  async componentDidMount() {
    const sellOrders = await this.getSellOrders();
    this.setState({ sellOrders });
  }

  // Note: This function is assuming that:
  // - All estates have a sell order
  // - The total supply of estates is small
  // TODO: Rewrite this function when we move to testnet
  async getSellOrders() {
    const orders = [];
    const totalSupply = await this.estateContract.totalSupply();

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++) {
      const order = this.getSellOrder(estateId);
      orders.push(order);
    }

    return await Promise.all(orders);
  }

  async getSellOrder(estateId) {
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
  }

  renderItem = ({ item: sellOrder }) => {
    const handlePress = () =>
      this.props.navigation.navigate("SellOrderClaimScreen", { sellOrder });
    return <SellOrdersListItem sellOrder={sellOrder} onPress={handlePress} />;
  };

  render() {
    const { sellOrders } = this.state;
    return (
      <SellOrdersList sellOrders={sellOrders} renderItem={this.renderItem} />
    );
  }
}
