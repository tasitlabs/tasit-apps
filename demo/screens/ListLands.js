import React from "react";
import { ListView, StyleSheet, View, TouchableHighlight } from "react-native";
import Land from "../components/presentational/Land";
import Colors from "../constants/Colors";

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

function LandRow(props) {
  const { onPress, rowData } = props;
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.row}>
        <Land land={rowData} />
      </View>
    </TouchableHighlight>
  );
}

export default class ListLands extends React.Component {
  state = {
    dataSource: ds.cloneWithRows(rows),
  };

  renderRow = rowData => {
    const handlePress = () =>
      this.props.navigation.navigate("LandClaim", { land: rowData });

    return <LandRow rowData={rowData} onPress={handlePress} />;
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
