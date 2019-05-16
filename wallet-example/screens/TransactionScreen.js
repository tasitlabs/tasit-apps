import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";
import { addTransaction } from "@store/actions";

export class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: "Transaction"
  };

  render() {
    const { transactions } = this.props;
    let transactionOneString = "placeholder";
    try {
      console.log("# of transactions", transactions.length);
      const transactionOne = transactions[0];
      transactionOneString = JSON.stringify(transactions);
    } catch (error) {
      console.info("error", error);
    }
    return (
      <View style={styles.container}>
        <Text>{transactionOneString}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionScreen);
