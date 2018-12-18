import React from "react";
import { ListView } from "react-native";
import ListLands from "@presentational/ListLands";
import LandRow from "@presentational/LandRow";

const rows = [
  {
    id: 1,
    name: "DRAGON KINGDOM",
    img: require("../assets/images/lands/land1.png"),
    priceMana: 13999,
    priceUsd: 699,
  },
  {
    id: 2,
    name: "Parcel",
    img: require("../assets/images/lands/land2.png"),
    priceMana: 27985,
    priceUsd: 1399,
  },
  {
    id: 3,
    name: "Golden Area",
    img: require("../assets/images/lands/land3.png"),
    priceMana: 19000,
    priceUsd: 950,
  },
  {
    id: 4,
    name: "2 parcels away from Main Road to Genesis Plaza",
    img: require("../assets/images/lands/land4.png"),
    priceMana: 150000,
    priceUsd: 7500,
  },
];

const rowHasChanged = (r1, r2) => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });

export default class ListLandsScreen extends React.Component {
  state = {
    dataSource: ds.cloneWithRows(rows),
  };

  renderRow = land => {
    return (
      <LandRow
        land={land}
        onPress={this.props.navigation.navigate("LandClaimScreen", {
          land,
        })}
      />
    );
  };

  render() {
    return (
      <ListLands
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
