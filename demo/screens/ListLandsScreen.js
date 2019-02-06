import React from "react";
import ListLands from "@presentational/ListLands";
import LandRow from "@presentational/LandRow";
import { Action } from "tasit-sdk";
import { abi as estateABI } from "../abi/EstateRegistry.json";
import { abi as markplaceABI } from "../abi/Marketplace.json";
const { Contract } = Action;

const estateAddress = "0x41b598a2c618b59b74540ac3afffb32f7971b37a";
const marketplaceAddress = "0x07c0e972064e5c05f7b3596d81de1afd35457eae";

export default class ListLandsScreen extends React.Component {
  state = {
    rows: [],
  };

  async componentDidMount() {
    const rows = await this.getSellOrders();
    this.setState({ rows });
  }

  async getSellOrders() {
    const orders = [];
    const estateContract = new Contract(estateAddress, estateABI);
    const totalSupply = await estateContract.totalSupply();

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++)
      const order = this.getSellOrder(estateId);
      orders.push(order);

    return await Promise.all(orders);
  }

  async getSellOrder(estateId) {
    // TODO: Switch to new DecentralandEstate() once the SDK includes that
    const estateContract = new Contract(estateAddress, estateABI);
    const marketplaceContract = new Contract(marketplaceAddress, markplaceABI);

    const estateName = await estateContract.getMetadata(estateId);
    const [
      orderId,
      seller,
      price,
      expiresAt,
    ] = await marketplaceContract.auctionByAssetId(estateId);

    const priceMana = Number(price.toString()) / 1e18;
    const manaUsdRate = 30;
    const priceUsd = priceMana * manaUsdRate;

    return {
      id: estateId,
      name: estateName,
      priceMana,
      priceUsd,
      img: `https://api.decentraland.org/v1/estates/${estateId}/map.png`,
      orderId,
      seller,
      expiresAt,
    };
  }

  renderRow = row => {
    const { item: land } = row;
    const handlePress = () =>
      this.props.navigation.navigate("LandClaimScreen", { land });

    return <LandRow id={land.id} land={land} onPress={handlePress} />;
  };

  render() {
    return <ListLands lands={this.state.rows} renderRow={this.renderRow} />;
  }
}
