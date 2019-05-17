import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";

export class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: "Transaction"
  };

  render() {
    const { transactions } = this.props;
    let transactionsString = "placeholder";
    console.log("# of transactions", transactions.length);
    const latestTx = transactions[transactions.length - 1];
    console.log("latestTx", latestTx);
    const { to } = latestTx;
    const { from } = latestTx;
    const { amount } = latestTx;
    // transactionsString = JSON.stringify(latestTx);
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
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingTop: 15
  }
});

const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionScreen);
