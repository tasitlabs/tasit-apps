import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import LargeText from "../LargeText";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
});

type LandForSaleListProps = {
  loadingInProgress: boolean;
  renderItem: (...args: any[]) => any;
  landForSaleList: any[];
};

const LandForSaleList: React.FunctionComponent<LandForSaleListProps> = React.memo(
  ({ landForSaleList, renderItem, loadingInProgress }) => {
    const { length: listAmount } = landForSaleList;
    const withoutAssetsForSale = !loadingInProgress && listAmount === 0;
    return withoutAssetsForSale ? (
      <View style={styles.container}>
        <LargeText>{`There isn't any land for sale right now.`}</LargeText>
      </View>
    ) : (
      <FlatList
        data={landForSaleList}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={(item): string => item.id}
      />
    );
  }
);

export default LandForSaleList;
