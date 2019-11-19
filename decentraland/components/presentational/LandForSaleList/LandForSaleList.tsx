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

// Back before we moved to hooks, this was a pure component
// rather than a function component for performance reasons
// It is possible to still get that permformance improvement using
// function component with React.memo
// TODO: Set up React memo for this
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b

const LandForSaleList: React.FunctionComponent<LandForSaleListProps> = ({ landForSaleList, renderItem, loadingInProgress }) => {
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
}

export default LandForSaleList;