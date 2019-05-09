import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "@shared-constants/Colors";
import LargeText from "@presentational/LargeText";

// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class LandForSaleList extends React.PureComponent {
  render() {
    const { landForSaleList, renderItem, loadingInProgress } = this.props;
    const { length: listAmount } = landForSaleList;
    const withoutAssetsForSale = !loadingInProgress && listAmount === 0;
    return withoutAssetsForSale ? (
      <LargeText>{`There isn't any land for sale right now.`}</LargeText>
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

LandForSaleList.propTypes = {
  loadingInProgress: PropTypes.bool.isRequired,
  renderItem: PropTypes.func.isRequired,
  landForSaleList: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
