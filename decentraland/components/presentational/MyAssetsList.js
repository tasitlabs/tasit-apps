import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "@constants/Colors";
import LargeText from "@presentational/LargeText";

// Note: Changing to PureComponent for performance boost
// It is possible to still use function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class MyAssetsList extends React.PureComponent {
  render() {
    const { myAssets, userActions, renderItem } = this.props;
    const { length: listAmount } = myAssets;

    const dataList = myAssets.map(asset => {
      let userAction = userActions.find(action => action.assetId === asset.id);
      return { asset, userAction };
    });

    const withoutAssets = listAmount === 0;

    return withoutAssets ? (
      <View style={styles.emptyContainer}>
        <LargeText>{`You haven't bought any land yet.`}</LargeText>
      </View>
    ) : (
      <FlatList
        data={dataList}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={item => item.asset.id}
      />
    );
  }
}

MyAssetsList.propTypes = {
  renderItem: PropTypes.func.isRequired,
  myAssets: PropTypes.array.isRequired,
  userActions: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
