import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import LargeText from "../LargeText";
type LandForSaleListProps = {
  loadingInProgress: boolean;
  renderItem: (...args: any[]) => any;
  landForSaleList: any[];
};
// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class LandForSaleList extends React.PureComponent<
  LandForSaleListProps,
  {}
> {
  render() {
    const { landForSaleList, renderItem, loadingInProgress } = this.props;
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
        keyExtractor={item => item.id}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
});
