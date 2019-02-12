import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "@constants/Colors";

// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class SellOrdersList extends React.PureComponent {
  render() {
    const { sellOrders, renderItem } = this.props;
    return (
      <FlatList
        data={sellOrders}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

SellOrdersList.propTypes = {
  renderItem: PropTypes.func.isRequired,
  sellOrders: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
