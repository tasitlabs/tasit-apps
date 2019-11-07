import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
type TransactionScreenProps = {
  title?: any
};
export class TransactionScreen extends React.Component<
  TransactionScreenProps,
  {}
> {
  render() {
    const { transactions } = this.props;
    console.info("# of transactions", transactions.length);
    const latestTx = transactions[transactions.length - 1];
    console.info("latestTx", latestTx);
    // TODO: Handle the undefined latestTx case
    const { to } = latestTx;
    const { from } = latestTx;
    const { amount } = latestTx;
    return (
      <View style={styles.container}>
        {!to ? (
          <Text>{"Missing 'to' address"}</Text>
        ) : (
          <Text>{`to ${to}`}</Text>
        )}
        {!from ? (
          <Text>{"Missing 'from' address"}</Text>
        ) : (
          <Text>{`from ${from}`}</Text>
        )}
        {!amount ? (
          <Text>{"Missing 'amount'"}</Text>
        ) : (
          <Text>{`amount ${amount}`}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
    paddingTop: 15
  }
});
const mapStateToProps = state => ({
  transactions: state.transactions
});
// TODO: Migrate me to TypeScript types
// TransactionScreen.propTypes = {
//   transactions: PropTypes.array.isRequired
// };
export default connect(mapStateToProps)(TransactionScreen);
