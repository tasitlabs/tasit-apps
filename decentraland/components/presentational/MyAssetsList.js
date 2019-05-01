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

    // It's easy to look up action info from actionId
    // But to get an action for a given asset (since the asset itself no longer has the actionId)
    // a find is needed, to iterate over the userActions to get the one related to an asset,
    // we used Object.entries to turn it into an array of arrays to help with this find
    const flatUserActions = Object.entries(userActions).map(userAction => {
      const [actionId, userActionProps] = userAction;
      return { actionId, ...userActionProps };
    });

    const dataList = myAssets.map(asset => {
      const flatUserAction = flatUserActions.find(
        action => action.assetId === asset.id
      );

      let userAction;

      if (flatUserAction) {
        const { actionId } = flatUserAction;
        userAction = { [actionId]: { ...userActions[actionId] } };
      }

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
  userActions: PropTypes.object.isRequired,
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
