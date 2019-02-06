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
    const { lands, renderRow } = this.props;
    return (
      <FlatList data={lands} style={styles.container} renderItem={renderRow} />
    );
  }
}

SellOrdersList.propTypes = {
  renderRow: PropTypes.func.isRequired,
  lands: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
