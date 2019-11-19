import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import LargeText from "../LargeText";
import CenteredAlert from "../CenteredAlert";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
});

type MyAssetsListProps = {
  renderItem: (...args: any[]) => any;
  myAssets: any[];
  userActions: object;
};

// Back before we moved to hooks, this was a pure component
// rather than a function component for performance reasons
// See LandforSaleList component for suggested next steps
const MyAssetsList: React.FunctionComponent<MyAssetsListProps> = ({
  myAssets,
  userActions,
  renderItem,
}) => {
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
    <CenteredAlert text="You haven't bought any land yet." />
  ) : (
    <FlatList
      data={dataList}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item): string => item.asset.id}
    />
  );
};

export default MyAssetsList;
